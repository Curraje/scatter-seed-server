import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Location {
  @Field()
  lat: number;

  @Field()
  lon: number;

  @Field()
  name: string;

  @Field()
  region: string;

  @Field()
  country: string;

  @Field({ nullable: true })
  tz_id?: string;

  @Field({ nullable: true })
  localtime_epoch?: number;

  @Field({ nullable: true })
  localtime?: string;
}
