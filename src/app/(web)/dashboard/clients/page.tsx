
import { PageHeader } from "@/components";
import { getAuth } from "@/context";
import { clientColumns } from "@/modules/client";
import { ClientActions } from "@/modules/client/actions";
import { DataTable } from "@/packages/ui";
import { Handshake } from "lucide-react";
import { serverApi } from "@/client/server";
import React from "react";

const Page = async () => {
  const auth = await getAuth();
  const clients = await serverApi.client.list();
  
  return (
    <div className="w-full p-2 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <PageHeader header={false} title="Client list" Icon={Handshake} />
        <ClientActions action="create" auth={auth} />
      </div>
      <DataTable
        columns={clientColumns}
        data={clients}
        searchColumn="surname"
        search={true}
      />
    </div>
  );
};

export default Page;
