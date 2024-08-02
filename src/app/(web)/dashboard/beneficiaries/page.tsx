
import { serverApi } from "@/client/server";
import { PageHeader } from "@/components";
import {  beneficiaryColumns } from "@/modules/beneficiary";
import { DataTable } from "@/packages/ui";
import { HandPlatter } from "lucide-react";
import React from "react";

const Page = async () => {
  const beneficiaries = await serverApi.beneficiary.list();

  return (
    <div className="w-full p-2 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <PageHeader
          header={false}
          title="Beneficiary list"
          Icon={HandPlatter}
        />
      </div>
      <DataTable
        columns={beneficiaryColumns}
        data={beneficiaries}
        searchColumn="surname"
        search={true}
      />
    </div>
  );
};

export default Page;
