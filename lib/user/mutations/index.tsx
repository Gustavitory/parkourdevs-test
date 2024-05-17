import { ApiResponse } from "@/lib/api/types";
import { baseApi } from "@/lib/api";
import {
  TNewUserDTO,
  TValidateAccountDTO,
  newUserDTO,
  validateAccountDTO,
} from "../../dto/User";
import { ApiErrorHandler } from "@/lib/err";

export const CreateAccount = async (
  newUserData: TNewUserDTO
): Promise<ApiResponse> => {
  try {
    const body = newUserDTO.parse(newUserData);
    const { data } = await baseApi.post<ApiResponse>("/auth/register", body);

    return data;
  } catch (error: unknown) {
    return ApiErrorHandler({
      error,
      defaultErrorMessage: "Error creating account",
    });
  }
};

export const ValidateAccount = async (
  validateAccountData: TValidateAccountDTO
): Promise<ApiResponse> => {
  try {
    const body = validateAccountDTO.parse(validateAccountData);
    const { data } = await baseApi.post<ApiResponse>("/auth/validate", body);

    return data;
  } catch (error: unknown) {
    return ApiErrorHandler({
      error,
      defaultErrorMessage: "Error validating account",
    });
  }
};
