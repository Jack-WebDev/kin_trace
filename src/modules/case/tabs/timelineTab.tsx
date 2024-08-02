
import { serverApi } from "@/client/server";
import { Timeline } from "@/components";
import { ActivityType } from "@/schema";
import React from "react";

export const TimelineTab = async (props: TimelineTabProps) => {
  const { caseId } = props;

  const activities = await serverApi.activity.listByCase(caseId);

  return (
    <div className="w-full p-8 flex flex-col items-center">
      <Timeline activities={activities} />
    </div>
  );
};

type TimelineTabProps = {
  caseId: string;
};
