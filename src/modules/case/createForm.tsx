"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";;
import {
  Button,
  Form,
  FormInput,
  Label,
  Loader,
  ResponseMessage,
} from "@/packages/ui";
import {
  CaseSchemaType,
  caseSchema,
} from "@/schema";
import { ComboBox } from "@/components";
import { AuthUserType } from "@/context";
import { clientApi } from "@/client/react";
import { UserRole } from "@prisma/client";

export function CreateForm(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [agentId, setAgentId] = useState<string>("");
  const [supervisorId, setSupervisorId] = useState<string>("");
  const [beneficiaryId, setBeneficiaryId] = useState<string>("");
  const [clientIdError, setClientIdError] = useState<boolean>(false);
  const [agentIdError, setAgentIdError] = useState<boolean>(false);
  const [beneficiaryIdError, setBeneficiaryIdError] = useState<boolean>(false);
  const [supervisorIdError, setSupervisorIdError] = useState<boolean>(false);


  const { auth } = props;
  const role = auth?.role;

  const {data: clients, isLoading: isLoadingClients} = clientApi.client.list.useQuery();
  const { data: beneficiaries, isLoading: isLoadingBeneficiaries } = clientApi.beneficiary.listByClient.useQuery(clientId, {
    enabled: !!clientId // Only run this query if clientId is defined
  });
  const {data: users, isLoading: isLoadingUsers} = clientApi.user.list.useQuery();


  const createCase = clientApi.case.create.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      location.replace(`/dashboard/cases/${data.caseId}`);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      console.log(error)
    },
  })


  const form = useForm<CaseSchemaType>({
    resolver: zodResolver(caseSchema),
    defaultValues: {},
  });

  async function onSubmit(values: CaseSchemaType) {

    setAgentIdError(false);
    setBeneficiaryIdError(false);
    setSupervisorIdError(false);
    setClientIdError(false);
    setSuccessMessage("");
    setErrorMessage("");

    if (clientId === "") {
      setClientIdError(true);
      console.log("ClientId is empty");
    } else if (beneficiaryId === "") {
      setBeneficiaryIdError(true);
    } else if (auth?.role === "Admin" && supervisorId === "") {
      setSupervisorIdError(true);
    } else if (agentId === "") {
      setAgentIdError(true);
    } else {
      const data = {
        clientId,
        supervisorId,
        agentId,
        beneficiaryId,
        ...values,
      };


      createCase.mutate(data);
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 w-full text-gray-600"
      >
        <div className="flex flex-col gap-1 w-full">
          <Label>Client:</Label>
          {clients && (
            <ComboBox
              searchTitle="Select client"
              list={clients}
              setId={setClientId}
            />
          )}
          {clientIdError && (
            <p className="text-xs text-red-500 font-semibold ">Required</p>
          )}
        </div>

        {beneficiaries && <div className="flex flex-col gap-1">
          <Label>Beneficiary</Label>
          {beneficiaries && (
            <ComboBox
              searchTitle="Select beneficiary"
              list={beneficiaries}
              setId={setBeneficiaryId}
            />
          )}
          {beneficiaryIdError && (
            <p className="text-xs text-red-500 font-semibold ">Required</p>
          )}
        </div>}

        {(
          <div className="flex flex-col gap-1">
            <Label>Supervisor</Label>
            {users && (
              <ComboBox
                searchTitle="Select supervisor"
                list={users.filter(
                  (user) => user.role === UserRole.Supervisor,
                )}
                setId={setSupervisorId}
              />
            )}
            {supervisorIdError && (
              <p className="text-xs text-red-500 font-semibold ">Required</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Label>Assign case to:</Label>
          {users && (
            <ComboBox
              searchTitle="Select user"
              list={users.filter(
                (user) => user.role === UserRole.Agent,
              )}
              setId={setAgentId}
            />
          )}
          {agentIdError && (
            <p className="text-xs text-red-500 font-semibold ">Required</p>
          )}
        </div>

        <FormInput
          label="Expected date of completion"
          name="expectedDateOfCompletion"
          type="date"
          fullWidth
        />

        {createCase.isPending ? (
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
  auth?: AuthUserType;
};
