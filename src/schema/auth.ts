import { object, string } from "zod";

export const loginSchema = object({
  email: string({
    required_error: "Email address is required",
    invalid_type_error: "Invalid email",
  })
    .email({ message: "Invalid email" })
    .refine((email) => email.endsWith("@ndt.co.za"), {
      message: "Email must be a valid NDT email",
    }),
  password: string({
    required_error: "Password is required",
    invalid_type_error: "Invalid password",
  }),
});

export const registerSchema = object({
  email: string({
    required_error: "Email address is required",
    invalid_type_error: "Invalid email",
  })
    .email({ message: "Invalid email" })
    .refine((email) => email.endsWith("@ndt.co.za"), {
      message: "Email must be a valid NDT email",
    }),
  password: string({
    required_error: "Password is required",
    invalid_type_error: "Invalid password",
  }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  ),
});

export const forgotPasswordSchema = object({
  email: string({
    required_error: "Email is required",
    invalid_type_error: "Invalid email",
  })
    .email({ message: "Invalid email" })
    .refine((email) => email.endsWith("@ndt.co.za"), {
      message: "Email must be a valid NDT email",
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
