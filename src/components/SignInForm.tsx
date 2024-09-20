"use client";

import { signInFormSchema } from "@/lib/types";
import { CustomForm, CustomFormField, FormColumn } from "./CustomForm";
import { handleSignIn } from "@/lib/actions";

export default function SignInForm() {
  const defaultValues = { email: "", password: "" };

  return (
    <CustomForm
      defaultValues={defaultValues}
      schema={signInFormSchema}
      action={handleSignIn}
      submitLabel="Log in"
      className="space-y-6"
    >
      <FormColumn>
        <CustomFormField
          label="Email"
          name="email"
          type="email"
          placeholder="Your email address"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <CustomFormField
          label="Password"
          name="password"
          type="password"
          placeholder="Your password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </FormColumn>
    </CustomForm>
  );
}
