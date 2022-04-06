import { Field, InputType } from "type-graphql";

@InputType()
export class WeatherInputBase {
  @Field()
  query: string;
}
