"use client";
import { Loader } from "@/packages/ui";
import React from "react";
import { clientApi } from "@/client/react";

export const Beneficiary = (props: UserProps) => {
  const { beneficiaryId } = props;

  const {
    data: beneficiary,
    isLoading,
    error,
  } = clientApi.beneficiary.single.useQuery(beneficiaryId);

  return isLoading ? (
    <div className="flex h-full w-full items-center justify-center">
      <Loader size="xs" className="h-8 w-8" />
    </div>
  ) : (
    beneficiary && (
      <div className="w-full">
        <span>{beneficiary?.name + " " + beneficiary?.surname}</span>
      </div>
    )
  );
};

type UserProps = {
  beneficiaryId: string;
};
