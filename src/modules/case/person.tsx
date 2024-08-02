'use client';
import { clientApi } from "@/client/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/packages/ui";
import { Eye } from "lucide-react";
import Link from "next/link";

export const CasePerson =  (props: CasePersonProps) => {
  const { label, id, type, border, view } = props;

  const {
    data: person,
    isLoading,
    error,
  } = type === "client"
    ? clientApi.client.single.useQuery(id)
    : type === "beneficiary"
      ? clientApi.beneficiary.single.useQuery(id)
      : clientApi.user.single.useQuery(id);

  if (!person) {
    return;
  }

  const avatarFallBack = person?.name.slice(0, 1) + person?.surname.slice(0, 1);

  return (
    <div
      className={
        border
          ? "flex w-max flex-col gap-2 rounded-lg border-r-2 border-borderColor/30 p-4 pr-8"
          : "flex w-max flex-col gap-2 p-4"
      }
    >
      {label && (
        <span className="text-sm font-semibold text-textColorLight ">
          {label}:
        </span>
      )}

      <div className="flex items-center gap-4">
        <div className="flex w-full items-center gap-4 ">
          <Avatar>
            <AvatarImage
              src={person?.image ? person?.image : ""}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-200 p-4 font-normal text-black dark:bg-[#252729] dark:text-gray-400">
              {avatarFallBack || "U"}
            </AvatarFallback>
          </Avatar>

          <p className="text-sm font-semibold ">
            {person.name + " " + person.surname}
          </p>

          {view && (
            <Link href={"/"} className="flex items-center gap-2">
              <Eye size={20} className="text-primary" />
              <span className="text-xs font-semibold text-primary underline">
                View
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

type CasePersonProps = {
  label?: string;
  id: string;
  type: string;
  border?: boolean;
  view?: boolean;
};
