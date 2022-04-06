import { Field, ObjectType } from "type-graphql";
import { Location } from "../models";

@ObjectType()
export class TimezoneResponse {
  @Field(() => Location)
  location: Location;
}
