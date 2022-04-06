import { ApolloError } from "apollo-server-core";
import { Arg, Query, Resolver } from "type-graphql";
import WeatherService from "../../../services/weather.service";
import { RealtimeInput } from "./RealtimeInput";
import { RealtimeResponse } from "./RealtimeResponse";

@Resolver()
export class RealtimeResolver {
  @Query(() => RealtimeResponse)
  async weather_realtime(@Arg("payload") { query, includeAirQuality }: RealtimeInput) {
    const data = await WeatherService.query("current", query, {
      aqi: includeAirQuality ? "yes" : "no",
    });

    // TODO: Fix this repetitive code
    if (data.error) {
      throw new ApolloError(data.error.message, data.error.code);
    }

    return { location: data.location, current: data.current } as RealtimeResponse;
  }
}
