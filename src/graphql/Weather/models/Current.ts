import { Field, ObjectType } from "type-graphql";
import { AirQuality } from "./AirQuality";
import { WeatherData } from "./WeatherData";

@ObjectType()
export class Current extends WeatherData {
  @Field()
  last_updated_epoch: number;

  @Field()
  last_updated: string;

  @Field(() => AirQuality, { nullable: true })
  air_quality?: AirQuality;
}
