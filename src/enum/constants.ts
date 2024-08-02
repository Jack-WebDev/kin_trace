import { SelectData } from "@/packages/ui";
import { AddressType, CaseStatus, Gender, TraceStatus, UserRole, UserStatus } from "@prisma/client";
import { startCase } from "lodash";

export const genderList: SelectData[] = Object.values(Gender).map((value) => ({
  value,
  title: startCase(value),
  id: "d71c4764-aaa6-54b2-8d5b-5841fbd18c7b",
}));

export const userRoles: SelectData[] = Object.values(UserRole).map((value) => ({
  value,
  title: startCase(value),
  id: "95718412-fe6c-50e4-a4b7-fa05a740fd9a",
}));

export const userStatus: SelectData[] = Object.values(UserStatus).map((value) => ({
  value,
  title: startCase(value),
  id: "f3092673-a924-5a07-8e12-26951f7764e3",
}));

export const AddressTypes: SelectData[] = Object.values(AddressType).map((value) => ({
  value,
  title: startCase(value),
  id: "ace89a72-12e6-5255-bdf2-3c8a96d19c25",
}));

export const caseStatusList: SelectData[] = Object.values(CaseStatus).map((value) => ({
  value,
  title: startCase(value),
  id: "eb4b424a-d650-5fa3-9dde-15df64692078",
}));

export const traceStatusList: SelectData[] = Object.values(TraceStatus).map((value) => ({
  value,
  title: startCase(value),
  id: "63fa8be2-692a-5c0b-bbcd-cdd117425b13",
}));


