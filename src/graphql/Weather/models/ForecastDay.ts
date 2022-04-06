import { Field, ObjectType } from "type-graphql";
import { Astro } from "./Astro";
import { Day } from "./Day";
import { Hour } from "./Hour";

@ObjectType()
export class ForecastDay {
  @Field()
  date: string;

  @Field()
  date_epoch: number;

  @Field(() => Day)
  day: Day;

  @Field(() => Astro)
  astro: Astro;

  @Field(() => [Hour])
  hour: Hour[];
}
