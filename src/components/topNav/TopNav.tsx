"use client";

import React, { useState } from "react";
import { Bell, AlignLeft, BellIcon, ListChecks } from "lucide-react";

import { ThemeToggle } from "./ThemeToggler";
import { Badge } from "@/packages/ui";
import { usePathname } from "next/navigation";
import { PageHeader } from "..";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  Loader,
} from "@/packages/ui";
import { LinkIconButton } from "../LinkButton";
import type { NotificationType } from "@/schema";
import { clientApi } from "@/client/react";
// import { Task } from "@prisma/client";

export function TopNav() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const location = pathSegments[2] ?? pathSegments[1];
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  // const [tasks, setTasks] = useState<Task[]>([]);

  const { data: userProfile, isLoading, error } = clientApi.user.me.useQuery();

  if (error) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 flex h-24 w-full items-center justify-between border-b bg-white px-2 py-8 shadow-sm dark:border-none dark:bg-sideBarBg md:px-6">
      <div className="flex items-center gap-4">
        <AlignLeft size={40} className="cursor-pointer text-gray-500" />
        <PageHeader title={location ?? ""} header={true} />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isLoading ? (
          <Loader size="xs" className="h-10 w-10 min-w-0 border-primary" />
        ) : (
          <div className="max-w-[100px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative flex h-fit w-fit cursor-pointer">
                  <BellIcon className="relative bottom-0 left-0 right-0 top-0 h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <Badge
                    variant="success"
                    className="absolute right-[-5px] top-[-10px] flex h-4 w-4 items-center justify-center rounded-full p-0 text-xs font-normal"
                  >
                    {/* {notifications.length + tasks.length} */}
                  </Badge>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-1 w-48 bg-white p-0 dark:bg-[#1a1c1e]">
                <DropdownMenuItem className="w-full p-0">
                  <LinkIconButton
                    title="Notifications"
                    link={true}
                    url={`/dashboard/notifications/${userProfile?.id}`}
                    Icon={Bell}
                    badge={true}
                    badgeValue={notifications.length}
                    badgeVariant="inbox"
                  />
                </DropdownMenuItem>

                {/* <DropdownMenuItem className="w-full p-0">
                  <LinkIconButton
                    title="Tasks"
                    link={true}
                    url={`/dashboard/tasks/${userProfile?.id}`}
                    Icon={ListChecks}
                    badge={true}
                    badgeValue={tasks.length}
                    badgeVariant="tasks"
                  />
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
