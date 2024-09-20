"use server";

import { redirect } from "next/navigation";
import { signIn } from "../auth";
import {
  contactFormSchema,
  ContactFormValues,
  ContactStateType,
  signInFormSchema,
  SignInStateType,
  signUpFormSchema,
  SignUpStateType,
} from "../types";
import { AuthError } from "next-auth";
import sgMail from "@sendgrid/mail";
import { formatAdminMail, formatSenderMail } from "@/constants";
import env from "../env";

sgMail.setApiKey(env.SENDGRID_API_KEY);

export async function handleSignIn(
  prevState: SignInStateType,
  formData: FormData
): Promise<SignInStateType> {
  const result = signInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: undefined,
    };
  }

  try {
    await signIn("credentials", {
      ...result.data,
      redirect: false,
    });
    redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        errors: {},
        message: "Invalid email or password",
      };
    }
    throw error;
  }
}

export async function handleSignUp(
  prevState: SignUpStateType,
  formData: FormData
): Promise<SignUpStateType> {
  const result = signUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: undefined,
    };
  }

  try {
    await signIn("credentials", {
      ...result.data,
      redirect: false,
    });
    redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        errors: {},
        message: "Account with this email or username already exists.",
      };
    }
    throw error;
  }
}

export async function handleSubmitContactMail(
  prevState: ContactStateType,
  formData: FormData
): Promise<ContactStateType> {
  // Validate form data
  const parseResult = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
      message: undefined,
    };
  }

  const data: ContactFormValues = parseResult.data;

  try {
    await sendEmails(data);
    return {
      errors: {},
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      errors: {},
      message:
        "An error occurred while sending your message. Please try again later.",
    };
  }
}

async function sendEmails(data: ContactFormValues): Promise<void> {
  const adminMail = {
    to: env.ADMIN_EMAIL,
    from: env.ADMIN_EMAIL,
    subject: "New Contact Form Submission",
    html: formatAdminMail(data),
  };

  const senderMail = {
    to: data.email,
    from: env.ADMIN_EMAIL,
    subject: "Thank You for Contacting Us",
    html: formatSenderMail(data),
  };

  await sgMail.send([adminMail, senderMail]);
}
