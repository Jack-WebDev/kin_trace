import * as argon from "argon2";
import { forgotPasswordSchema, loginSchema, registerSchema } from "@/schema";
import { TRPCError } from "@trpc/server";
import { signJwt } from "@/packages/utils";
import { createRouter, protectedProcedure, publicProcedure } from "../trpc";
import { config } from "@/config";
import { cookies } from "next/headers";
import nodemailer from "nodemailer"
import { generateOTP } from "@/utils/generateOTP";
import { addMinutes } from "date-fns";
import ResetPasswordEmail from "@/modules/email/ResetPassword";
import { render } from "@react-email/components";
import db from "@/server/db";

export const authRouter = createRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const user = await ctx.db.user.findUnique({ where: { email } });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const createUserPassword = await argon.hash(password);

      await ctx.db.user.update({
        where: { id: user.id },
        data: {
          password: createUserPassword,
        },
      });

      const secrets = config.env.secrets;
      const duration = config.duration;

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
        message: "Registration successful",
      };
    }),
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
  forgotPassword: publicProcedure.input(forgotPasswordSchema).mutation(async ({ input, ctx }) => {
    const { email } = input;
    const user = await ctx.db.user.findUnique({ where: { email } });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const generatedOTP = generateOTP();
    const otpExpiryDate = addMinutes(new Date(), 5);

    // await db.oTP.create({
    //   data: {
    //     userId: user.id,
    //     code: generatedOTP,
    //     expiryDate: otpExpiryDate,
    //   },
    // });

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,

      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const name = user?.name;

    const emailHtml = render(ResetPasswordEmail(name, generatedOTP));

    console.log(emailHtml);

    const options = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New Dawn 360 Reset Password OTP",
      html: emailHtml,
    };


    // try {
    //   const data = await transporter.sendMail(options);
    //   // console.log(data);
    //   return new Response(JSON.stringify({ message: "Email sent", data }), {
    //     status: 200,
    //     headers: { "Content-Type": "application/json" },
    //   });
    // } catch (error) {
    //   console.error(error);
    //   return new Response(
    //     JSON.stringify({ message: "Email failed to send", error }),
    //     {
    //       status: 500,
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    // }



    return {
      message: "Password reset email sent successfully",
    };
  }),

  logout: protectedProcedure.mutation(async () => {
    cookies().delete("authToken");
    return {
      message: "Logout successful",
    };
  }),
});
