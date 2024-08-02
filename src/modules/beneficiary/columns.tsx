"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DataTableColumnHeader,
} from "@/packages/ui";
import { BeneficiaryType } from "@/schema";
import { CrudActions } from "@/components";
import { formatDate } from "@/utils";
import { Client } from "../client";

export const beneficiaryColumns: ColumnDef<BeneficiaryType>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Client" />;
    },

    cell: ({ row }) => {
      const user = row.original;
      const avatarFallBack =
        user?.name.slice(0, 1) + user?.surname.slice(0, 1);

      return (
        <div className="flex items-center w-full gap-4">
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
    accessorKey: "clientId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Client" />;
    },
    cell: async ({ row }) => {
      const clientId: string = row.getValue("clientId");
      return <Client clientId={clientId} />;
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date captured" />;
    },
    cell: async ({ row }) => {
      const createdAt: string = row.getValue("createdAt");

      return <span>{formatDate(createdAt)}</span>;
    },
  },

  {
    accessorKey: "traceStatus",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Trace status" />;
    },
    cell: ({ row }) => {
      const status: string = row.getValue("traceStatus");

      return (
        <Badge variant={status === "Untraced" ? "danger" : "success"}>
          {status}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => {
      return <div className="text-center w-full">Actions</div>;
    },
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="w-full flex items-center justify-center">
          <CrudActions
            id={client.id}
            url="/dashboard/clients"
            partial
            remove
            model="beneficiaries"
          />
        </div>
      );
    },
  },
];
