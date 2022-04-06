import { Field, ObjectType } from "type-graphql";
import { Current, Location } from "../models";

@ObjectType()
export class RealtimeResponse {
  @Field(() => Location)
  location: Location;

  @Field(() => Current)
  current: Current;
}
