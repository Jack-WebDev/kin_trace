"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Loader, ResponseMessage, useToast } from "@/packages/ui";
import { z } from "zod";
import { FormInput } from "@/packages/ui";
import Link from "next/link";
import { clientApi } from "@/client/react";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const loginMutation = clientApi.auth.login.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      location.reload();
    },
    onError: (error) => {
      setErrorMessage(error.message);
      toast({
        variant: "error",
        title: "Error!",
        description: error.message || "Unknown error",
      });
    },
  });

  async function onSubmit(values: LoginSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    loginMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full flex-col gap-6  px-0 text-gray-500"
      >
        <FormInput
          placeholder="example@mail.com"
          label="Email"
          name="email"
          fullWidth={true}
        />
        <FormInput
          placeholder="*******"
          label="Password"
          name="password"
          fullWidth={true}
          type="password"
        />
        <Link href="/" className="self-end">
          <p className="text-sm font-semibold text-primary">Forgot password?</p>
        </Link>

        {loginMutation.isPending? (
          <Loader />
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
        <ResponseMessage
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </form>
    </Form>
  );
}
