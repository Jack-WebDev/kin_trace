import { Button, Dialog, DialogContent, DialogTrigger } from "@/packages/ui";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";
import { AddressType, CaseType, UserType } from "@/schema";

export function NoteActions(props: UserActionsProps) {
  const { case: openCase } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="flex items-center text-white">
          <Plus size={15} className="text-white mr-2" />
          <span className="text-white font-medium font-md">New note</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full min-w-none md:min-w-max ">
        <h1 className="font-semibold text-2xl text-start">Add new note</h1>

        <CreateForm case={openCase} />
      </DialogContent>
    </Dialog>
  );
}

type UserActionsProps = {
  case: CaseType;
};
