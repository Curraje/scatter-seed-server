import axios from "axios";
import { toQueryString } from "../utils/object.utils";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "invalid_key";

const weather = axios.create({
  baseURL: `https://api.weatherapi.com/v1/`,
});

weather.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error?.response ?? Promise.reject(error);
  }
);

class WeatherService {
  /**
 * 
 * @param type The type of request to make to the weather api.
 * @param query Query parameter based on which data is sent back:
    - Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
    - city name e.g.: q=Paris
    - US zip e.g.: q=10001
    - UK postcode e.g: q=SW1
    - Canada postal code e.g: q=G2J
    - metar:<metar code> e.g: q=metar:EGLL
    - iata:<3 digit airport code> e.g: q=iata:DXB
    - auto:ip IP lookup e.g: q=auto:ip
    - IP address (IPv4 and IPv6 supported) e.g: q=100.0.0.1

 * @param params Optional or Mandatory (depending on type of request) request parameters.
 * @returns Weather Data, always has location key.
 */
  async query(type: Weather.QueryType, query: string, params?: Weather.QueryParams) {
    try {
      const res = await weather.get(
        `${type}.json?key=${WEATHER_API_KEY}&q=${query}${params ? `&${toQueryString(params)}` : ""}`
      );

      return res.data;
    } catch (err) {
      return {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: `Unknown error occurred while fetching ${type} weather data.`,
        },
      };
    }
  }
}

export default new WeatherService();
