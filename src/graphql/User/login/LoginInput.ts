import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  identifier: string; // An Email or Username

  @Field()
  password: string;
}
