"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Form,
  FormTextArea,
  Label,
  Loader,
  ResponseMessage,
  useToast,

} from "@/packages/ui";
import {

  CreateTaskSchemaType,
  UserType,
  createTaskSchema,
} from "@/schema";
import { ComboBox } from "@/components";
import { clientApi } from "@/client/react";


export function UserTaskForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [userIdError, setUserIdError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { toast } = useToast();
  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {},
  });

  const {data: users, isLoading, error} = clientApi.user.list.useQuery();

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
      assignedTo: userId,
    };

    createTask.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 w-full text-gray-600"
      >
        <div className="flex flex-col gap-1 w-full">
          <Label>Assign to:</Label>
          {users && (
            <ComboBox
              searchTitle="Select user"
              list={users}
              setId={setUserId}
            />
          )}
          {userIdError && (
            <p className="text-xs text-red-500 font-semibold ">Required</p>
          )}
        </div>

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


