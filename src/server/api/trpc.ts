import { TRPCError, initTRPC } from "@trpc/server";
import jwt from "jsonwebtoken";
import superjson from "superjson";
import { ZodError } from "zod";
import db from "../db";
import { AuthUserType, getAuth, getAuthCookie } from "@/context";
import { config } from "@/config";
import { omit } from "lodash";
// import { authMiddleware } from "./middleware";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const authToken = await getAuthCookie();
  const auth: AuthUserType = await getAuth(authToken!);
  return {
    db,
    ...opts,
    authToken,
    auth
  };
};

export type Context =
  ReturnType<typeof createTRPCContext> extends Promise<infer T>
    ? T
    : ReturnType<typeof createTRPCContext>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const { authToken } = ctx;

  if (!authToken) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Unauthorized",
    });
  }

  jwt.verify(authToken, config.env.secrets.authSecret, (err: any) => {
    if (err) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Unauthorized",
      });
    }
  });

  const auth = await getAuth(authToken);
  if (!auth) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Unauthorized",
    });
  }

  const fetchUser = await ctx.db.user.findUnique({
    where: {
      id: auth.id,
    },
  });

  const user = omit(fetchUser, ["password"]);

  return next({
    ctx: {
      ...ctx,
      authToken,
      user,
    },
  });
});

export const createCallerFactory = t.createCallerFactory;

export const createRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(authMiddleware);
