import { ApolloError } from "apollo-server-core";
import { Arg, Query, Resolver } from "type-graphql";
import WeatherService from "../../../services/weather.service";
import { TimezoneInput } from "./TimezoneInput";
import { TimezoneResponse } from "./TimezoneResponse";

@Resolver()
export class TimezoneResolver {
  @Query(() => TimezoneResponse)
  async weather_timezone(@Arg("payload") { query }: TimezoneInput) {
    const data = await WeatherService.query("timezone", query);

    // TODO: Fix this repetitive code
    if (data.error) {
      throw new ApolloError(data.error.message, data.error.code);
    }

    return { location: data.location } as TimezoneResponse;
  }
}
