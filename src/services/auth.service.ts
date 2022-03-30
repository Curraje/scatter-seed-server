import { sign } from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const SECRET = process.env.SESSION_SECRET;

export const SALT_ROUNDS = 10;

export async function createToken(id: string, count: number) {
  try {
    const refreshToken = sign({ userId: id, count: count }, SECRET, {
      expiresIn: "7d",
    });

    const accessToken = sign({ userId: id }, SECRET, {
      expiresIn: "15min",
    });
  } catch (err) {
    // Crash server, env should be defined
    throw new Error("SESSION_SECRET MUST BE DEFINED IN .env");
  }
}
