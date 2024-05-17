import { ApiResponse } from "@/lib/api/types";
import { baseApi } from "@/lib/api";
import { ApiErrorHandler } from "@/lib/err";

export const checkSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponse> => {
  try {
    const { data } = await baseApi.post<ApiResponse>("auth/login", {
      email,
      password,
    });

    return data;
  } catch (error: unknown) {
    return ApiErrorHandler({ error, defaultErrorMessage: "Unespected error." });
  }
};
