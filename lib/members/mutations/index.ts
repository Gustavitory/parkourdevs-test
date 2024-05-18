import { baseApi } from "@/lib/api";
import { ApiResponse, ApiResponsePayload } from "@/lib/api/types";
import {
  TNewTeamMember,
  TUpdateTeamMember,
  ZNewTeamMember,
  ZUpdateTeamMember,
} from "@/lib/dto/TeamMember";
import { ApiErrorHandler } from "@/lib/err";
import { ValidationError } from "@/lib/err/types";
import { CompleteTeamMembers } from "@/prisma/zod";

export const createMember = async (
  memberInfo: TNewTeamMember
): Promise<
  ApiResponsePayload<{ member: Omit<CompleteTeamMembers, "user" | "userId"> }>
> => {
  try {
    const body = ZNewTeamMember.parse(memberInfo);

    const { data } = await baseApi.post<
      ApiResponsePayload<{
        member: Omit<CompleteTeamMembers, "user" | "userId">;
      }>
    >("/members", body);

    return data;
  } catch (error: unknown) {
    return ApiErrorHandler({ error, defaultErrorMessage: "Error creating" });
  }
};

export const updateMember = async (
  memberId: string,
  memberInfo: TUpdateTeamMember
): Promise<
  ApiResponsePayload<{ member: Omit<CompleteTeamMembers, "user" | "userId"> }>
> => {
  try {
    const body = ZUpdateTeamMember.parse(memberInfo);

    if (!Object.keys(body).length) throw new ValidationError("No changes", 400);

    const { data } = await baseApi.put<
      ApiResponsePayload<{
        member: Omit<CompleteTeamMembers, "user" | "userId">;
      }>
    >("/members/" + memberId, body);

    return data;
  } catch (error: unknown) {
    return ApiErrorHandler({ error, defaultErrorMessage: "Error updating" });
  }
};

export const deleteMember = async (memberId: string): Promise<ApiResponse> => {
  try {
    const { data } = await baseApi.delete<ApiResponse>("/members/" + memberId);

    return data;
  } catch (error: unknown) {
    return ApiErrorHandler({ error, defaultErrorMessage: "Error deleting" });
  }
};
