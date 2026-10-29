"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormFieldWrapperPassword } from "@/components/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { bindFormErrors } from "@/lib//form-helpers";
import { cn } from "@/lib/utils";
import { type SignInInput, signInSchema } from "@/lib/validations/auth.schema";
import { signInAction } from "../../actions";

export default function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "john.doe@example.com",
      password: "password1234",
    },
  });

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: SignInInput) {
    try {
      const result = await signInAction(values);
      bindFormErrors(form.setError, result);
    } catch (error) {
      bindFormErrors(form.setError, null, error);
    }
  }

  return (
    <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="email"
                placeholder="Email"
                className="w-full h-auto border border-input bg-background text-foreground placeholder:text-muted-foreground rounded-full px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FormFieldWrapperPassword
          name="password"
          control={form.control}
          isLeftIcon={false}
          label=""
          inputGroupClassName="w-full h-auto border border-input bg-background text-foreground rounded-full focus-visible:outline-none focus-visible:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </FieldGroup>

      {/* Root server error handling */}
      <FieldError className="rounded-full" errors={[form.formState.errors?.root?.serverError]} />

      <Button
        type="submit"
        form="sign-in-form"
        disabled={pending}
        className={cn(
          "w-full text-base h-12 bg-primary text-primary-foreground rounded-full py-3 hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        )}
      >
        {pending ? <span className="submitLoader" /> : "Continue"}
      </Button>
    </form>
  );
}
