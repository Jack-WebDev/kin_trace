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
} from "@/packages/ui";
import {
  BeneficiaryType,
  CaseType,
  ClientType,
  UpdateCaseSchemaType,
  UserType,
  updateCaseSchema,
} from "@/schema";
import { ComboBox } from "@/components";

import { caseStatusList, traceStatusList } from "@/enum/constants";
import { clientApi } from "@/client/react";
import { UserRole } from "@prisma/client";

export function UpdateForm(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [agentId, setAgentId] = useState<string>("");
  const [supervisorId, setSupervisorId] = useState<string>("");

  const { data: users, isLoading: isLoadingClients } =
    clientApi.user.list.useQuery();

  const updateCase = clientApi.case.update.useMutation({  
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      location.reload();
    },
    onError: (error) => {
      setErrorMessage(error.message);
      console.log(error)
    },
  });

  const { case: openCase } = props;

  const form = useForm<UpdateCaseSchemaType>({
    resolver: zodResolver(updateCaseSchema),
    defaultValues: {},
  });

  const watch = form.watch();

  async function onSubmit(values: UpdateCaseSchemaType) {
    setSuccessMessage("");
    setErrorMessage("");

    const data = {
      id: openCase?.id,
      supervisorId: supervisorId ? supervisorId : openCase.supervisorId,
      agentId: agentId ? agentId : openCase.agentId,
      expectedDateOfCompletion: values.expectedDateOfCompletion
        ? values.expectedDateOfCompletion
        : openCase.expectedDateOfCompletion,
      comment: values.comment,
      status: values.status,
      traceStatus: values.traceStatus,
    };

    updateCase.mutate(data);
  }

  return loading ? (
    <Loader />
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full flex-col gap-4 text-gray-600"
      >
        <div className="flex flex-col gap-1">
          <Label>Supervisor</Label>
          {users && (
            <ComboBox
              searchTitle="Change supervisor"
              list={users.filter((user) => user.role === UserRole.Supervisor)}
              setId={setSupervisorId}
            />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label>Assign case to:</Label>
          {users && (
            <ComboBox
              searchTitle="Reassign to a new agent"
              list={users.filter((user) => user.role === UserRole.Agent)}
              setId={setAgentId}
            />
          )}
        </div>

        <FormSelect
          label="Case status"
          name="status"
          placeholder="Select case status"
          data={caseStatusList}
          fullWidth
          defaultValue={openCase.status}
        />

        {watch.status === "Closed" && (
          <>
            <FormSelect
              label="Trace status"
              name="traceStatus"
              placeholder="Select trace status"
              data={traceStatusList}
              fullWidth
              defaultValue={openCase.traceStatus}
            />
          </>
        )}
        {watch.status === "Open" && (
          <FormInput
            label="Expected date of completion"
            name="duration"
            type="date"
            fullWidth
            // defaultValue={openCase.duration}
          />
        )}

        {form.formState.isSubmitting ? (
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
