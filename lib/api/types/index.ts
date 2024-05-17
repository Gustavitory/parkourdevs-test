export interface ApiResponse {
  error: boolean;
  message: string[];
}

export interface ApiResponseWithPayload<T> extends ApiResponse {
  error: false;
  payload: T;
}

export interface ApiResponseError extends ApiResponse {
  error: true;
}

export type ApiResponsePayload<T> =
  | ApiResponseWithPayload<T>
  | ApiResponseError;
