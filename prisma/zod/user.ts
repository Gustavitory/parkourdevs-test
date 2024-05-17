import * as z from "zod"
import { CompleteTeamMembers, relatedTeamMembersSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  password: z.string(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  teamMembers: CompleteTeamMembers[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  teamMembers: relatedTeamMembersSchema.array(),
}))
