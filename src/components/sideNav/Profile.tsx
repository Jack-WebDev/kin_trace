"use client";
import React from "react";
import { LogOut, CircleUser } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  Loader,
} from "@/packages/ui";
import { LinkIconButton } from "../LinkButton";
import { clientApi } from "@/client/react";

export const Profile = () => {
  const { data: userProfile, isLoading, error } = clientApi.user.me.useQuery();

  if (error) {
    return null;
  }

  const avatarFallBack =
    userProfile &&
    userProfile?.name.slice(0, 1) + userProfile?.surname.slice(0, 1);

  return isLoading ? (
    <Loader size="xs" className="h-10 w-10 min-w-0 border-primary" />
  ) : (
    userProfile && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-full cursor-pointer items-center  gap-3 rounded-lg bg-transparent p-4 px-3 shadow-lg md:bg-primary/20 md:dark:bg-secondaryBg/50 ">
            <div className="flex flex-col items-center gap-x-4 gap-y-2 md:flex-row ">
              <Avatar>
                <AvatarImage
                  src={userProfile?.image ? userProfile?.image : ""}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-200 p-4 text-black dark:bg-[#252729] dark:text-gray-400">
                  {avatarFallBack ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="hidden text-xs font-bold md:flex">
                  {userProfile?.name + " " + userProfile?.surname}
                </p>
                <p className="flex items-center gap-2 text-xs  font-bold capitalize text-secondary">
                  {userProfile?.role?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-1 w-56 border-none bg-white p-0 dark:bg-secondaryBg">
          <DropdownMenuItem className="w-full p-0">
            <LinkIconButton
              title="Profile"
              link={true}
              url={`/dashboared/profile/${userProfile.id}`}
              Icon={CircleUser}
            />
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full p-0">
            <LinkIconButton
              title="Logout"
              link={true}
              url="/logout"
              Icon={LogOut}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};
