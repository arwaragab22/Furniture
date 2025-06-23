import { z } from "zod";

export const schema = z.object({
  studentPhone: z.string().min(7, "Student phone is required"),
  parentPhone: z.string().min(7, "Parent phone is required"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  buildingNo: z.string().min(1, "Building number is required"),
  postalCode: z
    .string()
    .min(4, "Postal code must be at least 4 digits")
    .max(10, "Postal code is too long")
    .regex(/^\d+$/, "Postal code must contain only numbers"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Select a country"),
  monthlySessions: z.string().min(1, "Select number of sessions"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms & conditions" }),
  }),
});
