"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Form,
  FormInput,
  FormSelect,
  FormTextArea,
  Loader,
  ResponseMessage,
  SelectData,
  useToast,
} from "@/packages/ui";
import {
  CaseType,
  CreateNoteSchemaType,
  createNoteSchema,
} from "@/schema";
import { clientApi } from "@/client/react";
import { create } from "lodash";

export function CreateForm(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { case: openCase } = props;

  const { toast } = useToast();

  const form = useForm<CreateNoteSchemaType>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {},
  });

  const createNote = clientApi.note.create.useMutation({
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

  async function onSubmit(values: CreateNoteSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const data = {
      ...values,
      caseId: openCase.id,
    };

    createNote.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 w-full text-gray-600"
      >
        <FormTextArea
          label="Note"
          placeholder="enter your message here..."
          name="message"
        />

        {createNote.isPending ? (
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
