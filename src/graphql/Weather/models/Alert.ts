import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Alert {
  @Field()
  headline: string;

  @Field()
  msgtype: string;

  @Field()
  severity: string;

  @Field()
  urgency: string;

  @Field()
  areas: string;

  @Field()
  category: string;

  @Field()
  certainty: string;

  @Field()
  event: string;

  @Field()
  note: string;

  @Field()
  effective: string;

  @Field()
  expires: string;

  @Field()
  desc: string;

  @Field()
  instruction: string;
}
