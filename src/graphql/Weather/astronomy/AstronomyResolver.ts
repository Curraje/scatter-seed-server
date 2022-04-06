import { ApolloError } from "apollo-server-core";
import { Arg, Query, Resolver } from "type-graphql";
import WeatherService from "../../../services/weather.service";
import { AstronomyInput } from "./AstronomyInput";
import { AstronomyResponse } from "./AstronomyResponse";

@Resolver()
export class AstronomyResolver {
  @Query(() => AstronomyResponse)
  async weather_astronomy(@Arg("payload") { query, dt }: AstronomyInput) {
    const data = await WeatherService.query("astronomy", query, {
      dt,
    });

    // TODO: Fix this repetitive code
    if (data.error) {
      throw new ApolloError(data.error.message, data.error.code);
    }

    return { location: data.location, astronomy: data.astronomy } as AstronomyResponse;
  }
}
