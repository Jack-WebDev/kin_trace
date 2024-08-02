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
import { CreateBeneficiarySchemaType, createBeneficiarySchema } from "@/schema";
import { genderList } from "@/enum/constants";
import { clientApi } from "@/client/react";
import { create } from "lodash";

export function CreateForm(props: Props) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { toast } = useToast();

  const createBeneficiary = clientApi.beneficiary.create.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      toast({
        title: "Success",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
      });
    },
  });

  const { clientId } = props;
  const form = useForm<CreateBeneficiarySchemaType>({
    resolver: zodResolver(createBeneficiarySchema),
    defaultValues: {},
  });

  async function onSubmit(values: CreateBeneficiarySchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const data = {
      clientId,
      ...values,
    };

    createBeneficiary.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full flex-col gap-4  text-gray-600"
      >
        <div className="mb-4 grid w-full   grid-cols-1 gap-y-4 md:grid-cols-3">
          <FormInput label="First name" name="name" placeholder="John" />
          <FormInput label="Last name" name="surname" placeholder="Doe" />
          <FormInput
            label="Id number"
            name="idNumber"
            placeholder="8706255628974"
          />
          <FormInput
            label="Contact number"
            name="contactNumber"
            placeholder="0824486565"
          />
          <FormSelect
            label="Gender"
            name="gender"
            data={genderList}
            placeholder="Select gender"
          />
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-secondaryBg/50 p-4 dark:bg-gray-500/10">
          <h1 className="font-semibold text-textColor">Physical address</h1>
          <div className="grid w-full max-w-[1000px] grid-cols-1 items-center gap-4 gap-y-4 md:grid-cols-3">
            <FormInput
              label="Street address"
              name="address.streetAddress"
              placeholder="204 Paladin court 2055"
            />
            <FormInput
              label="city"
              name="address.city"
              placeholder="Johannesburg"
            />
            <FormInput
              label="Zip code"
              name="address.zipCode"
              placeholder="2055"
              small
            />
            <FormInput
              label="Country"
              name="address.country"
              placeholder="South Africa"
            />
          </div>
        </div>

        {createBeneficiary.isPending ? (
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

type Props = {
  clientId: string;
};
