import { Field, ObjectType } from "type-graphql";
import { Condition } from "./Condition";

@ObjectType()
export class Day {
  @Field()
  maxtemp_c: number;

  @Field()
  maxtemp_f: number;

  @Field()
  mintemp_c: number;

  @Field()
  mintemp_f: number;

  @Field()
  avgtemp_c: number;

  @Field()
  avgtemp_f: number;

  @Field()
  maxwind_mph: number;

  @Field()
  maxwind_kph: number;

  @Field()
  totalprecip_mm: number;

  @Field()
  totalprecip_in: number;

  @Field()
  avgvis_km: number;

  @Field()
  avgvis_miles: number;

  @Field()
  avghumidity: number;

  @Field()
  daily_will_it_rain: number;

  @Field()
  daily_chance_of_rain: number;

  @Field()
  daily_will_it_snow: number;

  @Field()
  daily_chance_of_snow: number;

  @Field(() => Condition)
  condition: Condition;

  @Field()
  uv: number;
}
