import { AddressType, Gender, UserRole, UserStatus } from "@prisma/client";
import { boolean, nan, nativeEnum, object, string, z } from "zod";

export const createUserSchema = object({
  email: string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email({ message: "Invalid email address" }),
  name: string({
    required_error: "Name is required",
    invalid_type_error: "Invalid entry",
  }),
  contactNumber: string({
    required_error: "Contact number required",
  })
    .startsWith("0", { message: "Contact must start with '0'" })
    .refine((val) => val.length === 10, { message: "invalid phone length" }),
  surname: string({
    required_error: "Surname  is required",
    invalid_type_error: "invalid entry ",
  }),
  role: nativeEnum(UserRole),
  status: nativeEnum(UserStatus).optional(),
  gender: nativeEnum(Gender).optional(),
  image: string({
    invalid_type_error: "Enter a valid image url",
  })
    .url()
    .optional(),
});

export const userId = string();

export const updateUserSchema = object({
  userId: string().uuid({ message: "Invalid userId provided" }).optional(),
  email: string().email({ message: "Invalid email address" }).optional(),
  name: string().optional(),
  contactNumber: string({
    required_error: "Contact number required",
  })
    .startsWith("0", { message: "Contact must start with '0'" })
    .refine((val) => val.length === 10, { message: "invalid phone length" })
    .optional(),
  surname: string().optional(),
  role: nativeEnum(UserRole).optional(),
  status: nativeEnum(UserStatus).optional(),
  gender: nativeEnum(Gender).optional(),
  phoneVerified: boolean().optional(),
  emailVerified: boolean().optional(),
  image: string().url().optional(),
  address: object({
    id: string().uuid().optional(),
    type: nativeEnum(AddressType).optional(),
    streetAddress: string().optional(),
    zipCode: string().optional(),
    city: string().optional(),
    gpsLocation: string().optional(),
    country: string().optional(),
  }).optional(),
});

export type UserType = {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: UserRole;
  status: UserStatus;
  gender: Gender;
  phoneVerified: boolean | null;
  emailVerified: boolean | null;
  contactNumber: string;
  image: string | null;
  createdAt: Date;
};

export type AuthUserType = {
  id: string;
  status: UserStatus;
  role: UserRole;
  accessToken: string;
};

export const userSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  contactNumber: z
    .string()
    .refine((val) => val.startsWith("0") && val.length === 10, {
      message: "Invalid phoneNumber",
    }),
});

export type AuthProfileType = {
  id: string;
  role: string;
  status: string;
};

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
