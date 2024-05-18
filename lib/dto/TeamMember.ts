import { z } from "zod";

export const ValidPhones = {
  "0412": "0412",
  "0414": "0414",
  "0416": "0416",
  "0424": "0424",
  "0426": "0426",
} as const;

export type TValidPhones = keyof typeof ValidPhones;

export const ZNewTeamMember = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid format",
    })
    .trim()
    .toLowerCase()
    .email("Invalid email"),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Invalid format",
    })
    .trim()
    .min(2, "Too short name")
    .max(64, "Too long name")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/,
      "Name must not contain special characters"
    ),
  id: z
    .number({
      required_error: "ID is required",
      invalid_type_error: "Invalid format",
    })
    .gt(1_000_000, "Invalid Id"),
  phone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Invalid format",
    })
    .length(11, "Invalid phone number"),
  address: z.string({
    required_error: "Address is required",
    invalid_type_error: "Invalid format",
  }),
  salary: z
    .number({
      required_error: "salary is required",
      invalid_type_error: "Invalid format",
    })
    .nonnegative("Invalid salary"),
});

export type TNewTeamMember = z.infer<typeof ZNewTeamMember>;

export const ZUpdateTeamMember = z.object({
  email: z
    .string({ invalid_type_error: "Invalid format" })
    .trim()
    .toLowerCase()
    .email("Invalid email")
    .optional(),
  name: z
    .string({ invalid_type_error: "Invalid format" })
    .trim()
    .min(2, "Too short name")
    .max(64, "Too long name")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/, "Name must not contain special characters")
    .optional(),
  id: z
    .number({ invalid_type_error: "Invalid format" })
    .gt(1_000_000, "Invalid Id")
    .optional(),
  phone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Invalid format",
    })
    .length(11, "Invalid phone number")
    .optional(),
  address: z.string({ invalid_type_error: "Invalid format" }).optional(),
  salary: z
    .number({ invalid_type_error: "Invalid format" })
    .nonnegative("Invalid salary")
    .optional(),
});

export type TUpdateTeamMember = z.infer<typeof ZUpdateTeamMember>;
