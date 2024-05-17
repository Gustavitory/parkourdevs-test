import * as z from "zod"
import { STATUS } from "@prisma/client"
import { CompleteUser, relatedUserSchema } from "./index"

export const teamMembersSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  ci: z.number().int(),
  phone: z.string(),
  direction: z.string(),
  salary: z.number().int(),
  hours: z.number().int(),
  status: z.nativeEnum(STATUS),
  createdAt: z.date().nullish(),
  userId: z.string(),
})

export interface CompleteTeamMembers extends z.infer<typeof teamMembersSchema> {
  user: CompleteUser
}

/**
 * relatedTeamMembersSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTeamMembersSchema: z.ZodSchema<CompleteTeamMembers> = z.lazy(() => teamMembersSchema.extend({
  user: relatedUserSchema,
}))
