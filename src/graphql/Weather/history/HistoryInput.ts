import { IsDateString, IsInt, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";
import { WeatherInputBase } from "../WeatherInputBase";

@InputType()
export class HistoryInput extends WeatherInputBase {
  @Field()
  @IsDateString()
  dt: string;

  @Field({ nullable: true })
  @Min(0, { message: "The minimum hour is 0, 12AM on the 24-hour clock." })
  @Max(23, { message: "The maximum hour is 23, 11PM on the 24-hour clock." })
  @IsInt({ message: "The hour must be an integer." })
  hour?: number;
}
