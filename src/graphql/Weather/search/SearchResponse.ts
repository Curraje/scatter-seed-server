import { Field, ObjectType } from "type-graphql";
import { Location } from "../models";

@ObjectType()
export class SearchLocation extends Location {
  @Field()
  id: number;
}

@ObjectType()
export class SearchResponse {
  @Field(() => [SearchLocation])
  locations: SearchLocation[];
}
