import { CustomResponse } from "@/lib/api";
import { ApiResponse, ApiResponsePayload } from "@/lib/api/types";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  TValidPhones,
  ValidPhones,
  ZUpdateTeamMember,
} from "@/lib/dto/TeamMember";
import { EndpointErrorHandler } from "@/lib/err";
import { AuthError, ValidationError } from "@/lib/err/types";
import { CompleteTeamMembers } from "@/prisma/zod";

export const PUT = async (req: Request) => {
  try {
    let workerId = Number(req.url.split("/").at(-1)!);

    const session = await getUserAuth();

    if (!session) throw new AuthError("Unauthorized", 401);

    const user = await db.user.findUnique({
      where: {
        email: session.session?.user.email,
      },
    });
    if (!user) throw new AuthError("Unauthorized: Invalid session", 401);

    const body = ZUpdateTeamMember.parse(await req.json());

    let workerExists = await db.teamMembers.findUnique({
      where: {
        id: workerId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!workerExists) throw new ValidationError("Inexistent worker", 404);

    if (workerExists.userId !== user.id)
      throw new ValidationError("Unauthorized", 401);

    let phoneInit = body.phone && body.phone.slice(0, 4);

    if (phoneInit && !ValidPhones[phoneInit as TValidPhones])
      throw new ValidationError("Invalid phone number", 400);

    const worker = await db.teamMembers.update({
      where: {
        id: workerId,
      },
      data: body,
    });

    return CustomResponse<
      ApiResponsePayload<{ worker: Omit<CompleteTeamMembers, "user"> }>
    >(
      {
        error: false,
        message: ["Member updated"],
        payload: {
          worker,
        },
      },
      201
    );
  } catch (error: unknown) {
    return EndpointErrorHandler({
      error,
      defaultErrorMessage: "Error updating member",
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    let workerId = Number(req.url.split("/").at(-1)!);

    const session = await getUserAuth();
    if (!session) throw new AuthError("Unauthorized: Invalid session", 401);

    const user = await db.user.findUnique({
      where: {
        email: session.session?.user.email,
      },
    });
    if (!user) throw new AuthError("Unauthorized: Invalid session", 401);
    let workerExists = await db.teamMembers.findUnique({
      where: {
        id: workerId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!workerExists) throw new ValidationError("Not found", 404);

    if (workerExists.userId !== user.id)
      throw new ValidationError("Unauthorized", 401);

    await db.teamMembers.delete({
      where: {
        id: workerId,
      },
    });

    return CustomResponse<ApiResponse>(
      {
        error: false,
        message: ["Member deleted"],
      },
      201
    );
  } catch (error: unknown) {
    return EndpointErrorHandler({
      error,
      defaultErrorMessage: "Error deleting",
    });
  }
};
