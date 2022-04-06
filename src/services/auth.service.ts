import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { not, rule, shield } from "graphql-shield";
import { Context } from "../context";
import { AuthenticationError } from "apollo-server-core";

export const SECRET = process.env.SESSION_SECRET || uuidv4();

export const SALT_ROUNDS = 10;

// Token Creation Functions

// TODO: Implement Remember Me

export async function createAccessToken(id: string, username: string, role: string) {
  return sign({ id, username, role }, SECRET, {
    // expiresIn: "15min",
    algorithm: "HS256",
    subject: username,
  });
}

export async function createRefreshToken(id: string, username: string, role: string) {
  return sign({ id, username, role }, SECRET, {
    // expiresIn: "7d",
    algorithm: "HS256",
    subject: username,
  });
}

// Rules

const isAuthenticated = rule({ cache: "contextual" })(async (parent, args, ctx: Context, info) => {
  return !!ctx.req.user;
});

const isAdmin = rule({ cache: "contextual" })(async (parent, args, ctx: Context, info) => {
  return ctx.req.user?.role === "ADMIN";
});

/**
 * Permissions Middleware
 */
export const permissions = shield(
  {
    Mutation: {
      // register: not(isAuthenticated),
      // login: not(isAuthenticated), // only testing
    },
  },
  {
    allowExternalErrors: true,
    fallbackError: new AuthenticationError("Not Authorized!"),
  }
);
