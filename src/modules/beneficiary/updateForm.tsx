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

import {
  BeneficiaryType,
  UpdateBeneficiarySchemaType,
  updateBeneficiarySchema,
} from "@/schema";
import { traceStatusList, genderList } from "@/enum/constants";
import { AuthUserType } from "@/context";
import { clientApi } from "@/client/react";

import { Address } from "@prisma/client";

export function UpdateForm(props: UpdateFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { beneficiary, address, caseId, auth } = props;

  const { toast } = useToast();

  const updateBeneficiary = clientApi.beneficiary.update.useMutation({
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
  const form = useForm<UpdateBeneficiarySchemaType>({
    resolver: zodResolver(updateBeneficiarySchema),
    defaultValues: {},
  });

  async function onSubmit(values: UpdateBeneficiarySchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const { address: beneficiaryAddress, ...others } = values;

    const data = {
      address: {
        id: address.id,
        ...beneficiaryAddress,
      },
      id: beneficiary.id,
      ...others,
      caseId: caseId,
    };

    updateBeneficiary.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full flex-col gap-6 text-gray-600 md:w-[600px] lg:w-[1000px]"
      >
        <div className="mb-4 grid w-full   grid-cols-1 gap-y-4 md:grid-cols-3">
          <FormInput
            label="First name"
            name="name"
            placeholder="John"
            defaultValue={beneficiary.name}
          />
          <FormInput
            label="Last name"
            name="surname"
            placeholder="Doe"
            defaultValue={beneficiary.surname}
          />
          <FormInput
            label="Id number"
            name="idNumber"
            placeholder="8706255628974"
            defaultValue={beneficiary.idNumber}
          />
          <FormInput
            label="Contact number"
            name="contactNumber"
            placeholder="0824486565"
            defaultValue={beneficiary.contactNumber}
          />
          <FormSelect
            label="Gender"
            name="gender"
            data={genderList}
            placeholder="Select gender"
            defaultValue={beneficiary.gender ?? ""}
          />

          {auth && (
            <FormSelect
              label="Trace status"
              name="traceStatus"
              data={traceStatusList}
              placeholder="Select trace status"
              defaultValue={beneficiary.traceStatus ?? ""}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-secondaryBg/50 p-4 dark:bg-gray-500/10">
          <h1 className="font-semibold text-textColor">Physical address</h1>
          <div className="grid w-full max-w-[1000px] grid-cols-1 items-center gap-4 gap-y-4 md:grid-cols-3">
            <FormInput
              label="Street address"
              name="address.streetAddress"
              placeholder="204 Paladin court 2055"
              defaultValue={address.streetAddress}
            />
            <FormInput
              label="city"
              name="address.city"
              placeholder="Johannesburg"
              defaultValue={address.city}
            />
            <FormInput
              label="Zip code"
              name="address.zipCode"
              placeholder="2055"
              small
              defaultValue={address.zipCode}
            />
            <FormInput
              label="Country"
              name="address.country"
              placeholder="South Africa"
              defaultValue={address.country}
            />
          </div>
        </div>

        {updateBeneficiary.isPending ? (
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
  beneficiary: BeneficiaryType;
  address: Address;
  caseId?: string;
  auth?: AuthUserType;
};
