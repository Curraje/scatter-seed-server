import { Field, ObjectType } from "type-graphql";
import { Astro, Location } from "../models";

@ObjectType()
class AstronomyWrapper {
  @Field(() => Astro)
  astro: Astro;
}

@ObjectType()
export class AstronomyResponse {
  @Field(() => Location)
  location: Location;

  @Field(() => AstronomyWrapper)
  astronomy: AstronomyWrapper;
}
