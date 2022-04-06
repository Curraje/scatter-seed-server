import { ApolloError } from "apollo-server-core";
import { Arg, Query, Resolver } from "type-graphql";
import WeatherService from "../../../services/weather.service";
import { SportInput } from "./SportInput";
import { SportResponse } from "./SportResponse";

@Resolver()
export class SportResolver {
  @Query(() => SportResponse)
  async weather_sports(@Arg("payload") { query }: SportInput) {
    const data = await WeatherService.query("sports", query);

    // TODO: Fix this repetitive code
    if (data.error) {
      throw new ApolloError(data.error.message, data.error.code);
    }

    return { football: data.football, cricket: data.cricket, golf: data.golf } as SportResponse;
  }
}
