import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Sport {
  @Field()
  stadium: string;

  @Field()
  country: string;

  @Field()
  region: string;

  @Field()
  tournament: string;

  @Field()
  start: string;

  @Field()
  match: string;
}
