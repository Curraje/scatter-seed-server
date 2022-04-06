import { ApolloError } from "apollo-server-core";
import { Arg, Query, Resolver } from "type-graphql";
import WeatherService from "../../../services/weather.service";
import { ForecastInput } from "./ForecastInput";
import { ForecastResponse } from "./ForecastResponse";

@Resolver()
export class ForecastResolver {
  @Query(() => ForecastResponse)
  async weather_forecast(
    @Arg("payload") { query, days, includeAirQuality, includeAlerts, hour }: ForecastInput
  ) {
    const data = await WeatherService.query("forecast", query, {
      days,
      hour,
      aqi: includeAirQuality ? "yes" : "no",
      alerts: includeAlerts ? "yes" : "no",
    });

    // TODO: Fix this repetitive code
    if (data.error) {
      throw new ApolloError(data.error.message, data.error.code);
    }

    return {
      location: data.location,
      current: data.current,
      forecast: data.forecast,
      alerts: data.alerts,
    } as ForecastResponse;
  }
}
