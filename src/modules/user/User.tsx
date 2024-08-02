"use client";

import { ClientType, UserType } from "@/schema";
import { Avatar, AvatarFallback, AvatarImage, Loader } from "@/packages/ui";
import React, { useState, useEffect } from "react";
import { clientApi } from "@/client/react";

export const User = (props: UserProps) => {
  const { userId, bold, image } = props;
  const {data: user, isLoading} = clientApi.user.single.useQuery(userId);

  if(!user){
    return null;
  }

  const avatarFallBack = user?.name.slice(0, 1) + user?.surname.slice(0, 1);

  return isLoading ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loader size="xs" className="w-8 h-8" />
    </div>
  ) : (
    user &&
      (image ? (
        <div className="flex items-center w-full gap-4 ">
          <Avatar>
            <AvatarImage
              src={user?.image ? user?.image : ""}
              className="object-cover"
            />
            <AvatarFallback className="font-normal text-black dark:text-gray-400 p-4 bg-gray-200 dark:bg-[#252729]">
              {avatarFallBack || "U"}
            </AvatarFallback>
          </Avatar>

          <p className="font-semibold text-sm ">
            {user.name + " " + user.surname}
          </p>
        </div>
      ) : (
        <div className="w-max">
          <span className={bold ? "font-semibold" : ""}>
            {user?.name + " " + user?.surname}
          </span>
        </div>
      ))
  );
};

type UserProps = {
  userId: string;
  bold?: boolean;
  image?: boolean;
};
