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
import {UserType } from "@/schema";
import { Task } from "@prisma/client";
import { CrudActions } from "@/components";
import { User } from "../user";
import { formatDate } from "@/utils";
import { ViewPopup } from "../shared";

export const caseTaskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created By" />;
    },

    cell: ({ row }) => {
      const userId: string = row.getValue("createdBy");

      return (
        <div className="flex items-center w-full gap-4">
          <User userId={userId} />
        </div>
      );
    },
  },

  {
    accessorKey: "assignedTo",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Assigned to" />;
    },
    cell: ({ row }) => {
      const userId: string = row.getValue("assignedTo");

      return (
        <div className="flex items-center w-full gap-4">
          <User userId={userId} />
        </div>
      );
    },
  },
  {
    accessorKey: "taskMessage",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Task instructions" />
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");

      return (
        <div className="flex items-center w-full gap-4">
          <p>{formatDate(date)}</p>
        </div>
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
        <Badge
          variant={
            status === "Open"
              ? "secondary"
              : status === "Closed"
                ? "success"
                : "danger"
          }
        >
          <p className="text-xs">{status}</p>
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
      const task: Task = row.original;
      return (
        <div className="w-full flex items-center justify-center">
          <ViewPopup item={task} type="task" />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
