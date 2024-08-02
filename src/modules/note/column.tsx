"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, DataTableColumnHeader } from "@/packages/ui";
import { CrudActions } from "@/components";
import { User } from "../user";
import { formatDate } from "@/utils";
import { ViewPopup } from "../shared";
import { Note } from "@prisma/client";

export const noteColumns: ColumnDef<Note>[] = [
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User" />;
    },

    cell: ({ row }) => {
      const userId: string = row.getValue("userId");

      return (
        <div className="flex w-full items-center gap-4">
          <User userId={userId} />
        </div>
      );
    },
  },

  {
    accessorKey: "caseId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Case" />;
    },
    // cell: ({ row }) => {
    //     const userId: string = row.getValue('assignedTo');

    //     return (
    //       <div className="flex items-center w-full gap-4">
    //         <User userId={userId}/>
    //       </div>
    //     );
    //   },
  },
  {
    accessorKey: "taskId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Task" />;
    },
  },

  {
    accessorKey: "message",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Note" />;
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
        <div className="flex w-full items-center gap-4">
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
            status === "Created"
              ? "secondary"
              : status === "Opened"
                ? "danger"
                : "success"
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
      return <div className="w-full text-center">Actions</div>;
    },
    cell: ({ row }) => {
      const note = row.original;
      return (
        <div className="flex w-full items-center justify-center">
          <ViewPopup type="note" item={note} />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];

export const taskNoteColumns: ColumnDef<Note>[] = [
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User" />;
    },

    cell: ({ row }) => {
      const userId: string = row.getValue("userId");

      return (
        <div className="flex w-full items-center gap-4">
          <User userId={userId} />
        </div>
      );
    },
  },

  {
    accessorKey: "taskId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Task" />;
    },
  },

  {
    accessorKey: "message",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Note" />;
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
        <div className="flex w-full items-center gap-4">
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
            status === "Created"
              ? "secondary"
              : status === "Opened"
                ? "danger"
                : "success"
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
      return <div className="w-full text-center">Actions</div>;
    },
    cell: ({ row }) => {
      const note = row.original;
      return (
        <div className="flex w-full items-center justify-center">
          <CrudActions
            id={note.id}
            url="/dashboard/notes"
            model="notes"
            partial
            edit
          />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];

export const caseNoteColumns: ColumnDef<Note>[] = [
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User" />;
    },

    cell: ({ row }) => {
      const userId: string = row.getValue("userId");

      return (
        <div className="flex w-full items-center gap-4">
          <User userId={userId} />
        </div>
      );
    },
  },

  {
    accessorKey: "message",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Note" />;
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
        <div className="flex w-full items-center gap-4">
          <p>{formatDate(date)}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => {
      return <div className="w-full text-center">Actions</div>;
    },
    cell: ({ row }) => {
      const note = row.original;
      return (
        <div className="flex w-full items-center justify-center">
          <ViewPopup type="note" item={note} />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
