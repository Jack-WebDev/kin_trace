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
  UpdateUserSchemaType,
  UserType,
  updateUserSchema,
} from "@/schema";
import {
  AddressTypes,
  genderList,
  userRoles,
  userStatus,
} from "@/enum/constants";
import { Address, AddressType } from "@prisma/client";

export function UpdateForm(props: UpdateFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { user, userAddress } = props;
  const pathName = usePathname();
  const profilePage = pathName.includes("profile");

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {},
  });

  const watch = form.watch();

  async function onSubmit(values: UpdateUserSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const { address, ...others } = values;

    const data = userAddress
      ? {
          userId: user.id,
          ...others,
          address: {
            id: userAddress?.id,
            ...address,
          },
        }
      : {
          userId: user.id,
          ...others,
        };

    try {
      const res = await axios.patch(`/api/users/${user.id}`, { ...data });
      setSuccessMessage(res.data.message);
      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 2000),
      );
    } catch (error: any) {
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
        className=" flex flex-col gap-6 w-full md:w-[600px] lg:w-[1000px] text-gray-600"
      >
        <div className="flex flex-col gap-2 w-full  ">
          <h1 className="font-semibold text-textColorLight mb-4 text-lg">
            User details
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-x-4 gao-y-5 justify-start mb-4">
            <FormInput
              width="300px"
              label="First name"
              name="name"
              placeholder="Jane"
              defaultValue={user?.name}
            />
            <FormInput
              width="300px"
              label="Last name"
              name="surname"
              placeholder="Doe"
              defaultValue={user?.surname}
            />
            <FormInput
              width="300px"
              label="Email"
              name="email"
              placeholder="Doe"
              defaultValue={user?.email}
            />
            <FormInput
              width="300px"
              label="Contact number"
              name="contactNumber"
              placeholder="Doe"
              defaultValue={user?.email}
            />

            <div className="flex flex-col lg:flex-row md:items-center gap-4">
              <FormSelect
                width="300px"
                label="Status"
                data={userStatus}
                placeholder="Select user status"
                name="status"
                defaultValue={user?.status}
              />
              <FormSelect
                width="300px"
                label="Gender"
                data={genderList}
                placeholder="Select gender"
                name="gender"
                defaultValue={user?.gender ?? ""}
              />
              <FormSelect
                width="300px"
                label="Role"
                data={userRoles}
                placeholder="Select role"
                name="role"
                defaultValue={user?.role}
              />
            </div>
          </div>
        </div>

        {userAddress && (
          <div className="flex flex-col gap-2 w-full bg-primary/5  p-4 rounded-md ">
            <h1 className="font-semibold text-textColorLight text-lg mb-4">
              Address details
            </h1>
            <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-x-10 gao-y-5 justify-start mb-4">
              <FormSelect
                label="Address type"
                data={AddressTypes}
                name="address.type"
                placeholder="Select address type"
                defaultValue={userAddress?.type === AddressType.Physical ? "Physical" : "Postal"}
              />
              <FormInput
                label="Street address"
                name="address.streetAddress"
                placeholder="201 South street Makhado 0225"
                defaultValue={userAddress?.streetAddress}
              />
              <FormInput
                label="City"
                name="address.city"
                placeholder="Johannesburg"
                defaultValue={userAddress?.city}
              />

              <FormInput
                label="Country"
                name="address.country"
                placeholder="South Africa"
                defaultValue={userAddress?.country}
              />
              <FormInput
                label="Zip code"
                name="address.zipCode"
                placeholder="0225"
                small={true}
                defaultValue={userAddress?.zipCode}
              />
            </div>
          </div>
        )}

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
  user: UserType;
  userAddress?: Address;
};
