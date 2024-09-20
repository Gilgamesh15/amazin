"use client";

import React, {
  Fragment,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useTransition,
} from "react";
import { useFormState } from "react-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn, FieldValues } from "react-hook-form";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

interface CustomFormProps<T extends FieldValues> {
  children: ReactNode;
  defaultValues: T;
  schema: z.ZodSchema<T>;
  action: (
    prevState: {
      errors: Partial<Record<keyof T, string[]>>;
      message: string | undefined;
    },
    formData: FormData
  ) => Promise<{
    errors: Partial<Record<keyof T, string[]>>;
    message: string | undefined;
  }>;
  submitLabel: string;
  className?: string;
}

export function CustomForm<T extends FieldValues>({
  children,
  defaultValues,
  schema,
  action,
  submitLabel,
  className,
}: CustomFormProps<T>) {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(action, {
    errors: Object.keys(defaultValues).reduce(
      (acc, key) => ({ ...acc, [key]: undefined }),
      {}
    ) as Partial<Record<keyof T, string[]>>,
    message: undefined,
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          form.setError(key as keyof T, { message: value.join(", ") });
        }
      });
    }
  }, [state?.errors, form]);

  return (
    <Card className={cn("p-6 shadow-lg", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            startTransition(() => {
              formAction(new FormData(document.forms[0]));
            });
          })}
          className="flex flex-col gap-8"
        >
          {React.Children.map(children, (child, index) => (
            <Fragment key={index}>
              {React.isValidElement(child)
                ? React.cloneElement(child, { form, state })
                : child}
            </Fragment>
          ))}

          <Button type="submit" variant="destructive" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              submitLabel
            )}
          </Button>
          {state.message && (
            <FormMessage className="mt-2 text-center">
              {state.message}
            </FormMessage>
          )}
        </form>
      </Form>
    </Card>
  );
}

interface FormColumnProps {
  children: ReactNode;
  form?: UseFormReturn;
  state?: {
    errors: Partial<Record<string, string[] | undefined>>;
    message: undefined;
  };
}

export function FormColumn({ children, form, state }: FormColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { form, state });
        }
        return child;
      })}
    </div>
  );
}

export function FormRow({ children, form, state }: FormColumnProps) {
  return (
    <div className="flex items-center gap-4 *:flex-1">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { form, state });
        }
        return child;
      })}
    </div>
  );
}

interface CustomFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  optional?: boolean;
  form?: UseFormReturn;
  name: string;
  state?: {
    errors: Partial<Record<string, string[] | undefined>>;
    message: undefined;
  };
  className?: string;
}

export function CustomFormField({
  label,
  optional = false,
  form,
  name,
  state,
  className,
  ...props
}: CustomFormFieldProps) {
  if (!form) throw new Error("Form is required in CustomFormField element");

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <CustomFormLabel label={label} optional={optional} />
          <FormControl>
            {props.type === "textarea" ? (
              <Textarea
                {...field}
                {...props}
                className={cn(
                  "bg-secondary placeholder:text-muted-foreground text-foreground transition-colors focus:ring-2 focus:ring-primary",
                  className
                )}
              />
            ) : (
              <Input
                {...field}
                {...props}
                className={cn(
                  "bg-secondary placeholder:text-muted-foreground text-foreground transition-colors focus:ring-2 focus:ring-primary",
                  className
                )}
                aria-invalid={!!state?.errors[name]}
                aria-describedby={`${name}-error`}
              />
            )}
          </FormControl>
          {state?.errors[name] && (
            <FormMessage id={`${name}-error`} className="text-xs mt-1">
              {state.errors[name]}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}

interface CustomFormLabelProps {
  label: string;
  optional?: boolean;
}

function CustomFormLabel({ label, optional = false }: CustomFormLabelProps) {
  return (
    <FormLabel className="flex items-baseline">
      <span>{label}</span>
      {!optional && <span className="text-destructive ml-1">*</span>}
      {optional && (
        <span className="text-muted-foreground text-xs ml-1">(optional)</span>
      )}
    </FormLabel>
  );
}
