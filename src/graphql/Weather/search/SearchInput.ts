import { InputType } from "type-graphql";
import { WeatherInputBase } from "../WeatherInputBase";

@InputType()
export class SearchInput extends WeatherInputBase {}
