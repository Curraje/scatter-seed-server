import { Field, ObjectType } from "type-graphql";
import { Alert } from "../models";
import { ForecastDay } from "../models/ForecastDay";
import { RealtimeResponse } from "../realtime/RealtimeResponse";

@ObjectType()
export class ForecastWrapper {
  @Field(() => [ForecastDay])
  forecastday: ForecastDay[];
}

@ObjectType()
class AlertWrapper {
  @Field(() => [Alert])
  alert: Alert[];
}

@ObjectType()
export class ForecastResponse extends RealtimeResponse {
  @Field(() => ForecastWrapper)
  forecast: ForecastWrapper;

  @Field(() => AlertWrapper, { nullable: true })
  alerts?: AlertWrapper;
}
