"use client";

import { formatDate } from "@/utils";
import React, { useState, useEffect } from "react";
import { User } from "../user";
import { Badge, Button, Loader, useToast } from "@/packages/ui";
import Link from "next/link";
import { Eye } from "lucide-react";
import { clientApi } from "@/client/react";
import { NotificationStatus } from "@prisma/client";
import { Notification } from "@prisma/client";


export const ShowNotification = (props: ShowNotificationProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { notification } = props;


  const { toast } = useToast();

  const updateNotification = clientApi.notification.update.useMutation()



  useEffect(() => {

    const data = {
      id: notification.id,
      status: NotificationStatus.Opened
    };

    updateNotification.mutate(data);

  }, [notification]);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full p-4">
      <div className="flex items-center w-full justify-between mb-3">
        <NotificationItem
          label="Date"
          value={formatDate(notification.createdAt.toISOString())}
        />
        <NotificationItem
          label="Category"
          badge
          value={notification.category}
        />
      </div>

      {notification.recepientId && (
        <NotificationItem label="Sender" user value={notification.recepientId} />
      )}

      <div className="flex items-center justify-start py-4">
        <NotificationItem label="Message" value={notification.message} />
      </div>

      <div className="flex items-center justify-end gap-2 w-full mt-4">
        {notification.caseId && (
          <Link
            href={`/dashboard/cases/${notification.caseId}`}
            className="flex items-center text-primary hover:text-white hover:bg-primary gap-2 border border-primary px-2 rounded-md hover:shadow-lg"
          >
            <Eye size={22} className="text-inherit" />
            <p className="text-xs text-inherit font-semibold ">View case</p>
          </Link>
        )}

        {notification.taskId && (
          <Link
            href={`/dashboard/tasks/${notification.taskId}`}
            className="flex items-center text-primary hover:text-white hover:bg-primary gap-2 border border-primary px-2 rounded-md hover:shadow-lg"
          >
            <Eye size={22} className="text-inherit" />
            <p className="text-xs text-inherit font-semibold">View task</p>
          </Link>
        )}
      </div>
    </div>
  );
};

const NotificationItem = (props: ItemProps) => {
  const { label, value, user, badge } = props;

  return (
    <div className="flex flex-col gap-1 ">
      <span className="text-textColorLight text-sm">{label}:</span>
      {user ? (
        <User userId={value} />
      ) : badge ? (
        <Badge
          className="flex items-center justify-center"
          variant={
            value === "Case"
              ? "success"
              : value.startsWith("General")
                ? "success"
                : value.includes("Task") || value.includes("task")
                  ? "secondary"
                  : "danger"
          }
        >
          <p className="text-xs">{value}</p>
        </Badge>
      ) : (
        <span className="text-textColor text-sm max-w-[400px]">{value}</span>
      )}
    </div>
  );
};

type ShowNotificationProps = {
  notification: Notification;
};

type ItemProps = {
  label: string;
  value: string;
  user?: boolean;
  badge?: boolean;
};
