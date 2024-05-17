import { CustomResponse } from "@/lib/api";
import { ApiResponse } from "@/lib/api/types";
import { db } from "@/lib/db";
import { EndpointErrorHandler } from "@/lib/err";
import { ValidationError } from "@/lib/err/types";

export const POST = async (req: Request) => {
  try {
    const { code, userEmail } = (await req.json()) as {
      userEmail: string;
      code: string;
    };

    const userExists = await db.user.findUnique({
      where: {
        email: userEmail.toLocaleLowerCase(),
      },
      select: {
        email: true,
        emailVerified: true,
      },
    });
    if (!userExists) {
      console.log("no existe una validacion para este email con este email");
      throw new ValidationError("User doesn't exist.", 400);
    }

    const validation = await db.validations.findUnique({
      where: {
        userEmail: userExists.email,
      },
      select: {
        code: true,
      },
    });

    if (code !== validation?.code) {
      throw new Error("Invalid code");
    }
    await db.user.update({
      where: {
        email: userEmail,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    await db.validations.delete({
      where: {
        userEmail,
      },
    });
    return CustomResponse<ApiResponse>(
      {
        error: false,
        message: ["Your account is validated."],
      },
      200
    );
  } catch (err: unknown) {
    return EndpointErrorHandler({
      error: err,
      defaultErrorMessage: "Error validating user",
    });
  }
};
