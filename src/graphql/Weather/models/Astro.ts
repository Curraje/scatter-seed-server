import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Astro {
  @Field()
  sunrise: string;

  @Field()
  sunset: string;

  @Field()
  moonrise: string;

  @Field()
  moonset: string;

  @Field()
  moon_phase: string;

  @Field()
  moon_illumination: string;
}
