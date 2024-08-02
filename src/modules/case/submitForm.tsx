"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Form,
  FormInput,
  FormSelect,
  FormTextArea,
  Label,
  Loader,
  ResponseMessage,
  useToast,
} from "@/packages/ui";
import {
  BeneficiaryType,
  CaseSchemaType,
  CaseType,
  ClientType,
  UpdateCaseSchemaType,
  UserType,
  caseSchema,
  updateCaseSchema,
} from "@/schema";
import { caseStatusList, traceStatusList } from "@/enum/constants";
import { clientApi } from "@/client/react";
import { CaseStatus } from "@prisma/client";

export function SubmitForm(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { toast } = useToast();
  const { case: openCase } = props;

  const form = useForm<UpdateCaseSchemaType>({
    resolver: zodResolver(updateCaseSchema),
    defaultValues: {},
  });

  const watch = form.watch();

  const submitCase = clientApi.case.update.useMutation({
    onSuccess: async(data) => {
      setSuccessMessage(data.message);
      toast({
        variant: "success",
        title: "Success!",
        description: data.message,
      });
      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
        }, 2000),
      );
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

  async function onSubmit(values: UpdateCaseSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const data = {
      id: openCase?.id,
      traceStatus: values.traceStatus,
      status: CaseStatus.Submitted,
    };

    submitCase.mutate(data);
  }

  return loading ? (
    <Loader />
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 w-full text-gray-600"
      >
        <h1 className="font-semibold text-2xl text-start">Submit case</h1>
        <FormSelect
          label="Trace status"
          name="traceStatus"
          placeholder="Select trace status"
          data={traceStatusList}
          fullWidth
          defaultValue={openCase.traceStatus}
        />


        {watch.status === "Open" && (
          <FormInput
            label="Expected date of completion"
            name="duration"
            type="date"
            fullWidth
            // defaultValue={openCase.duration}
          />
        )}

        {submitCase.isPending ? (
          <Loader />
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
        <div className="max-w-[400px]">
          <ResponseMessage
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </div>
      </form>
    </Form>
  );
}

type Props = {
  case: CaseType;
};
