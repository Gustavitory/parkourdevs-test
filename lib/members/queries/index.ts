import { baseApi } from "@/lib/api";
import { ApiResponsePayload } from "@/lib/api/types";
import { ApiPagination, ZApiPagination } from "@/lib/dto/Pagination";
import { ApiErrorHandler } from "@/lib/err";
import { ValidationError } from "@/lib/err/types";
import { CompleteTeamMembers } from "@/prisma/zod";

export const getMembersList = async (
  pConfig: ApiPagination
): Promise<
  ApiResponsePayload<Omit<CompleteTeamMembers, "user" | "userId">[]>
> => {
  try {
    // const pagination = ZApiPagination.parse(pConfig);
    const { data } = await baseApi.get<
      ApiResponsePayload<Omit<CompleteTeamMembers, "user" | "userId">[]>
    >(`/members?take=${pConfig.take}&skip=${pConfig.skip}`);
    return data;
  } catch (error) {
    return ApiErrorHandler({
      error,
      defaultErrorMessage: "Error getting team members",
    });
  }
};

export const searchMember = async (
  body: Pick<CompleteTeamMembers, "email" | "name" | "id" | "address">
): Promise<
  ApiResponsePayload<{
    members: Omit<CompleteTeamMembers, "user" | "userId">[];
  }>
> => {
  try {
    if (!Object.keys(body)) throw new ValidationError("", 400);
    const { data } = await baseApi.patch<
      ApiResponsePayload<{
        members: Omit<CompleteTeamMembers, "user" | "userId">[];
      }>
    >("/members", body);

    return data;
  } catch (error: unknown) {
    return ApiErrorHandler({ error, defaultErrorMessage: "Error searching" });
  }
};
