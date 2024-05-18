import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const teamMembersSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  salary: z.number().int(),
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
