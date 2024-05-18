import * as z from "zod";

export const ZApiPagination = z.object({
  take: z.number().pipe(
    z.coerce
      .number({
        required_error: "Request limit is required",
        invalid_type_error: "Request limit must be a number",
      })
      .positive()
      .lte(100, "Query's limit is too big")
  ),
  skip: z.number().pipe(
    z.coerce
      .number({
        required_error: "Start number is required",
        invalid_type_error: "Query's start must be a number",
      })
      .nonnegative("Invalid limir")
  ),
});
export type ApiPagination = z.infer<typeof ZApiPagination>;
