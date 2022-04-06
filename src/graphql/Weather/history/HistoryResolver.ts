import { ApolloError } from "apollo-server-core";
import { Arg, Query, Resolver } from "type-graphql";
import WeatherService from "../../../services/weather.service";
import { HistoryInput } from "./HistoryInput";
import { HistoryResponse } from "./HistoryResponse";

@Resolver()
export class HistoryResolver {
  @Query(() => HistoryResponse)
  async weather_history(@Arg("payload") { query, dt, hour }: HistoryInput) {
    const data = await WeatherService.query("history", query, {
      dt,
      hour,
    });

    // TODO: Fix this repetitive code
    if (data.error) {
      throw new ApolloError(data.error.message, data.error.code);
    }

    return { location: data.location, forecast: data.forecast } as HistoryResponse;
  }
}
