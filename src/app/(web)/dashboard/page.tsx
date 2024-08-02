import { serverApi } from "@/client/server";
import {
  CaseList,
  DashboardWidget,
  Notification,
  TaskList,
} from "@/modules/dashboard";

import { Beneficiary, Case, Client, Task, TraceStatus } from "@prisma/client";
import { ClipboardList, HardDrive, Radio } from "lucide-react";
import React from "react";

const Page = async () => {
  const cases = await serverApi.case.list();
  const tasks = await serverApi.task.list();
  const clients = await serverApi.client.list();
  const beneficiaries = await serverApi.beneficiary.list();

  const closeCases = cases.filter((item) => item.status === "Closed");
  const openCases = cases.filter((item) => item.status === "Open");
  const submittedCases = cases.filter((item) => item.status === "Submitted");
  const found = beneficiaries.filter((item) => item.traceStatus === "Found");
  const notFound = beneficiaries.filter(
    (item) => item.traceStatus === TraceStatus.NotFound,
  );

  return (
    <div className="flex h-max w-full flex-col gap-6 ">
      <div className="flex w-full flex-wrap justify-between gap-x-8 gap-y-8">
        <DashboardWidget
          Icon={ClipboardList}
          title="Total cases"
          total={cases.length}
          completed={closeCases.length}
          open={openCases.length}
          submitted={Number(submittedCases.length || 0)}
          className="bg-primaryBg"
          link="/dashboard/cases"
          iconClassName="p-2 bg-primary text-white rounded-full"
        />

        <DashboardWidget
          Icon={HardDrive}
          title="Capturing"
          total={300}
          clients={clients.length}
          beneficiaries={beneficiaries.length}
          className="bg-primaryBg"
          iconClassName="p-2 bg-secondary text-white rounded-full"
          capturing
          link="/dashboard/clients"
        />

        <DashboardWidget
          Icon={Radio}
          title="Tracing"
          traced={found.length + notFound.length}
          total={found.length + notFound.length}
          found={found.length}
          completed={found.length}
          notFound={notFound.length}
          className="bg-primaryBg"
          iconClassName="p-2 bg-success text-white rounded-full"
          tracing
          link="/dashboard/beneficiaries"
        />
      </div>

      <div className="flex max-h-none  flex-wrap items-stretch justify-start gap-x-10 gap-y-5 md:flex-row">
        <TaskList />

        <Notification />
      </div>

      <CaseList />
    </div>
  );
};

export default Page;
