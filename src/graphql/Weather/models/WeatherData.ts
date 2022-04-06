import { Field, ObjectType } from "type-graphql";
import { Condition } from "./Condition";

@ObjectType()
export class WeatherData {
  @Field()
  temp_c: number;

  @Field()
  temp_f: number;

  @Field()
  is_day: number;

  @Field(() => Condition)
  condition: Condition;

  @Field()
  wind_mph: number;

  @Field()
  wind_kph: number;

  @Field()
  wind_degree: number;

  @Field()
  wind_dir: string;

  @Field()
  pressure_mb: number;

  @Field()
  pressure_in: number;

  @Field()
  precip_mm: number;

  @Field()
  precip_in: number;

  @Field()
  humidity: number;

  @Field()
  cloud: number;

  @Field()
  feelslike_c: number;

  @Field()
  feelslike_f: number;

  @Field()
  vis_km: number;

  @Field()
  vis_miles: number;

  @Field()
  gust_mph: number;

  @Field()
  gust_kph: number;

  @Field()
  uv: number;
}
