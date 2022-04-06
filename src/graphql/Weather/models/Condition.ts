import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Condition {
  @Field()
  text: string;

  @Field()
  icon: string;

  @Field()
  code: number;
}
