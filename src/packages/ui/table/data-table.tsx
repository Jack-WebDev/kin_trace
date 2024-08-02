"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "..";
import { DataTableViewOptions } from "./dataTableViewOptions";
import { Search } from "lucide-react";
import { Input } from "..";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  searchColumn: keyof TData;
  search?: boolean;
  filter?: boolean;
}

export function DataTable<TData>({
  columns,
  data,
  searchColumn,
  search,
  filter,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex max-w-full flex-1 flex-col gap-5 bg-transparent">
      {filter && (
        <div className="bg-primaryBg dark:bg-primaryBg/50 flex max-w-full flex-1 flex-col rounded-lg px-8 py-4 shadow-lg">
          <div className="w-full flex items-start justify-between gap-4 py-4 md:flex-row md:items-center">
            <h1 className="justify-self-start text-xl font-semibold text-primary">
              Filter
            </h1>
            <div className="flex w-fit items-center gap-5">
              {search && (
                <div className="border-borderColor flex h-12 max-w-xs items-center gap-3 rounded-lg border p-2">
                  <Search size={20} className="text-textColorLight" />
                  <Input
                    type="text"
                    className="placeholder:text-textColorLight h-12 max-w-xs border-none bg-transparent"
                    placeholder={`Search by ${String(searchColumn)}`}
                    onChange={(e) =>
                      table
                        .getColumn(String(searchColumn))
                        ?.setFilterValue(e.target.value)
                    }
                  />
                </div>
              )}

              <DataTableViewOptions table={table} />
            </div>
          </div>
        </div>
      )}

      <div className="bg-primaryBg dark:bg-primaryBg/50 rounded-lg p-4 px-8 shadow-lg">
        <div className="h-fit min-h-0 min-w-0 overflow-x-auto rounded-lg">
          <Table className="border-borderColor rounded-lg border-b shadow-lg">
            <TableHeader className="bg-transparent py-4">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-borderColor border-b hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="border-none py-4 text-gray-700 dark:text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="text-textColor border-none text-sm font-normal">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-borderColor border-b hover:bg-primary/10"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="h-8 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

// Usage example
// <DataTable columns={columns} data={data} searchColumn="name" search filter />
