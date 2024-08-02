
import { serverApi } from "@/client/server";
import { PageHeader } from "@/components";
import { TaskActions, caseTaskColumns } from "@/modules/task";
import { DataTable } from "@/packages/ui";
import { User2 } from "lucide-react";
import React from "react";

const Page = async () => {
  const tasks = await serverApi.task.list();

  return (
    <div className="w-full p-2 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <PageHeader header={false} title="Task list" Icon={User2} />
        <TaskActions />
      </div>
      <DataTable
        columns={caseTaskColumns}
        data={tasks}
        searchColumn="taskMessage"
        search={true}
      />
    </div>
  );
};

export default Page;
