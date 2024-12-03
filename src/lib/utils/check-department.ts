import prisma from "@/config/prisma.config";

export async function checkExistingDepartments(hodEmails: string[]) {
  const existingDepartments = await prisma.departments.findMany({
    where: {
      hod_email: {
        in: hodEmails,
      },
    },
  });
  return existingDepartments;
}
