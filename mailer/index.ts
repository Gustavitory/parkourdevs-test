import { env } from "@/lib/env.mjs";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.MAILER__USER,
    pass: env.MAILER__PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
