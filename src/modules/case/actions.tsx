import { Button, Dialog, DialogContent, DialogTrigger } from "@/packages/ui";
import { Check, Pen, Plus } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";
import { UpdateForm } from "./updateForm";
import { AuthUserType } from "@/context";
import { SubmitForm } from "./submitForm";
import { Case, UserRole } from "@prisma/client";

export function CaseActions(props: CaseActionProps) {
  const { close, case: thisCase, auth, type } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        {close ? (
          type === "Agent" ? (
            <Button variant="success" className="flex items-center text-white">
              <Check size={15} className="text-white mr-2" />
              <span className="text-white font-medium font-md">
                Submit case
              </span>
            </Button>
          ) : (
            <Button variant="primary" className="flex items-center text-white">
              <Pen size={15} className="text-white mr-2" />
              <span className="text-white font-medium font-md">
                Update case
              </span>
            </Button>
          )
        ) : (
          <Button variant="primary" className="flex items-center text-white">
            <Plus size={15} className="text-white mr-2" />
            <span className="text-white font-medium font-md">New case</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full min-w-none md:min-w-max ">
        <span className="text-center font-bold text-lg mb-2 pb-2 ">
          <div className="flex flex-col gap-1 items-start">
            {close ? (
              ""
            ) : (
              <h1 className="font-semibold text-2xl text-start">
                Add new case
              </h1>
            )}
          </div>
        </span>

        {close ? (
          type === UserRole.Agent ? (
            thisCase && <SubmitForm case={thisCase} />
          ) : (
            thisCase && <UpdateForm case={thisCase} />
          )
        ) : (
          <CreateForm auth={auth} />
        )}
      </DialogContent>
    </Dialog>
  );
}

type CaseActionProps = {
  close?: boolean;
  case?: Case;
  auth?: AuthUserType;
  type?: string;
};
