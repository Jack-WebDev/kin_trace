"use client";
import type { AuthUserType } from "@/schema";
import { NavLink } from "./NavLink";

import {
  ClipboardList,
  HandPlatter,
  Handshake,
  ListChecks,
  Notebook,
  Users,
} from "lucide-react";

const MenuList = (props: MenuListProps) => {
  const { auth } = props;
  return (
    <div className="flex flex-col items-center md:items-start px-0 md:px-6  gap-2 w-full overflow-y-auto scrollbar-hide ">
      {auth.role === "Admin" && (
        <NavLink url="/dashboard/users" title="Users" Icon={Users} />
      )}
      <NavLink url="/dashboard/clients" title="Clients" Icon={Handshake} />
      <NavLink
        url="/dashboard/beneficiaries"
        title="Beneficiaries"
        Icon={HandPlatter}
      />
      <NavLink url="/dashboard/cases" title="Cases" Icon={ClipboardList} />
      <NavLink url="/dashboard/tasks" title="Tasks" Icon={ListChecks} />
      <NavLink url="/dashboard/notes" title="Notes" Icon={Notebook} />
    </div>
  );
};

export default MenuList;

type MenuListProps = {
  auth: AuthUserType;
};
