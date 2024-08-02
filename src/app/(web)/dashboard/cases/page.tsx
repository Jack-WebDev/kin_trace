
import { PageHeader } from "@/components";
import { getAuth } from "@/context";
import { CaseActions, caseColumns } from "@/modules/case";
import { CaseType } from "@/schema";
import { DataTable } from "@/packages/ui";
import { ClipboardList } from "lucide-react";
import React from "react";
import { serverApi } from "@/client/server";

const Page = async () => {
  const cases: CaseType[] = await serverApi.case.list();
  const auth = await getAuth();
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <PageHeader Icon={ClipboardList} title="Cases" />
        {(auth.role === "Admin" || auth.role === "Supervisor") && (
          <CaseActions auth={auth} />
        )}
      </div>

      <DataTable
        columns={caseColumns}
        data={cases}
        search={true}
        searchColumn={"agentId"}
      />
    </div>
  );
};

export default Page;
