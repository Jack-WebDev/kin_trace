import { createUserSchema, updateUserSchema, userId } from "@/schema";
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user";
import { z } from "zod";
import { createRouter, protectedProcedure } from "../trpc";


export const userRouter = createRouter({
  list: protectedProcedure.query(async ({ctx}) => {
    const users = await getAllUsers(ctx);

    return users;
  }),

  me: protectedProcedure.query(async ({ctx}) => {
    const user = ctx.user;  
    return user;
  }),

  single: protectedProcedure.input(z.string()).query(async ({ input,ctx }) => {
    const user = await getSingleUser(ctx, input);

    return user;
  }),

  create: protectedProcedure.input(createUserSchema).mutation(async ({ input, ctx }) => {
    return await createUser(ctx, input);
  }),

  update: protectedProcedure.input(updateUserSchema).mutation(async ({ input, ctx }) => {
    return await updateUser(ctx, input);
  }),
  delete: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    return deleteUser(ctx, input);
  }),
});
