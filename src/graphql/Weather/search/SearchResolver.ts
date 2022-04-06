import { ApolloError } from "apollo-server-core";
import { Arg, Query, Resolver } from "type-graphql";
import WeatherService from "../../../services/weather.service";
import { SearchInput } from "./SearchInput";
import { SearchResponse } from "./SearchResponse";

@Resolver()
export class SearchResolver {
  @Query(() => SearchResponse)
  async weather_search(@Arg("payload") { query }: SearchInput) {
    const data = await WeatherService.query("search", query);

    // TODO: Fix this repetitive code
    if (data.error) {
      throw new ApolloError(data.error.message, data.error.code);
    }

    return { locations: data } as SearchResponse;
  }
}
