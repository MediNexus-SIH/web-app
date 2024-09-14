import { z } from "zod";
export const formSchema = z
  .object({
    hospitalName: z.string().min(1, "Hospital name is required"),
    address_line_1: z.string().min(1, "Address line 1 is required"),
    address_line_2: z.string().optional(),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
    region: z.string().min(1, "Region is required"),
    state: z.string().min(1, "State is required"),
    contact_number: z.string().regex(/^\d{10}$/, "Invalid contact number"),
    admin_name: z.string().min(1, "Name is Required"),
    admin_email: z.string().email("This is not a valid email.").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    security_question: z.string().min(1, "Security question is required"),
    security_answer: z.string().min(1, "Security answer is required"),
    departments: z.array(
      z.object({
        hod_name: z.string().min(1, "HOD name is required"),
        hod_email: z.string().email("Invalid HOD email"),
        department: z.string().min(1, "Department name is required"),
      })
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof formSchema>;
