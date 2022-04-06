import { Field, ObjectType } from "type-graphql";
import { ForecastWrapper } from "../forecast/ForecastResponse";
import { Location } from "../models";

@ObjectType()
export class HistoryResponse {
  @Field(() => Location)
  location: Location;

  @Field(() => ForecastWrapper)
  forecast: ForecastWrapper;
}
