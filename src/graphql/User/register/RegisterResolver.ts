import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../../@generated/type-graphql";
import { Context } from "../../../context";
import * as bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../../services/auth.service";
import { RegisterInput } from "./RegisterInput";

@Resolver(() => User)
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg("payload") { username, email, password }: RegisterInput,
    @Ctx() { prisma }: Context
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      return { uuid: user.uuid, email: user.email, username: user.username, role: user.role };
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
