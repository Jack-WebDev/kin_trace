import {  nativeEnum, object, string, type z } from "zod";
import { type AddressType } from ".";
import { Gender } from "@prisma/client";


export const createClientSchema = object({
  name: string({
    required_error: "Name is required",
    invalid_type_error: "Invalid entry",
  }),
  surname: string({
    required_error: "Surname is required",
    invalid_type_error: "Invalid entry",
  }),
  employeeNumber: string({
    required_error: "employee number is required",
    invalid_type_error: "Invalid entry",
  }),
  idNumber: string({
    required_error: "Id number is required",
  }).refine((val) => val.length === 13, { message: "Invalid Id number" }),
  contactNumber1: string({
    required_error: "Contact number required",
    invalid_type_error: "invalid Contact number",
  })
    .startsWith("0", { message: "Contact must start with '0'" })
    .refine((val) => val.toString().length === 10, {
      message: "Invalid contact number",
    }),
  contactNumber2: string({
    required_error: "Contact number required",
    invalid_type_error: "invalid Contact number",
  })
    .startsWith("0", { message: "Contact must start with '0'" })
    .refine((val) => val.toString().length === 10, {
      message: "Invalid contact number",
    }),
  passportNumber: string({
    required_error: "passport number  is required",
    invalid_type_error: "invalid entry ",
  }),
  gender: nativeEnum(Gender),
  country: string(),
  image: string({
    invalid_type_error: "Enter a valid image url",
  })
    .url()
    .optional(),
  address: object({
    physical: object({
      type: string().default("Physical"),
      streetAddress: string(),
      state: string(),
      zipCode: string(),
      city: string(),
      gpsLocation: string().optional(),
      country: string(),
    }),
    postal: object({
      type: string().default("Postal"),
      streetAddress: string(),
      state: string(),
      zipCode: string(),
      city: string(),
      gpsLocation: string().optional(),
      country: string(),
    }),
  }),
});
export const updateClientSchema = object({
  id: string().uuid().optional(),
  name: string().optional(),
  surname: string().optional(),
  employeeNumber: string().optional(),
  idNumber: string()
    .refine((val) => val.length === 13, { message: "Invalid Id number" })
    .optional(),
  contactNumber1: string()
    .startsWith("0", { message: "Contact must start with '0'" })
    .refine((val) => val.toString().length === 10, {
      message: "Invalid contact number",
    })
    .optional(),
  contactNumber2: string()
    .startsWith("0", { message: "Contact must start with '0'" })
    .refine((val) => val.toString().length === 10, {
      message: "Invalid contact number",
    })
    .optional(),
  passportNumber: string().optional(),
  gender: nativeEnum(Gender).optional(),
  country: string().optional(),
  image: string({
    invalid_type_error: "Enter a valid image url",
  })
    .url()
    .optional(),
  address: object({
    physical: object({
      id: string().uuid().optional(),
      type: string().default("Physical").optional(),
      state: string().optional(),
      streetAddress: string().optional(),
      zipCode: string().optional(),
      city: string().optional(),
      gpsLocation: string().optional(),
      country: string().optional(),
    }),
    postal: object({
      id: string().uuid().optional(),
      type: string().default("Postal").optional(),
      state: string().optional(),
      streetAddress: string().optional(),
      zipCode: string().optional(),
      city: string().optional(),
      gpsLocation: string().optional(),
      country: string().optional(),
    }),
  }).optional(),
});

export type ClientType = {
  id: string;
  employeeNumber: string;
  name: string;
  surname: string;
  idNumber: string;
  gender: Gender;
  passportNumber: string;
  country: string;
  contactNumber1: string;
  contactNumber2: string;
  image: string | null;
  createdAt: Date;
  address?: AddressType[];
};

export type CreateClientSchemaType = z.infer<typeof createClientSchema>;
export type UpdateClientSchemaType = z.infer<typeof updateClientSchema>;
