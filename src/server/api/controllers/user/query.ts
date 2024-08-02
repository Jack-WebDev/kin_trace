import { TRPCError } from "@trpc/server";
import type { Context } from "../../trpc";
import type { User } from "@prisma/client";
import { omit } from "lodash";

export const getUsersWithoutPassword = async (list: any[]) => {
  return list.map((listItem) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...others } = listItem;
    return others;
  });
};

export const getAllUsers = async (ctx: Context) => {
  const users = await ctx.db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const userList: User[] = await getUsersWithoutPassword(users);

  const data = await Promise.all(
    userList.map(async (user) => {
      // fetch user address
      const userAddress = await ctx.db.address.findFirst({
        where: { refId: user.id },
      });

      const userData = {
        ...user,
        address: userAddress,
      };

      return userData;
    }),
  );

  return data;
};

export const getSingleUser = async (ctx: Context, id: string) => {

  try {
    const user = await ctx.db.user.findUnique({ 
      where: { id },
      include: {
        createdCases: true,
        supervisedCases: true,
        agentCases: true,
        createdTasks: true,
        assignedTasks: true,
        locations: true,
        activities: true,
        notes: true,
        notifications: true,
      }
     });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const returnUser = omit(user, ["password"]);
    // fetch user address
    const userAddress = await ctx.db.address.findFirst({
      where: { refId: user.id },
    });

    if (!userAddress) {
      return {
        ...user,
        address: null,
      };
    }

    const data = {
      ...returnUser,
      address: userAddress,
    };
    return data;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get single user",
    });
  }
};
