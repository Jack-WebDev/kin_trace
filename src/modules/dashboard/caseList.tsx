import { ClipboardList } from "lucide-react";
import React from "react";
import { LinkButton } from ".";
import { DataTable } from "@/packages/ui";
import { caseColumns } from "../case";
import { serverApi } from "@/client/server";

export const CaseList = async () => {
  const cases  = await serverApi.case.list();

  return (
    <div className="w-full bg-primaryBg p-8 rounded-lg flex flex-col gap-2">
      <div className="flex w-full items-center justify-between mb-2">
        <div className="flex items-center gap-x-2">
          <ClipboardList
            size={40}
            className="p-2 bg-danger text-white rounded-full"
          />
          <h1 className="font-semibold text-textColor text-lg">Your cases</h1>
        </div>
        <LinkButton url="/dashboard/cases" />
      </div>

      <DataTable
        data={cases}
        columns={caseColumns}
        search={false}
        searchColumn="id"
      />
    </div>
  );
};


