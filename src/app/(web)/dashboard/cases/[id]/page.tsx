
import { serverApi } from "@/client/server";
import { PageHeader } from "@/components";
import { getAuth } from "@/context";
import { CaseActions, CaseItemLabel, CasePerson } from "@/modules/case";
import { CaseTabs } from "@/modules/case/tabs";
import { formatDate } from "@/utils";
import { CaseStatus, TraceStatus } from "@prisma/client";
import { Building2, ClipboardList, Clock, Eye } from "lucide-react";
import React from "react";
import { omit } from "lodash";
import { z } from "zod";

const schema = z.string().uuid();
const isUUID = (id: string) => schema.safeParse(id).success;

const Page = async (props: PageProps) => {
  const { params, searchParams } = props;
  const auth = await getAuth();

  if (!isUUID(params.id!)) {
    return null;
  }

  const singleCase = await serverApi.case.single(params.id!);
  
  const beneficiary = singleCase?.beneficiary

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <PageHeader
          Icon={ClipboardList}
          title={`Viewing case ${singleCase?.caseNumber}`}
        />
        {
         singleCase && singleCase?.status !== CaseStatus.Closed && (
            <CaseActions close case={singleCase} type={auth.role} />
          )}
      </div>

      <div className="flex flex-col gap-4 p-4 border border-borderColor/50 rounded-lg bg-primaryBg dark:bg-primaryBg/50 ">
        <div className="flex flex-wrap  items-center md:justify-between max-w-full gap-x-4 gap-y-4 border-b  dark:border-borderColor/30 pb-4 ">
         {singleCase && <CaseItemLabel
            label="Date"
            Icon={Clock}
            value={formatDate(singleCase?.createdAt.toISOString())}
          />}
          <CaseItemLabel
            label="City"
            Icon={Building2}
            value={singleCase?.city ?? ""}
          />
          {singleCase && <CaseItemLabel
            label="Expected completion time"
            Icon={Clock}
            value={formatDate(singleCase?.expectedDateOfCompletion.toISOString())}
          />}
          <CaseItemLabel
            label="Trace status"
            badge
            value={singleCase?.traceStatus ?? ""}
          />
          {singleCase && <CaseItemLabel label="Status" badge value={singleCase?.status} />}
        </div>

        {/* {singleCase.comment && (
          <div className="w-full md:w-[500px] border border-borderColor/50 shadow-md flex flex-col gap-1 bg-transparent p-4 rounded-lg">
            <span className="text-textColorLight font-semibold ">
              Closing comment:
            </span>
            <p className="text-textColor text-xs mb-2">
              {singleCase.comment.slice(0, 200)}
            </p>
            <ViewPopup item={singleCase} type="caseLight" link />
          </div>
        )} */}

        <div className="flex flex-wrap items-center justify-start gap-8">
          <CasePerson
            type="user"
            id={singleCase?.createdBy ?? ""}
            label="Case owner"
            border
            view
          />
          <CasePerson
            type="user"
            id={singleCase?.supervisorId ?? ""}
            label="Supervisor"
            border
            view
          />
          <CasePerson
            type="client"
            id={singleCase?.clientId ?? ""}
            label="Client"
            view
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border border-borderColor/50 rounded-lg bg-primaryBg dark:bg-primaryBg/50 ">
        <div className="w-full flex flex-wrap items-center justify-start gap-x-10">
          <CasePerson
            type="user"
            id={singleCase?.agentId ?? ""}
            label="Case assigned to"
            border
            view
          />

          <CaseItemLabel
            label="Arrival at location"
            badge
            value="Not Arrived"
          />
        </div>

       {singleCase && <CaseTabs
          beneficiaryId={singleCase?.beneficiaryId}
          case={singleCase}
          auth={auth}
        />}
      </div>
    </div>
  );
};

export default Page;

export type PageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};
