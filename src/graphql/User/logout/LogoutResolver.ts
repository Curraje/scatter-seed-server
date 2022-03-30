import { Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../../../context";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context) {}
}
