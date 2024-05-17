import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { z } from "zod";

import { EndpointErrorHandler } from "@/lib/err";

import { AuthError, ValidationError } from "@/lib/err/types";
import { db } from "@/lib/db";
import { signToken } from "@/lib/Jwt";
import { CompleteUser } from "prisma/zod/user";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password: bodyPassword } = (await req.json()) as {
      email: string;
      password: string;
    };

    if (
      !z
        .string()
        .email()
        .safeParse(email || "").success
    )
      throw new ValidationError("Invalid email", 400);

    const user = await db.user.findUnique({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });

    if (!user) throw new ValidationError("email or login don't match", 404);
    const checkPassword = await bcrypt.compare(bodyPassword, user.password);

    if (!checkPassword) throw new AuthError("email or login don't match", 401);

    if (!user.emailVerified) throw new AuthError("Unverified", 401);

    const { password, ...userInfo } = user;

    const token =
      signToken<Pick<CompleteUser, "id" | "email" | "name" | "emailVerified">>(
        userInfo
      );

    const res = new Response(
      JSON.stringify({ error: false, message: ["Success"] }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );

    cookies().set("auth-token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 3600 * 7,
    });

    return res;
  } catch (error: unknown) {
    return EndpointErrorHandler({
      error,
      defaultErrorMessage: "Sign in error",
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    let cookieStore = cookies();

    cookieStore.delete("auth-token");

    return new Response(
      JSON.stringify({ error: false, message: ["Closing session"] }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error: unknown) {
    return EndpointErrorHandler({
      error,
      defaultErrorMessage: "Error closing session",
    });
  }
};
