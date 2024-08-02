
import { formatDate } from "@/utils";
import { Bell } from "lucide-react";
import React from "react";
import { LinkButton } from ".";
import { Notification as NotificationType } from "@prisma/client";
import { serverApi } from "@/client/server";
import { ViewPopup } from "../shared";



export const Notification = async () => {
  const notifications = await serverApi.notification.list();

  return (
    <div className="flex-1 max-h-[500px]  w-full md:max-w-[900px] md:w-2/5 flex flex-col items-start bg-primaryBg p-8 rounded-lg shadow-lg relative">
      <div className="flex w-full items-center justify-between mb-8">
        <div className="flex items-center gap-x-2">
          <Bell
            size={40}
            className="p-2 bg-secondary text-white rounded-full"
          />
          <h1 className="font-semibold text-textColor text-lg">
            New notifications
          </h1>
        </div>

        <LinkButton url="/dashboard/notifications" />
      </div>

      <div className="flex items-center w-full border-b border-secondary pb-2 px-2 text-textColor mb-3">
        <span className="w-1/5 text-sm font-normal text-inherit">Category</span>
        <span className="w-1/5 text-sm font-normal text-inherit">Date</span>
        <span className="w-2/5 text-sm font-normal text-inherit">Message</span>
        <span className="w-1/5 text-sm font-normal text-inherit">Action</span>
      </div>

      <div className="flex flex-col w-full max-h[300px] overflow-y-auto scrollbar-hide gap-2">
        {notifications && notifications.length > 0 ? (
          notifications.map((item: NotificationType) => (
            <NotificationItem key={item.id} notification={item} />
          ))
        ) : (
          <div className="w-full flex items-center justify-center py-4">
            <p className="text-md font-semibold text-textColorExtraLight">
              No notifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationItem = (props: NotificationItemProps) => {
  const { notification } = props;
  return (
    <div className="flex items-center text-textColor gap-4 px-2 py-1 bg-secondaryBg dark:bg-secondaryBg/20 hover:text-black hover:bg-primary/20 hover:dark:bg-[#6759d1]/20 dark:hover:text-white rounded-lg relative z-50">
      <div
        className={
          notification.status === "New"
            ? "bg-success -z-10 h-full w-1 absolute top-0 bottom-0 left-0 rounded-tl-lg rounded-bl-lg p-0 "
            : ""
        }
      ></div>
      <span className="w-1/5 text-xs font-semibold text-inherit">
        {notification.category}
      </span>
      <span className="w-1/5 text-xs font-semibold text-inherit">
        {formatDate(notification.createdAt.toISOString(), true)}
      </span>
      <p className="w-2/5 text-xs font-semibold text-inherit">
        {notification.message.slice(0, 30)}...
      </p>
      <div className="w-1/5 text-xs font-semibold text-inherit">
        <ViewPopup item={notification} type="notification" smallAction />
      </div>
    </div>
  );
};

type NotificationItemProps = {
  notification: NotificationType;
};


