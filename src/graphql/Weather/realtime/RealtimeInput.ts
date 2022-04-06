import { Field, InputType } from "type-graphql";
import { WeatherInputBase } from "../WeatherInputBase";

@InputType()
export class RealtimeInput extends WeatherInputBase {
  @Field({ nullable: true })
  includeAirQuality: boolean;
}
