"use client";

import { signUpFormSchema } from "@/lib/types";
import { CustomForm, CustomFormField, FormColumn } from "./CustomForm";
import { handleSignUp } from "@/lib/actions";

export default function SignUpForm() {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
  };

  return (
    <CustomForm
      defaultValues={defaultValues}
      schema={signUpFormSchema}
      action={handleSignUp}
      submitLabel="Create account"
      className="space-y-6"
    >
      <FormColumn>
        <CustomFormField
          label="Username"
          name="name"
          placeholder="Choose a username"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
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
          placeholder="Create a strong password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </FormColumn>
    </CustomForm>
  );
}
