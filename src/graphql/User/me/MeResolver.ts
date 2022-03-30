import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../@generated/type-graphql";
import { Context } from "../../../context";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context) {
    if (!ctx.req.user) {
      return null;
    }

    const user = await ctx.prisma.user.findUnique({ where: { uuid: ctx.req.user.id } });
    return user;
  }
}
