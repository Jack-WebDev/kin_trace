
import { PageHeader } from "@/components";
import { noteColumns } from "@/modules/note";
import { NoteType } from "@/schema";
import { DataTable } from "@/packages/ui";
import { User2 } from "lucide-react";
import React from "react";
import { serverApi } from "@/client/server";

const Page = async () => {
  const notes = await serverApi.note.list();

  return (
    <div className="w-full p-2 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <PageHeader header={false} title="Note list" Icon={User2} />
      </div>
      <DataTable
        columns={noteColumns}
        data={notes}
        searchColumn="userId"
        search={true}
      />
    </div>
  );
};

export default Page;
