import { CustomResponse } from "@/lib/api";
import { ApiResponsePayload } from "@/lib/api/types";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { ZApiPagination } from "@/lib/dto/Pagination";
import {
  TValidPhones,
  ValidPhones,
  ZNewTeamMember,
} from "@/lib/dto/TeamMember";
import { EndpointErrorHandler } from "@/lib/err";
import { AuthError, ValidationError } from "@/lib/err/types";
import { CompleteTeamMembers } from "@/prisma/zod";

export const GET = async (req: Request) => {
  try {
    let params = new URLSearchParams(req.url.split("/worker").at(-1));
    console.log(params);

    const page = Number(params.get("page"));

    const session = await getUserAuth();

    if (!session) throw new AuthError("Unauthorized", 401);
    const userSession = await db.user.findFirst({
      where: { email: session.session?.user.email },
    });

    const workers = await db.teamMembers.findMany({
      where: {
        userId: userSession!.id,
      },
    });

    return CustomResponse<
      ApiResponsePayload<{ workers: Omit<CompleteTeamMembers, "user">[] }>
    >(
      {
        error: false,
        message: ["Success"],
        payload: {
          workers: workers,
        },
      },
      201
    );
  } catch (error: unknown) {
    return EndpointErrorHandler({
      error,
      defaultErrorMessage: "Error getting team members",
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await getUserAuth();

    if (!session) throw new AuthError("Unauthorized", 401);
    const userSession = await db.user.findFirst({
      where: { email: session.session?.user.email },
    });
    const body = ZNewTeamMember.parse(await req.json());

    let phoneInit = body.phone.slice(0, 4);

    if (!ValidPhones[phoneInit as TValidPhones])
      throw new ValidationError("Invalid phone number", 400);

    const idIsAlreadyInUse = await db.teamMembers.findFirst({
      where: {
        id: body.id,
      },
    });
    if (idIsAlreadyInUse) throw new ValidationError("Id already in use", 400);
    const worker = await db.teamMembers.create({
      data: {
        ...body,
        user: {
          connect: { id: userSession!.id },
        },
      },
    });

    return CustomResponse<
      ApiResponsePayload<{ worker: Omit<CompleteTeamMembers, "user"> }>
    >(
      {
        error: false,
        message: ["WorkerCreated"],
        payload: {
          worker,
        },
      },
      201
    );
  } catch (error: unknown) {
    return EndpointErrorHandler({
      error,
      defaultErrorMessage: "Error creating worker",
    });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const session = await getUserAuth();

    if (!session) throw new AuthError("Unauthorized", 401);

    const body = (await req.json()) as {
      email?: string;
      name?: string;
      ci?: string;
      direction?: string;
    };

    if (!Object.keys(body)) throw new ValidationError("search=undifined", 400);

    const search: any = {};

    if (body.email) search.email = { contains: body.email };
    if (body.name) search.name = { contains: body.name };
    if (body.ci) search.ci = { equals: body.ci };
    if (body.direction) search.direction = { contains: body.direction };

    const workers = await db.teamMembers.findMany({
      where: {
        ...search,
        userId: session.session?.user.id,
      },
    });

    return CustomResponse<
      ApiResponsePayload<{
        workers: Omit<CompleteTeamMembers, "user" | "userId">[];
      }>
    >(
      {
        error: false,
        message: [],
        payload: {
          workers,
        },
      },
      201
    );
  } catch (error: unknown) {
    return EndpointErrorHandler({
      error,
      defaultErrorMessage: "Error searching",
    });
  }
};
