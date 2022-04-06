import { Field, ObjectType } from "type-graphql";
import { WeatherData } from "./WeatherData";

@ObjectType()
export class Hour extends WeatherData {
  @Field()
  time_epoch: number;

  @Field()
  time: string;

  @Field()
  windchill_c: number;

  @Field()
  windchill_f: number;

  @Field()
  heatindex_c: number;

  @Field()
  heatindex_f: number;

  @Field()
  dewpoint_c: number;

  @Field()
  dewpoint_f: number;

  @Field()
  will_it_rain: number;

  @Field()
  chance_of_rain: number;

  @Field()
  will_it_snow: number;

  @Field()
  chance_of_snow: number;
}
