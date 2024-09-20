"use client";

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormState } from "react-dom";
import { handleSignUp } from "@/lib/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddToCartForm({
  variants,
}: {
  variants: Record<string, string[]>;
}) {
  // Generate Zod schema from variants
  const schema = z.object(
    Object.entries(variants).reduce(
      (acc, [key, values]) => ({
        ...acc,
        [key]: z.enum([values[0], ...values]),
      }),
      {} as Record<string, z.ZodEnum<[string, ...string[]]>>
    )
  );

  // Define the form type
  type FormData = z.infer<typeof schema>;

  // Set up React Hook Form
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: Object.entries(variants).reduce(
      (acc, [key, values]) => ({
        ...acc,
        [key]: values[0],
      }),
      {} as FormData
    ),
  });

  // Set up useTransition for pending state
  const [isPending, startTransition] = useTransition();

  // Set up useFormState for server-side validation
  const [state, formAction] = useFormState(handleSignUp, {
    errors: Object.entries(variants).reduce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (acc, [key, _]) => ({
        ...acc,
        [key]: undefined,
      }),
      {} as Record<string, string | undefined>
    ),
    message: undefined,
  });

  useEffect(() => {
    if (Array.isArray(state?.errors)) {
      state.errors.forEach((error) => {
        form.setError(error.field as keyof FormData, {
          message: error.message,
        });
      });
    }
  }, [state?.errors, form]);

  return (
    <Form {...form}>
      <form
        action={(formData) => {
          startTransition(() => {
            formAction(formData);
          });
        }}
      >
        {Object.entries(variants).map(([key, values]) => (
          <FormField
            key={key}
            control={form.control}
            name={key as keyof FormData}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">{`${key}:`}</FormLabel>
                <FormControl>
                  <fieldset className="flex gap-2">
                    {values.map((value) => (
                      <div key={value} className="flex items-center">
                        <Input
                          {...field}
                          type="radio"
                          value={value}
                          checked={field.value === value}
                          onChange={() => field.onChange(value)}
                          className="mr-2"
                        />
                        <label>{value}</label>
                      </div>
                    ))}
                  </fieldset>
                </FormControl>
                <FormMessage>{form.formState.errors[key]?.message}</FormMessage>
              </FormItem>
            )}
          />
        ))}
        <Button
          type="submit"
          disabled={isPending}
          variant="destructive"
          className="w-full mt-4"
        >
          {isPending ? "Adding to Cart..." : "Add to Cart"}
        </Button>
      </form>
    </Form>
  );
}
