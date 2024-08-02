import * as argon from "argon2";
import { loginSchema, logoutSchema } from "@/schema";
import { TRPCError } from "@trpc/server";
import { signJwt } from "@/packages/utils";
import { createRouter, protectedProcedure, publicProcedure } from "../trpc";
import { config } from "@/config";
import { cookies } from "next/headers";

export const authRouter = createRouter({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;
    const user = await ctx.db.user.findUnique({ where: { email } });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    // verify the password
    const passwordVerified = await argon.verify(user.password, password);

    const secrets = config.env.secrets;
    const duration = config.duration;

    if (!passwordVerified) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invalid credentials",
     
      });
    }

    //JWT
    const tokenPayload = {
      id: user.id,
      role: user.role,
      status: user.status,
    };
    const accessToken = signJwt(
      tokenPayload,
      secrets.accessSecret,
      duration.accessTokenExp,
    );
    const refreshPayload = {
      id: user.id,
    };
    const refreshToken = signJwt(
      refreshPayload,
      secrets.refreshSecret,
      duration.refreshTokenExp,
    );
    const authPayload = {
      accessToken,
      refreshToken,
      id: user.id,
      role: user.role,
      status: user.status,
    };
    const authToken = signJwt(
      authPayload,
      secrets.authSecret,
      duration.authTokenExp,
    );

    

    // Set the authToken cookie
    cookies().set("authToken", authToken, {
        maxAge: duration.authTokenExp,
      });

    return {
      accessToken,
      refreshToken,
      authToken,
      userId: user.id,
      userRole: user.role,
      userStatus: user.status,
      message: "Login successful",
    };
  }),

  logout: protectedProcedure
    .mutation(async () => {
      cookies().delete("authToken");
      return {
        message: "Logout successful",
      };
    }),
});