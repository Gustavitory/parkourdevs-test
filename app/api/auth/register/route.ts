import bcrypt from "bcrypt";
import { render } from "@react-email/render";

// import { resend } from "@/lib/email";
import { ConfirmationEmail } from "@/mailer/templates/verificationCode";
import { CustomResponse } from "@/lib/api";
import { ApiResponse } from "@/lib/api/types";
import { ValidationError } from "@/lib/err/types";
import { EndpointErrorHandler } from "@/lib/err";
import { newUserDTO } from "@/lib/dto/User";
import { db } from "@/lib/db";
import { transporter } from "@/mailer";

export const POST = async (req: Request) => {
  try {
    const body = newUserDTO.parse(await req.json());

    const userExists = await db.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
      },
    });

    if (userExists) throw new ValidationError("Email already in use", 400);

    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash(body.password, salt);

    const { password, ...info } = body;

    const user = await db.user.create({
      data: {
        ...info,
        password: userPassword,
      },
    });

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const validation = await db.validations.create({
      data: { code, userEmail: user.email },
    });

    const emailHtml = render(
      ConfirmationEmail({ userName: body.name, code: validation.code })
    );
    await transporter.sendMail({
      from: "ggrieraya.freelance@gmail.com",
      to: body.email.toLocaleLowerCase(),
      subject: body.name,
      html: emailHtml,
    });

    return CustomResponse<ApiResponse>(
      {
        error: false,
        message: ["User created successfully"],
      },
      201
    );
  } catch (error: unknown) {
    return EndpointErrorHandler({
      error,
      defaultErrorMessage: "Error creating user",
    });
  }
};
