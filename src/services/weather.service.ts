import axios from "axios";
import { toQueryString } from "../utils/object.utils";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const weather = axios.create({
  baseURL: `https://api.weatherapi.com/v1/`,
});

export async function queryWeather(
  type: Weather.QueryType,
  query: string,
  params?: Weather.QueryParams
) {
  const res = await weather.get(
    `${type}.json?key=${WEATHER_API_KEY}&q=${query}${params ? `&${toQueryString(params)}` : ""}`
  );

  return res.data;
}
