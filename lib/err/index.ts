import { ZodError } from "zod";
import { isAxiosError } from "axios";
import { EndpointErrorHandlerParams, CustomError } from "./types/index";

import {
  AxiosErrorFormatter,
  CustomErrorFormatter,
  ZodErrorFormatter,
} from "./format/index";
import type { ApiResponseError } from "../api/types";

export const EndpointErrorHandler = async (
  params: EndpointErrorHandlerParams
): Promise<Response> => {
  params.noPrintError || console.log(params.error);

  if (params.error instanceof ZodError)
    return new Response(JSON.stringify(ZodErrorFormatter(params.error)), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });

  if (isAxiosError(params.error))
    return new Response(JSON.stringify(AxiosErrorFormatter(params.error)), {
      headers: {
        "Content-Type": "application/json",
      },
      status: params.errorCode || 400,
    });

  if (params.error instanceof CustomError)
    return new Response(JSON.stringify(CustomErrorFormatter(params.error)), {
      headers: {
        "Content-Type": "application/json",
      },
      status: params.error.errorCode,
    });

  return new Response(
    JSON.stringify({
      error: true,
      message: [params.defaultErrorMessage],
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    }
  );
};

type ApiErrorHandlerParams = {
  error: unknown;
  defaultErrorMessage: string;
  noPrintError?: boolean;
};

export const ApiErrorHandler = async (
  params: ApiErrorHandlerParams
): Promise<ApiResponseError> => {
  params.noPrintError || console.log(params.error);

  if (params.error instanceof ZodError) return ZodErrorFormatter(params.error);

  if (isAxiosError(params.error)) return AxiosErrorFormatter(params.error);

  if (params.error instanceof CustomError)
    return CustomErrorFormatter(params.error);

  return {
    error: true,
    message: [params.defaultErrorMessage],
  };
};
