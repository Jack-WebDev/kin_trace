import { CaseStatus, TraceStatus } from "@prisma/client";
import {  nativeEnum, object, string, coerce, date, type z } from "zod";

export type CaseType = {
  id: string;
  createdBy: string;
  supervisorId: string;
  agentId: string;
  clientId: string;
  city: string;
  caseNumber: string;
  createdAt: Date;
  expectedDateOfCompletion: Date;
  beneficiaryId: string;
  status: CaseStatus;
  completionDate: Date | null;
  traceStatus: TraceStatus;
};

export const caseSchema = object({
  clientId: string().uuid().optional(),
  createdBy: string().uuid().optional(),
  supervisorId: string().uuid().optional(),
  agentId: string().uuid().optional(),
  expectedDateOfCompletion: coerce.date(),
  city: string().optional(),
  beneficiaryId: string().uuid().optional(),
  status: nativeEnum(CaseStatus).optional(),
  comment: string().optional(),
  completionDate: string().optional(),
  traceStatus: nativeEnum(TraceStatus).optional(),
});
export const updateCaseSchema = object({
  id: string().uuid().optional(),
  supervisorId: string().uuid().optional(),
  agentId: string().uuid().optional(),
  expectedDateOfCompletion: coerce.date().optional(),
  status: nativeEnum(CaseStatus).optional(),
  comment: string().optional(),
  completionDate: string().optional(),
  traceStatus: nativeEnum(TraceStatus).optional(),
});

export type CaseSchemaType = z.infer<typeof caseSchema>;
export type UpdateCaseSchemaType = z.infer<typeof updateCaseSchema>;
