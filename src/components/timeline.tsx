import { CasePerson } from "@/modules/case";
import { Badge } from "@/packages/ui";
import { formatDate } from "@/utils";
import { Clock1 } from "lucide-react";
import React from "react";
import { Activity } from "@prisma/client";

export const Timeline = (props: TimelineProps) => {
  const { activities } = props;

  return activities.length === 0 ? (
    <div className="flex w-full items-center justify-center p-4">
      <p className="text-textColorLight">Timeline empty</p>
    </div>
  ) : (
    <div className='after:top0 relative flex  w-max flex-col py-0 before:content-[""] after:absolute after:bottom-0 after:left-1/2 after:z-10 after:h-full  after:w-1 after:bg-primaryBg'>
      {activities.map((item, count) => (
        <div
          key={item.id}
          className={
            count % 2 === 0
              ? "relative z-50  flex w-full translate-x-1/2 flex-col gap-3 px-8  py-2 md:w-[500px]"
              : "relative z-50 flex w-full -translate-x-1/2 flex-col items-end gap-3 px-8  py-2 md:w-[500px]"
          }
        >
          <div
            className={
              count % 2 === 0
                ? "absolute left-0 top-0 z-50 flex h-fit w-fit -translate-x-1/2 items-center justify-center rounded-full bg-primaryBg  p-2 "
                : "absolute right-0 top-0 z-50 flex h-fit w-fit translate-x-1/2 items-center justify-center rounded-full bg-primaryBg  p-2 "
            }
          >
            <Clock1 size={18} className="text-textColorLight" />
          </div>
          <Badge
            variant="primary"
            className='relative  z-50 w-max after:absolute after:left-0 after:right-0 after:top-full after:-z-20 after:mx-auto after:h-4 after:w-4 after:-translate-y-1/2 after:rotate-45 after:bg-primary after:content-[""]'
          >
            {formatDate(item.createdAt.toISOString(), true)}
          </Badge>
          <div
            className={
              count % 2 === 0
                ? "z-50 w-full max-w-[500px] rounded-lg border border-borderColor/50 bg-primaryBg p-4 shadow-lg"
                : "z-50 flex w-full max-w-[500px] flex-col items-end rounded-lg border border-borderColor/50 bg-primaryBg p-4 shadow-lg"
            }
          >
            <CasePerson id={item.userId} type="user" />
            <p
              className={
                count % 2 === 0
                  ? "w-full px-4 text-textColorLight"
                  : "w-full px-4 text-right text-textColorLight"
              }
            >
              {item.activityDesc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

type TimelineProps = {
  activities: Activity[];
};
