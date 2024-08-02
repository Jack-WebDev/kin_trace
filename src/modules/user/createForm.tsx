"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Form,
  FormInput,
  FormSelect,
  Loader,
  ResponseMessage,
  useToast,
} from "@/packages/ui";
import  { type CreateUserSchemaType, createUserSchema } from "@/schema";
import { clientApi } from "@/client/react";
import { userRoles } from "@/enum/constants";

export function CreateForm() {

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {},
  });

  const createUser = clientApi['user']['create'].useMutation({
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

  async function onSubmit(values: CreateUserSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    console.log(values)

    createUser.mutate(values);
  }
  clientApi.user['create'].useMutation({})

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 w-full text-gray-600"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 justify-between w-full">
          <FormInput label="First name" name="name" placeholder="Jane" />
          <FormInput label="Last name" name="surname" placeholder="Doe" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-10">
          <FormInput
            label="Email"
            name="email"
            placeholder="johndoe@example.com"
          />
          <FormInput
            label="Phone number"
            name="contactNumber"
            placeholder="0721184545"
          />
        </div>

        <FormSelect 
          label="Role"
          name="role"
          data={userRoles}
          placeholder="Select role"
        />

        {createUser.isPending ? (
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
