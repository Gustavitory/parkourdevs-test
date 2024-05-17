import * as z from "zod"

export const validationsSchema = z.object({
  id: z.string(),
  userEmail: z.string(),
  code: z.string(),
})
