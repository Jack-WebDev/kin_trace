import { Button, Dialog, DialogContent, DialogTrigger } from "@/packages/ui";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";
import { AddressType, BeneficiaryType, UserType } from "@/schema";
import { UpdateForm } from "./updateForm";
import { AuthUserType } from "@/context";
import { Address, Beneficiary } from "@prisma/client";

export function BeneficiaryActions(props: BeneficiaryActionProps) {
  const { action, beneficiary, clientId, address, caseId, auth } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {action === "create" ? (
          <Button variant="primary" className="flex items-center text-white">
            <Plus size={15} className="mr-2 text-white" />
            <span className="font-md font-medium text-white">
              New beneficiary
            </span>
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="flex h-8 items-center gap-2 bg-sideBarBg"
          >
            <span className="sr-only">Open menu</span>
            <Pencil size={10} className="h-6 w-4 text-white " />
            <p>Edit</p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-none max-h-full overflow-y-auto md:min-w-max ">
        <span className="mb-2 pb-2 text-center text-lg font-bold ">
          {action === "create" ? (
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-start text-2xl font-semibold">
                Add new beneficiary
              </h1>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-start text-2xl font-semibold">
                Beneficiary update
              </h1>
            </div>
          )}
        </span>

        {action === "create"
          ? clientId && <CreateForm clientId={clientId} />
          : beneficiary &&
            address && (
              <UpdateForm
                beneficiary={beneficiary}
                address={address}
                caseId={caseId}
                auth={auth}
              />
            )}
      </DialogContent>
    </Dialog>
  );
}

type BeneficiaryActionProps = {
  action: string;
  beneficiary?: Beneficiary;
  clientId?: string;
  address?: Address;
  caseId?: string;
  auth?: AuthUserType;
};
