import { AddressType as AddressCategory } from "@prisma/client";
import { nativeEnum, object,  string, type z } from "zod";

export const createAddressSchema = object({
  refId: string().uuid({ message: "Invalid id" }).optional(),
  type: nativeEnum(AddressCategory, { required_error: "type required" }).optional(),
  state: string(),
  streetAddress: string({ required_error: "street address required" }),
  city: string({ required_error: "city required" }),
  zipCode: string({ required_error: "zip code required" }),
  gpsLocation: string().optional(),
  country: string({ required_error: "country required" }),
});

export const createMultipleAddressSchema = object({
  physicalAddress: object({
    refId: string().uuid({ message: "Invalid id" }).optional(),
    type: nativeEnum(AddressCategory).default(AddressCategory.Physical),
    state: string(),
    streetAddress: string({ required_error: "street address required" }),
    city: string({ required_error: "city required" }),
    zipCode: string({ required_error: "zip code required" }),
    gpsLocation: string().optional(),
    country: string({ required_error: "country required" }),
  }),
  postalAddress: object({
    refId: string().uuid({ message: "Invalid id" }).optional(),
    type: nativeEnum(AddressCategory).default(AddressCategory.Postal),
    state: string(),
    streetAddress: string({ required_error: "street address required" }),
    city: string({ required_error: "city required" }),
    zipCode: string({ required_error: "zip code required" }),
    gpsLocation: string().optional(),
    country: string({ required_error: "country required" }),
  }),
});

export const updateAddressSchema = object({
  id: string().uuid({ message: "Invalid id" }).optional(),
  type: nativeEnum(AddressCategory, { required_error: "type required" }).optional(),
  state: string().optional(),
  streetAddress: string({
    required_error: "street address required",
  }).optional(),
  city: string({ required_error: "city required" }).optional(),
  zipCode: string({ required_error: "zip code required" }).optional(),
  gpsLocation: string().optional().optional(),
  country: string({ required_error: "country required" }).optional(),
});

export const updateMultipleAddressSchema = object({
  physical: object({
    id: string().uuid().optional(),
    type: nativeEnum(AddressCategory).default(AddressCategory.Physical).optional(),
    state: string().optional(),
    streetAddress: string().optional(),
    zipCode: string().optional(),
    city: string().optional(),
    gpsLocation: string().optional(),
    country: string().optional(),
  }),
  postal: object({
    id: string().uuid().optional(),
    type: nativeEnum(AddressCategory).default(AddressCategory.Postal).optional(),
    state: string().optional(),
    streetAddress: string().optional(),
    zipCode: string().optional(),
    city: string().optional(),
    gpsLocation: string().optional(),
    country: string().optional(),
  }),
});

export type AddressType = {
  id: string;
  refId: string;
  type: AddressType;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  lat: string | null;
  long: string | null;
  country: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAddressSchemaType = z.infer<typeof createAddressSchema>;
export type UpdateAddressSchemaType = z.infer<typeof updateAddressSchema>;
export type CreateMultipleAddressSchemaType = z.infer<
  typeof createMultipleAddressSchema
>;
export type UpdateMultipleAddressSchemaType = z.infer<
  typeof updateMultipleAddressSchema
>;
