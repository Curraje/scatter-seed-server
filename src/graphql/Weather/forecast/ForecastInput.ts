import { IsInt, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";
import { WeatherInputBase } from "../WeatherInputBase";

@InputType()
export class ForecastInput extends WeatherInputBase {
  @Field()
  @Min(1, { message: "The minimum forecast day is 1 day from now." })
  @Max(10, { message: "The maximum forecast day is 10 days from now." })
  @IsInt({ message: "The forecast day must be an integer." })
  days: number;

  @Field({ nullable: true })
  includeAirQuality?: boolean;

  @Field({ nullable: true })
  @Min(0, { message: "The minimum hour is 0, 12AM on the 24-hour clock." })
  @Max(23, { message: "The maximum hour is 23, 11PM on the 24-hour clock." })
  @IsInt({ message: "The hour must be an integer." })
  hour?: number;

  @Field({ nullable: true })
  includeAlerts?: boolean;
}
