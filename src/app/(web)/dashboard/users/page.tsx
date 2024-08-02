import { serverApi } from "@/client/server";
import { PageHeader } from "@/components";
import { UserActions } from "@/modules/user";
import { userColumns } from "@/modules/user/colums";
import { DataTable } from "@/packages/ui";
import { User2 } from "lucide-react";
import React from "react";

const Page = async () => {
  const users = await serverApi.user.list();

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="mb-2 flex items-center justify-between">
        <PageHeader header={false} title="User list" Icon={User2} />
        <UserActions action="create" />
      </div>
      {/* <DataTable
        columns={userColumns}
        data={users}
        searchColumn="surname"
        search={true}
      /> */}
    </div>
  );
};

export default Page;
