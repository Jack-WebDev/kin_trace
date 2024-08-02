import { AddressType, Gender, TraceStatus } from "@prisma/client";
import { nativeEnum, object, string, type z } from "zod";


export const createBeneficiarySchema = object({
  clientId: string({
    required_error: "Client id is required",
    invalid_type_error: "Invalid entry",
  })
    .uuid({ message: "Invalid entry type" })
    .optional(),

  name: string({
    required_error: "Name is required",
    invalid_type_error: "Invalid entry",
  }),
  contactNumber: string({
    required_error: "Contact number required",
    invalid_type_error: "invalid Contact number",
  })
    .startsWith("0", { message: "Contact must start with '0'" })
    .refine((val) => val.toString().length === 10, {
      message: "Invalid contact number",
    }),
  surname: string({
    required_error: "Surname  is required",
    invalid_type_error: "invalid entry ",
  }),
  idNumber: string({
    required_error: "Id number is required",
  }).refine((val) => val.length === 13, { message: "Invalid Id number" }),
  gender: nativeEnum(Gender).optional(),
  image: string({
    invalid_type_error: "Invalid image url",
  })
    .url()
    .optional(),
  address: object({
    type: string().default(AddressType.Physical),
    state: string(),
    streetAddress: string(),
    zipCode: string(),
    city: string(),
    gpsLocation: string().optional(),
    country: string(),
  }),
});
export const updateBeneficiarySchema = object({
  id: string().uuid().optional(),
  name: string().optional(),
  caseId: string().uuid().optional(),
  contactNumber: string()
    .startsWith("0", { message: "Contact must start with '0'" })
    .refine((val) => val.toString().length === 10, {
      message: "Invalid contact number",
    })
    .optional(),
  surname: string().optional(),
  traceStatus: nativeEnum(TraceStatus).optional(),
  idNumber: string()
    .refine((val) => val.length === 13, { message: "Invalid Id number" })
    .optional(),
  gender: nativeEnum(Gender).optional(),
  image: string({
    invalid_type_error: "Invalid image url",
  })
    .url()
    .optional(),
  address: object({
    id: string().uuid().optional(),
    state: string().optional(),
    type: string().default(AddressType.Physical),
    streetAddress: string().optional(),
    zipCode: string().optional(),
    city: string().optional(),
    gpsLocation: string().optional(),
    country: string().optional(),
  }).optional(),
});

export type CreateBeneficiarySchemaType = z.infer<
  typeof createBeneficiarySchema
>;
export type UpdateBeneficiarySchemaType = z.infer<
  typeof updateBeneficiarySchema
>;

export type BeneficiaryType = {
  id: string;
  clientId: string;
  name: string;
  surname: string;
  idNumber: string;
  gender: Gender;
  contactNumber: string;
  traceStatus: string;
  gpsLocation: string | null;
  image: string | null;
  createdAt: Date;
};
