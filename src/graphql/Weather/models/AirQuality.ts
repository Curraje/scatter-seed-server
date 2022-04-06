import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AirQuality {
  @Field()
  co: number;

  @Field()
  no2: number;

  @Field()
  o3: number;

  @Field()
  so2: number;

  @Field()
  pm2_5: number;

  @Field()
  pm10: number;

  @Field()
  "us-epa-index": number;

  @Field()
  "gb-defra-index": number;
}
