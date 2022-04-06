import { Field, ObjectType } from "type-graphql";
import { Sport } from "../models/Sport";

@ObjectType()
export class SportResponse {
  @Field(() => [Sport], { nullable: true })
  football?: Sport[];

  @Field(() => [Sport], { nullable: true })
  cricket?: Sport[];

  @Field(() => [Sport], { nullable: true })
  golf?: Sport[];
}
