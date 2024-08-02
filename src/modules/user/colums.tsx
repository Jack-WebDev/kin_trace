"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DataTableColumnHeader,
} from "@/packages/ui";
import type { UserType } from "@/schema";
import { CrudActions } from "@/components";

export const userColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User" />;
    },

    cell: ({ row }) => {
      const user = row.original;
      const avatarFallBack =
        user?.name.slice(0, 1) + user?.surname.slice(0, 1);

      return (
        <div className="flex w-full items-center gap-4">
          <Avatar>
            <AvatarImage
              src={user?.image ? user?.image : ""}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-200 p-4 font-normal text-black dark:bg-[#252729] dark:text-gray-400">
              {avatarFallBack || "U"}
            </AvatarFallback>
          </Avatar>

          <p className="text-sm font-semibold ">
            {user.name + " " + user.surname}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Role" />;
    },

    cell: ({ row }) => {
      const role: string = row.getValue("role");
      return (
        <Badge
          variant={
            role === "Admin"
              ? "success"
              : role === "Supervisor"
                ? "secondary"
                : "danger"
          }
        >
          <p className="text-xs">{role}</p>
        </Badge>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge variant={status === "Active" ? "success" : "danger"}>
          <p className="text-xs">{status}</p>
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => {
      return <div className="w-full text-center">Actions</div>;
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex w-full items-center justify-center">
          <CrudActions
            id={user.id}
            url="/dashboard/users"
            model="user"
            partial
            remove
            view
          />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
