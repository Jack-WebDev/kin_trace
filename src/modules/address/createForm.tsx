"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormInput,
  FormSelect,
  Loader,
  ResponseMessage,
} from "@/packages/ui";
import {
  ClientType,
  CreateAddressSchemaType,
  UserType,
  createAddressSchema,
} from "@/schema";
import { clientApi } from "@/client/react";
import { AddressType } from "@prisma/client";

export function CreateForm(props: Props) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { user } = props;

  const form = useForm<CreateAddressSchemaType>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {},
  });

  const createAddress = clientApi.address.create.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  async function onSubmit(values: CreateAddressSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const { refId, ...others } = values;

    const data = {
      refId: user?.id,
      type: AddressType.Physical,
      ...others,
    };

    createAddress.mutateAsync(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full flex-col gap-4 text-gray-600"
      >
        <div className="gao-y-5 mb-4  flex flex-col justify-start gap-4 md:gap-x-10">
          <FormInput
            label="Street address"
            name="streetAddress"
            placeholder="201 South street Makhado 0225"
            fullWidth={true}
          />
          <FormInput
            fullWidth={true}
            label="City"
            name="city"
            placeholder="Johannesburg"
          />

          <FormInput
            fullWidth={true}
            label="State"
            name="state"
            placeholder="Gauteng"
          />

          <FormInput
            fullWidth={true}
            label="Country"
            name="country"
            placeholder="South Africa"
          />
          <FormInput
            fullWidth={true}
            label="Zip code"
            name="zipCode"
            placeholder="0225"
            small={true}
          />
        </div>

        {form.formState.isSubmitting ? (
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
  user: UserType | ClientType;
};
