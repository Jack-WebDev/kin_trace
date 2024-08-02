"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DataTableColumnHeader,
} from "@/packages/ui";
import { ClientType } from "@/schema";
import { CrudActions } from "@/components";

export const clientColumns: ColumnDef<ClientType>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Client" />;
    },

    cell: ({ row }) => {
      const user = row.original;
      const avatarFallBack = user?.name.slice(0, 1) + user?.surname.slice(0, 1);

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
    accessorKey: "idNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID number" />;
    },
  },

  {
    accessorKey: "employeeNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Employee number" />;
    },
  },

  {
    accessorKey: "country",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Country" />;
    },
  },

  {
    id: "actions",
    header: ({ column }) => {
      return <div className="w-full text-center">Actions</div>;
    },
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex w-full items-center justify-center">
          <CrudActions
            id={client.id}
            url="/dashboard/clients"
            partial
            remove
            view
            model="client"
          />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
