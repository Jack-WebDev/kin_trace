import { TRPCError } from "@trpc/server";
import type { CreateUserSchemaType, UpdateUserSchemaType } from "@/schema";
import * as argon from "argon2";
import type { Context } from "@/server/api/trpc";
import { randomGenerator } from "@/utils";
import { UserStatus } from "@prisma/client";

export const createUser = async (ctx: Context, input: CreateUserSchemaType) => {
  const { contactNumber, email } = input;

  const userExist = await ctx.db.user.findFirst({
    where: {
      OR: [{ email }, { contactNumber }],
    },
  });

  if (userExist) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "User already exist (email or contact number)",
    });
  }

  // Create random password
  const password = randomGenerator(6);
  const dbPassword = await argon.hash(password);

  try {
    await ctx.db.user.create({
      data: {
        ...input,
        password: dbPassword,
      },
    });

    // TODO -----send email notification before a response
    return {
      message: "User added successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new user",
    });
  }
};

export const updateUser = async (ctx: Context, input: UpdateUserSchemaType) => {
  const { address, userId, ...others } = input;

  const user = await ctx.db.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  try {
    const updateUser = await ctx.db.user.update({
      where: { id: userId },
      data: {
        ...others,
      },
    });

    if (address) {
      // find user address
      const userAddress = await ctx.db.address.findUnique({
        where: { id: address.id },
      });

      if (userAddress) {
        const { id, ...others } = address;

        try {
          await ctx.db.address.update({
            where: { id },
            data: {
              ...others,
            },
          });
          return {
            message: "User updated successfully",
            userId: updateUser.id,
          };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "failed to update user address",
          });
        }
      }
      return {
        message: "User updated but failed to update address",
        userId: updateUser.id,
      };
    }
    return {
      message: "User updated successfully",
      userId: updateUser.id,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "failed to update user",
    });
  }
};

export const deleteUser = async (ctx: Context, id: string) => {
  // find the user
  const user = await ctx.db.user.findUnique({ where: { id } });
  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  try {
    await ctx.db.user.delete({ where: { id } });
    return { message: "User deleted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "failed to delete user",
    });
  }
};
