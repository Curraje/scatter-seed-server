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

  // HACK: Exclude for now, probably won't even use the data
  // @Field()
  // us_epa_index: number;

  // @Field()
  // gb_defra_index: number;
}
