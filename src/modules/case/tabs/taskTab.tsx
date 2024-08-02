import { serverApi } from "@/client/server";
import { caseTaskColumns } from "@/modules/task";
import { DataTable } from "@/packages/ui";
import React from "react";

export const TaskTab = async (props: TaskTabProps) => {
  const { caseId } = props;

  const tasks = await serverApi.task.listByCase(caseId);

  return (
    <div className="flex w-full flex-col gap-4">
      <DataTable columns={caseTaskColumns} data={tasks} searchColumn={"id"} />
    </div>
  );
};

type TaskTabProps = {
  caseId: string;
};
