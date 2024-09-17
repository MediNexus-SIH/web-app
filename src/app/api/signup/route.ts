import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { formSchema,FormData } from "@/lib/zodSchema/formSchema";
import prisma from "@/config/prisma.config";
import { z } from "zod";
import { Prisma } from "@prisma/client";

async function checkExistingHospital(hospitalName: string, contact_number: string) {
  const existingHospital = await prisma.hospital.findFirst({
    where: {
      OR: [
        { hospitalName:  hospitalName},
        { contact_number: contact_number},
      ],
    },
  });
  return existingHospital;
}

async function checkExistingDepartments(hodEmails: string[]) {
  const existingDepartments = await prisma.departments.findMany({
    where: {
      hod_email: {
        in: hodEmails,
      },
    },
  });
  return existingDepartments;
}

async function createHospital(data: FormData) {
  const hashedPassword = await hash(data.password, 13);

  // Check for existing hospital
  const existingHospital = await checkExistingHospital(
    data.hospitalName,
    data.contact_number
  );
  if (existingHospital) {
    throw new Error(
      "A hospital with this name or contact number already exists"
    );
  }

  // Check for existing departments
  const hodEmails = data.departments.map((dept) => dept.hod_email);
  const existingDepartments = await checkExistingDepartments(hodEmails);
  if (existingDepartments.length > 0) {
    const existingEmails = existingDepartments.map((dept) => dept.hod_email);
    throw new Error(
      `Departments with the following HOD emails already exist: ${existingEmails.join(
        ", "
      )}`
    );
  }

  return prisma.hospital.create({
    data: {
      hospitalName: data.hospitalName,
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      pincode: data.pincode,
      state: data.state,
      region: data.region,
      contact_number: data.contact_number,
      admin_name: data.admin_name,
      admin_email: data.admin_email,
      password: hashedPassword,
      security_question: data.security_question,
      security_answer: data.security_answer,
      departments: {
        create: data.departments.map((dept) => ({
          hod_name: dept.hod_name,
          hod_email: dept.hod_email,
          department: dept.department,
        })),
      },
    },
    include: {
      departments: true,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);
    const newHospital = await createHospital(validatedData);

    return NextResponse.json(
      { message: "Signup successful", hospital: newHospital },
      { status: 201 }
    );
  } catch (error:any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message.includes("already exists")) {
        return NextResponse.json({ message: error.message }, { status: 409 });
      }
    }

    if (error.code === "P2002") {
      const target = (error as any).meta?.target?.[0];
      let message = "A unique constraint was violated.";
      if (target === "username") {
        message = "Username already exists";
      } else if (target === "contact_number") {
        message = "Contact number already exists";
      } else if (target === "hod_email") {
        message = "HOD email already exists";
      }
      return NextResponse.json({ message }, { status: 409 });
    }

    console.error("Error creating hospital:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}