"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Button,
  Loader,
  ResponseMessage,
  useToast,
} from "../../../../packages/ui";
import { z } from "zod";
import { FormInput } from "../../../../packages/ui";
import { clientApi } from "../../../../client/react";
import Image from "next/image";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@ndt.co.za"), {
      message: "Email must be a valid NDT email",
    }),
});

type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {},
  });

  const forgotPasswordMutation = clientApi.auths.forgotPassword.useMutation({
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

  async function onSubmit(values: forgotPasswordSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    forgotPasswordMutation.mutate(values);
  }

  return (
    <div className="grid bg-[#e9f9ff] h-screen place-items-center">

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white flex flex-col gap-6 p-4 text-gray-500 w-[300px] m-auto rounded-xl md:flex-row md:w-1/2 md:p-12 justify-center items-center"
      >
        <div>

        <Image src={"/7070628_3275432.svg"} alt="" width={400} height={400} />
        </div>
        <div>
        <div className="flex flex-col items-start justify-center gap-y-4 my-4">
          <>
            <h1 className="text-2xl text-center font-semibold text-[#015a4a]">
              Forgot Password?
            </h1>
            <p className="text-md text-gray-500">
              Enter your NDT email address and we&apos;ll send you an OTP to
              reset your password.
            </p>
          </>
        </div>

        <FormInput
          placeholder="example@mail.com"
          label="Email"
          name="email"
          fullWidth={true}

        />
        {forgotPasswordMutation.isPending ? (
          <Loader />
        ) : (
          <div className="grid gap-y-8">

          <Button type="submit" className="login_btn w-full hover:bg-[#dda83a] mt-8">
            Send Reset Password Email
          </Button>
          <Link href={"/"} className="bg-[#015a4a] py-3 px-8 text-white text-center hover:bg-[#015a4a]/80 rounded-xl">
            Back to Login
          </Link>
          </div>
        )}
        <ResponseMessage
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        </div>
      </form>
    </Form>
    </div>
  );
}
