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
} from "@/packages/ui";

import { usePathname } from "next/navigation";
import {
  ClientType,
  UpdateClientSchemaType,
  updateClientSchema,
} from "@/schema";
import { genderList } from "@/enum/constants";
import { Address } from "@prisma/client";

export function UpdateForm(props: UpdateFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { client, address } = props;
  const pathName = usePathname();
  const profilePage = pathName.includes("profile");

  const form = useForm<UpdateClientSchemaType>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {},
  });

  const watch = form.watch();
  const physicalAddress = address.find((a) => a.type === "Physical");
  const postalAddress = address.find((a) => a.type === "Postal");

  async function onSubmit(values: UpdateClientSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const { address, ...others } = values;

    const data = {
      address: {
        physical: {
          id: physicalAddress?.id,
          ...address?.physical,
        },
        postal: {
          id: postalAddress?.id,
          ...address?.physical,
        },
      },
      id: client?.id,
      ...others,
    };

    try {
      const res = await axios.patch(`/api/clients/${client.id}`, { ...data });
      setSuccessMessage(res.data.message);
      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 2000),
      );
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Network error");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-[700px] flex-col gap-4 text-gray-600 lg:max-w-[1100px]"
      >
        <div className="flex flex-col flex-wrap items-center justify-start  gap-4 md:flex-row ">
          <FormInput
            label="First name"
            name="name"
            placeholder="John"
            defaultValue={client.name}
          />
          <FormInput
            label="Last name"
            name="surname"
            placeholder="John"
            defaultValue={client.surname}
          />
          <FormSelect
            label="Gender"
            name="gender"
            placeholder="Select gender"
            data={genderList}
            defaultValue={client.gender ?? undefined}
          />

          <h1 className="block w-full pt-2 font-semibold">
            Identity information
          </h1>
          <FormInput
            label="ID number"
            name="idNumber"
            placeholder="784512365879"
            defaultValue={client.idNumber}
          />

          <FormInput
            label="Passport number"
            name="passportNumber"
            placeholder="784512365879"
            defaultValue={client.passportNumber}
          />

          <FormInput
            label="Employee number"
            name="employeeNumber"
            placeholder="KJH516659GG"
            defaultValue={client.employeeNumber}
          />

          <h1 className="block w-full pt-2 font-semibold">
            Contact information
          </h1>

          <FormInput
            label="Cellphone number"
            name="contactNumber1"
            placeholder="0721146565"
            defaultValue={client.contactNumber1}
          />

          <FormInput
            label="Other contact number"
            name="contactNumber2"
            placeholder="0786639587"
            defaultValue={client.contactNumber2}
          />
          <FormInput
            label="Country"
            name="country"
            placeholder="South Africa"
            defaultValue={client.country}
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
            defaultValue={physicalAddress?.streetAddress}
          />

          <FormInput
            label="City"
            name="address.physical.city"
            placeholder="Johannesburg"
            defaultValue={physicalAddress?.city}
          />

          <FormInput
            label="Zip code"
            name="address.physical.zipCode"
            placeholder="5004"
            defaultValue={physicalAddress?.zipCode}
          />

          <FormInput
            label="Country"
            name="address.physical.country"
            placeholder="South Africa"
            defaultValue={physicalAddress?.country}
          />

          <p className="mt-4 block w-full text-lg font-semibold text-textColorLight">
            Postal address
          </p>

          <FormInput
            label="Street address"
            name="address.postal.streetAddress"
            placeholder="204 Paladin court 2200"
            defaultValue={postalAddress?.streetAddress}
          />

          <FormInput
            label="City"
            name="address.postal.city"
            placeholder="Johannesburg"
            defaultValue={postalAddress?.city}
          />

          <FormInput
            label="Zip code"
            name="address.postal.zipCode"
            placeholder="5004"
            defaultValue={postalAddress?.zipCode}
          />

          <FormInput
            label="Country"
            name="address.postal.country"
            placeholder="South Africa"
            defaultValue={postalAddress?.country}
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

type UpdateFormProps = {
  client: ClientType;
  address: Address[];
};
