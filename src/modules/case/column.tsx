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
import { CaseType } from "@/schema";
import { CrudActions } from "@/components";
import { User } from "../user";
import { Client } from "../client";
import { Beneficiary } from "../beneficiary";

export const caseColumns: ColumnDef<CaseType>[] = [
  {
    accessorKey: "caseNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Case number" />;
    },
  },

  {
    accessorKey: "supervisorId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Supervisor" />;
    },

    cell: ({ row }) => {
      const userId: string = row.getValue("supervisorId");
      return <User userId={userId} />;
    },
  },
  {
    accessorKey: "agentId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Agent" />;
    },

    cell: ({ row }) => {
      const userId: string = row.getValue("agentId");
      return <User userId={userId} />;
    },
  },

  {
    accessorKey: "clientId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Client" />;
    },

    cell: ({ row }) => {
      const clientId: string = row.getValue("clientId");
      return <Client clientId={clientId} />;
    },
  },

  {
    accessorKey: "beneficiaryId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Beneficiary" />;
    },

    cell: ({ row }) => {
      const beneficiaryId: string = row.getValue("beneficiaryId");
      return <Beneficiary beneficiaryId={beneficiaryId} />;
    },
  },

  {
    accessorKey: "city",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="City" />;
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
        <Badge variant={status === "Open" ? "secondary" : "success"}>
          <p className="text-xs">{status}</p>
        </Badge>
      );
    },
  },

  {
    accessorKey: "traceStatus",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Trace outcome" />;
    },

    cell: ({ row }) => {
      const traceStatus: string = row.getValue("traceStatus");
      return (
        <Badge
          variant={
            traceStatus === "Untraced"
              ? "secondary"
              : traceStatus === "Found"
                ? "success"
                : "danger"
          }
        >
          <p className="text-xs">{traceStatus}</p>
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
      const thisCase = row.original;
      return (
        <div className="w-full flex items-center justify-center">
          <CrudActions
            id={thisCase.id}
            url="/dashboard/cases"
            model="cases"
            partial
            view
          />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
