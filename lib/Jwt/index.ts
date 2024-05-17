import jwt from "jsonwebtoken";

import { AuthError, ParsingError } from "@/lib/err/types";

export const signToken = <T>(payload: T): string => {
  if (!globalThis.process.env.JWT_SEED)
    throw new ParsingError("JWT seed is required", 400);

  return jwt.sign(payload as Buffer, globalThis.process.env.JWT_SEED, {
    expiresIn: 3600 * 24,
    noTimestamp: true,
  });
};

export const decodeToken = async <T>(token: string): Promise<T> => {
  if (!process.env.JWT_SEED) throw new ParsingError("No hay seed de JWT", 400);

  return new Promise((resolve, reject) => {
    jwt.verify(token, globalThis.process.env.JWT_SEED!, (err, payload) => {
      if (err) {
        console.log(err);
        return reject(new AuthError("Ocurrió un error iniciando sesión", 403));
      }

      return resolve(payload as T & { exp: number });
    });
  });
};
