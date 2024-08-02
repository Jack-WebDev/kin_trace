"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Form,
  FormInput,
  Loader,
  ResponseMessage,
} from "@/packages/ui";
import {
  ClientType,
  CreateMultipleAddressSchemaType,
  UserType,
  createMultipleAddressSchema,
} from "@/schema";
import { clientApi } from "@/client/react";
import { AddressType } from "@prisma/client";

export function CreateMultipleForm(props: Props) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { user } = props;

  const form = useForm<CreateMultipleAddressSchemaType>({
    resolver: zodResolver(createMultipleAddressSchema),
    defaultValues: {},
  });

  const createAddress = clientApi.address.createMultiple.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  async function onSubmit(values: CreateMultipleAddressSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const physicalAddress = values.physicalAddress;
    const postalAddress = values.postalAddress;

    const data = {
      physicalAddress: {
        ...physicalAddress,
        refId: user?.id,
        type: AddressType.Physical,
      },
      postalAddress: {
        ...postalAddress,
        refId: user?.id,
        type: AddressType.Postal,
      },
    };

    createAddress.mutateAsync(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full flex-col gap-4 text-gray-600"
      >
        <div className="flex flex-col  gap-5">
          <div className="gao-y-5 mb-4 flex flex-col  flex-wrap justify-start gap-2 md:flex-row md:gap-x-10 ">
            <h1 className="block w-full text-lg font-semibold">
              Physical address
            </h1>
            <FormInput
              label="Street address"
              name="physicalAddress.streetAddress"
              placeholder="201 South street Makhado 0225"
            />
            <FormInput
              label="City"
              name="physicalAddress.city"
              placeholder="Johannesburg"
            />

            <FormInput
              label="State"
              name="postalAddress.state"
              placeholder="Gauteng"
            />

            <FormInput
              label="Country"
              name="physicalAddress.country"
              placeholder="South Africa"
            />
            <FormInput
              label="Zip code"
              name="physicalAddress.zipCode"
              placeholder="0225"
              small={true}
            />
          </div>

          <div className="gao-y-5 mb-4 flex flex-col  flex-wrap justify-start gap-2 md:flex-row md:gap-x-10 ">
            <h1 className="block w-full text-lg font-semibold">
              Postal address
            </h1>
            <FormInput
              label="Street address"
              name="postalAddress.streetAddress"
              placeholder="201 South street Makhado 0225"
            />
            <FormInput
              label="City"
              name="postalAddress.city"
              placeholder="Johannesburg"
            />

            <FormInput
              label="State"
              name="postalAddress.state"
              placeholder="Gauteng"
            />

            <FormInput
              label="Country"
              name="postalAddress.country"
              placeholder="South Africa"
            />
            <FormInput
              label="Zip code"
              name="postalAddress.zipCode"
              placeholder="0225"
              small={true}
            />
          </div>
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

        {/* <pre>{JSON.stringify(watch, null, 2)}</pre> */}
      </form>
    </Form>
  );
}

type Props = {
  user: UserType | ClientType;
};
