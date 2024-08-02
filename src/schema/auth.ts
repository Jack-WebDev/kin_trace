import { object, string } from "zod";

export const loginSchema = object({
  email: string({
    required_error: "Email address is required",
    invalid_type_error: "Invalid email",
  }).email({ message: "Invalid email" }),
  password: string({
    required_error: "Password ios required",
    invalid_type_error: "Invalid password",
  }),
});

export const logoutSchema = object({
  userId: string({
    required_error: "UserId is required.",
    invalid_type_error: "Invalid userId type.",
  }),
});

export const refreshTokenchema = object({
  token: string({
    required_error: "token is required",
  }),
  id: string({
    required_error: "id is required",
    invalid_type_error: "Invalid id",
  }).uuid({ message: "Invalid id" }),
});
