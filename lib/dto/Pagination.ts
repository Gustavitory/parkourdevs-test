import * as z from "zod";

export const ZApiPagination = z.object({
  take: z.string().pipe(
    z.coerce
      .number({
        required_error: "Request limit is required",
        invalid_type_error: "Request limit must be a number",
      })
      .positive("Invalid")
      .lte(100, "Query's limit is too big")
  ),
  skip: z.string().pipe(
    z.coerce
      .number({
        required_error: "Start number is required",
        invalid_type_error: "Query's start must be a number",
      })
      .nonnegative("Invalid limir")
  ),
});
export type ApiPagination = z.infer<typeof ZApiPagination>;
