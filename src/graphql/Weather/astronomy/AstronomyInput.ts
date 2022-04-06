import { IsDateString } from "class-validator";
import { Field, InputType } from "type-graphql";
import { WeatherInputBase } from "../WeatherInputBase";

@InputType()
export class AstronomyInput extends WeatherInputBase {
  @Field({ nullable: true })
  @IsDateString()
  dt?: string;
}
