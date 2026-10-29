import { object, string } from "yup";

export const PHONE = "+918091736987";

export const contactSchema = object({
  name: string().trim().min(2, "Please enter at least 2 characters").required("Name is required"),
  email: string().email("Enter a valid email").required("Email is required"),
  phone: string()
    .matches(/^[+\d]?[0-9\s-]{6,20}$/, "Enter a valid phone number")
    .nullable()
    .notRequired(),
  subject: string().trim().min(2, "Please add a subject").required("Subject is required"),
  message: string()
    .trim()
    .min(10, "Please enter at least 10 characters")
    .required("Message is required"),
});
