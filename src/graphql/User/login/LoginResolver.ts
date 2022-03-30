import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "../../../@generated/type-graphql";
import { Context } from "../../../context";
import { LoginInput } from "./LoginInput";
import * as bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server-core";
import { createAccessToken } from "../../../services/auth.service";

const INVALID_LOGIN_MSG = "Invalid Credentials";

@ObjectType()
class LoginResponse {
  @Field()
  token: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(@Arg("payload") { identifier, password }: LoginInput, @Ctx() ctx: Context) {
    // Find User on username or email
    const user = await ctx.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!(user && (await bcrypt.compare(password, user.password))))
      throw new AuthenticationError(INVALID_LOGIN_MSG);

    const token = await createAccessToken(user.uuid, user.username, user.role);
    return { token, user };
  }
}
