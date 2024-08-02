import { Button, Dialog, DialogContent, DialogTrigger } from "@/packages/ui";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";
import { ClientType, UserType } from "@/schema";
import { CreateMultipleForm } from "./multipleCreateForm";

export function AddressActions(props: UserActionsProps) {
  const { action, user, type } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {action === "create" ? (
          <Button
            variant="primary"
            className="flex items-center text-white h-fit w-fit rounded-full px-2"
          >
            <Plus size={20} className="text-white" />
          </Button>
        ) : (
          <Button variant="ghost">
            <span className="sr-only">Open menu</span>
            <Pencil size={10} className="h-6 w-4 text-gray-500" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full min-w-none md:min-w-max ">
        <span className="text-center font-bold text-lg mb-2 pb-2 ">
          {action === "create" ? (
            <div className="flex flex-col gap-1 items-start">
              <h1 className="font-semibold text-2xl text-start">
                Add new address
              </h1>
            </div>
          ) : (
            <div className="flex flex-col gap-1 items-start">
              <h1 className="font-semibold text-2xl text-start">
                User address
              </h1>
            </div>
          )}
        </span>

        {action === "create" && type === "multiple"
          ? user && <CreateMultipleForm user={user} />
          : user && <CreateForm user={user} />}
      </DialogContent>
    </Dialog>
  );
}

type UserActionsProps = {
  action: string;
  user?: UserType | ClientType;
  type?: string;
};
