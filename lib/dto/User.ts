import { z } from "zod";

export const newUserDTO = z.object({
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
    .min(2, "Name must contain at leat two letters")
    .max(64, "Name must no contain more than sixty-four letters")
    .regex(/[a-zA-ZáéíóúÁÉÍÓÚ ]/, "Special characters are not allowed"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[().,_!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain:\n - At least an uppercase letter\n - At least an lowercase letter\n - At least a number\n - At least a special character\n - At least eight characters"
    ),
});

export const validateAccountDTO = z.object({
  userEmail: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid format",
    })
    .trim()
    .toLowerCase()
    .email("Invalid email"),
  code: z
    .string({
      required_error: "Code is required",
      invalid_type_error: "Invalid format",
    })
    .trim()
    .min(4, "Code must contain at leat four letters")
    .max(4, "Code must no contain more than four digits"),
});

export type TNewUserDTO = z.infer<typeof newUserDTO>;
export type TValidateAccountDTO = z.infer<typeof validateAccountDTO>;
