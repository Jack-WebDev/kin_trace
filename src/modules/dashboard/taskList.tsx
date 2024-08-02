

import { DataTable } from "@/packages/ui";
import { ListChecks } from "lucide-react";
import React from "react";
import { caseTaskColumns } from "../task";
import { LinkButton } from ".";
import { serverApi } from "@/client/server";

export const TaskList = async () => {

  const tasks = await serverApi.task.list();

  return (
    <div className="w-full max-h-[500px] md:w-[900px] overflow-y-auto  p-8 bg-primaryBg shadow-lg border border-borderColor/50 rounded-lg flex flex-col gap-0">
      <div className="flex w-full items-center justify-between mb-2">
        <div className="flex items-center gap-x-2">
          <ListChecks
            size={40}
            className="p-2 bg-dangerHover text-white rounded-full"
          />
          <h1 className="font-semibold text-textColor text-lg">Your tasks</h1>
        </div>
        <LinkButton url="/dashboard/tasks" />
      </div>

      <div className="w-full max-h-[400px] overflow-y-auto scrollbar-hide">
        <DataTable
          columns={caseTaskColumns}
          data={tasks}
          search={false}
          searchColumn="id"
        />
      </div>
    </div>
  );
};

