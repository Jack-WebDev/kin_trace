"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Loader, ResponseMessage, useToast } from "@/packages/ui";
import { z } from "zod";
import { FormInput } from "@/packages/ui";
import Link from "next/link";
import { clientApi } from "@/client/react";

const registerSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@ndt.co.za"), {
      message: "Email must be a valid NDT email",
    }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      {
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    ),
});

type registerSchemaType = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const registerMutation = clientApi.auth.register.useMutation({
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

  async function onSubmit(values: registerSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    registerMutation.mutate(values);
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

        {registerMutation.isPending ? (
          <Loader />
        ) : (
          <Button
          variant={"primary"}
            type="submit"
            className="register_btn w-full hover:bg-[#dda83a]"
          >
            Let&apos;s Go!
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
