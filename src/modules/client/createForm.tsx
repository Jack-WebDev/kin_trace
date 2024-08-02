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
  useToast,
} from "@/packages/ui";
import { CreateClientSchemaType, createClientSchema } from "@/schema";
import { genderList } from "@/enum/constants";
import { AuthUserType } from "@/context";
import { clientApi } from "@/client/react";

export function CreateForm(props: Props) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<CreateClientSchemaType>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {},
  });

  const createClient = clientApi.client.create.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      location.replace(`/dashboard/clients/${data.clientId}`);
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

  async function onSubmit(values: CreateClientSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    createClient.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full max-w-[700px] flex-col gap-4 text-gray-600 lg:max-w-[1100px]"
      >
        <div className="flex flex-col flex-wrap items-center justify-start  gap-4 md:flex-row ">
          <FormInput label="First name" name="name" placeholder="John" />
          <FormInput label="Last name" name="surname" placeholder="John" />
          <FormSelect
            label="Gender"
            name="gender"
            placeholder="Select gender"
            data={genderList}
          />

          <h1 className="block w-full pt-2 font-semibold">
            Identity information
          </h1>
          <FormInput
            label="ID number"
            name="idNumber"
            placeholder="784512365879"
          />

          <FormInput
            label="Passport number"
            name="passportNumber"
            placeholder="784512365879"
          />

          <FormInput
            label="Employee number"
            name="employeeNumber"
            placeholder="KJH516659GG"
          />

          <h1 className="block w-full pt-2 font-semibold">
            Contact information
          </h1>

          <FormInput
            label="Cellphone number"
            name="contactNumber1"
            placeholder="0721146565"
          />

          <FormInput
            label="Other contact number"
            name="contactNumber2"
            placeholder="0786639587"
          />
          <FormInput
            label="Country"
            name="country"
            placeholder="South Africa"
          />
        </div>
        <div className="mt-4 flex flex-col flex-wrap gap-4 rounded-lg  bg-primary/5 p-4 md:flex-row">
          <p className="block w-full text-lg font-semibold text-textColorLight">
            Physical address
          </p>
          <FormInput
            label="Street address"
            name="address.physical.streetAddress"
            placeholder="204 Paladin court 2200"
          />

          <FormInput
            label="City"
            name="address.physical.city"
            placeholder="Johannesburg"
          />

          <FormInput
            label="State"
            name="address.physical.state"
            placeholder="Gauteng"
          />

          <FormInput
            label="Zip code"
            name="address.physical.zipCode"
            placeholder="5004"
          />

          <FormInput
            label="Country"
            name="address.physical.country"
            placeholder="South Africa"
          />

          <p className="mt-4 block w-full text-lg font-semibold text-textColorLight">
            Postal address
          </p>

          <FormInput
            label="Street address"
            name="address.postal.streetAddress"
            placeholder="204 Paladin court 2200"
          />

          <FormInput
            label="City"
            name="address.postal.city"
            placeholder="Johannesburg"
          />

          <FormInput
            label="State"
            name="address.postal.state"
            placeholder="Gauteng"
          />

          <FormInput
            label="Zip code"
            name="address.postal.zipCode"
            placeholder="5004"
          />

          <FormInput
            label="Country"
            name="address.postal.country"
            placeholder="South Africa"
          />
        </div>

        {createClient.isPending ? (
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
  auth: AuthUserType;
};
