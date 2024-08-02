"use client";

import React, { useState } from "react";
import { Task, TaskStatus } from "@prisma/client";
import { User } from "../user";
import { Button, Loader, ResponseMessage, toast } from "@/packages/ui";
import axios from "axios";
import { clientApi } from "@/client/react";

export const ViewTask = (props: ViewTaskProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { task } = props;

  const closeTaskMutation = clientApi.task.update.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      location.reload();
    },
    onError: (error) => {
      setErrorMessage(error.message);
      toast({
        variant: "error",
        title: "Error!",
        description: error.message || "Unknown error",
      });
    },
  });

  const closeTask = async (id: string) => {
    closeTaskMutation.mutate({ id, status: TaskStatus.Closed });
  };

  return (
    <div className="flex w-full flex-col md:w-[600px]">
      <h1 className="font-bold mb-8 text-xl w-full text-center ">View task </h1>

      <div className="flex w-full flex-col md:flex-row items-center justify-start gap-x-10 mb-4">
        <div className="flex flex-col gap-0">
          <span className="font-semibold text-textColorLight">Created by:</span>
          <User userId={task.createdBy} bold image />
        </div>

        <div className="flex flex-col gap-0">
          <span className="font-semibold text-textColorLight">
            Assigned to:
          </span>
          <User userId={task.assignedTo} bold image />
        </div>
      </div>

      <div className="w-full border border-borderColor/50 rounded-lg p-4 flex flex-col mb-4 shadow-lg">
        <span className="font-semibold text-textColorLight">
          Task instruction:
        </span>
        <p className="text-textColor text-sm  ">{task.taskMessage}</p>
      </div>

      {task.status !== "Closed" && (
        <Button
          variant="primary"
          className="bg-success h-fit w-fit self-end hover:bg-successTint flex items-center justify-center"
          onClick={() => closeTask(task.id)}
        >
          {closeTaskMutation.isPending ? (
            <Loader color="white" className="border-white h-4 w-6" />
          ) : (
            "Close task"
          )}
        </Button>
      )}
    </div>
  );
};

type ViewTaskProps = {
  task: Task;
};
