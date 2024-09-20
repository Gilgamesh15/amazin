import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  body: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ProductFormSchema = z.object({
  quantity: z.number().int().positive(),
  variants: z.record(z.string()),
});
export type ProductFormValues = z.infer<typeof ProductFormSchema>;

export const billingDetailsFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),

  shippingAddress: z.object({
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z
      .string()
      .min(5, "ZIP code must be 5 digits")
      .max(5, "ZIP code must be 5 digits"),
  }),

  billingAddress: z
    .object({
      streetAddress: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),

  paymentInfo: z.object({
    cardNumber: z
      .string()
      .min(16, "Card number must be 16 digits")
      .max(16, "Card number must be 16 digits"),
    expirationDate: z.string().min(5, "Expiration date is required"),
    cvv: z
      .string()
      .min(3, "CVV must be 3 digits")
      .max(3, "CVV must be 3 digits"),
  }),
});
