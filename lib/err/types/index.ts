export const ERROR_NAMES = {
  CustomError: "CustomError",
  ConnectionError: "ConnectionError",
  DbError: "DbError",
  ParsingError: "ParsingError",
  AuthError: "AuthError",
  ValidationError: "ValidationError",
} as const;
type TObjectValues<T> = T[keyof T];
export type TErrorNames = TObjectValues<typeof ERROR_NAMES>;

export type SuccessStatusCode = 200 | 201 | 202 | 204;

export type ErrorStatusCode = 400 | 401 | 403 | 404 | 500;

export type StatusCode = SuccessStatusCode | ErrorStatusCode;

export class CustomError extends Error {
  errorCode: ErrorStatusCode = 400;
  constructor(message: string, errorCode: ErrorStatusCode) {
    super(message);
    this.name = ERROR_NAMES.CustomError;
    this.errorCode = errorCode;
  }
}

export class ConnectionError extends CustomError {
  constructor(message: string, errorCode: ErrorStatusCode) {
    super(message, errorCode);
    this.name = ERROR_NAMES.ConnectionError;
  }
}

export class DbError extends CustomError {
  constructor(message: string, errorCode: ErrorStatusCode) {
    super(message, errorCode);
    this.name = ERROR_NAMES.DbError;
  }
}

export class ParsingError extends CustomError {
  constructor(message: string, errorCode: ErrorStatusCode) {
    super(message, errorCode);
    this.name = ERROR_NAMES.ParsingError;
  }
}

export class AuthError extends CustomError {
  constructor(message: string, errorCode: ErrorStatusCode) {
    super(message, errorCode);
    this.name = ERROR_NAMES.AuthError;
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, errorCode: ErrorStatusCode) {
    super(message, errorCode);
    this.name = ERROR_NAMES.ValidationError;
  }
}

export type EndpointErrorHandlerParams = {
  error: unknown;
  defaultErrorMessage: string;
  errorCode?: StatusCode;
  noPrintError?: boolean;
  disconnectDb?: boolean;
};
