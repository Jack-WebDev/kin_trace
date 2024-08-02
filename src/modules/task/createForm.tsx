"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Form,
  FormSelect,
  FormTextArea,
  Loader,
  ResponseMessage,
  SelectData,
  useToast,
} from "@/packages/ui";
import {
  CaseType,
  CreateTaskSchemaType,
  createTaskSchema,
} from "@/schema";
import { clientApi } from "@/client/react";
import { create } from "lodash";

export function CreateForm(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { case: openCase } = props;
  const { toast } = useToast();

  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {},
  });

  const createTask = clientApi.task.create.useMutation({
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

  async function onSubmit(values: CreateTaskSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const data = {
      ...values,
      caseId: openCase.id,
    };

    createTask.mutate(data);
  }

  const assignEnum: SelectData[] = [
    {
      id: openCase.agentId,
      title: "Agen",
      value: openCase.agentId,
    },
    {
      id: openCase.supervisorId,
      title: "Supervisor",
      value: openCase.supervisorId,
    },
    {
      id: openCase.createdBy,
      title: "Owner",
      value: openCase.createdBy,
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 w-full text-gray-600"
      >
        <FormSelect
          name="assignedTo"
          label="Assign to"
          data={assignEnum}
          placeholder="Select user"
          fullWidth
        />

        <FormTextArea
          label="Task instruction"
          placeholder="Instruction"
          name="taskMessage"
        />

        {createTask.isPending ? (
          <Loader />
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
        <ResponseMessage
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </form>
    </Form>
  );
}

type Props = {
  case: CaseType;
};
