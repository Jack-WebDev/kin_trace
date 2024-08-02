
import { serverApi } from "@/client/server";
import { caseNoteColumns } from "@/modules/note/column";
import { DataTable } from "@/packages/ui";
import React from "react";

export const NoteTab = async (props: NoteTabProps) => {
  const { caseId } = props;
  const notes = await serverApi.note.listByCase(caseId);

  if(!notes){
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <DataTable columns={caseNoteColumns} data={notes} searchColumn={"id"} />
    </div>
  );
};

type NoteTabProps = {
  caseId: string;
};
