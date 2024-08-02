"use client";

import { Loader } from "@/packages/ui";
import React from "react";
import { clientApi } from "@/client/react";

export const Client = (props: ClientProps) => {
  const { clientId } = props;

  const {
    data: client,
    isLoading,
    error,
  } = clientApi.client.single.useQuery(clientId);

  return isLoading ? (
    <div className="flex h-full w-full items-center justify-center">
      <Loader size="xs" className="h-8 w-8" />
    </div>
  ) : (
    client && (
      <div className="w-full">
        <span>{client?.name + " " + client?.surname}</span>
      </div>
    )
  );
};

type ClientProps = {
  clientId: string;
};
