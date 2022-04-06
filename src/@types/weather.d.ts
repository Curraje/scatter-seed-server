declare namespace Weather {
  declare type QueryType =
    | "current"
    | "forecast"
    | "search"
    | "history"
    // | "future"
    | "timezone"
    | "sports"
    | "astronomy";
  // | "ip";

  declare interface QueryParams {
    /** Required for History - Date to get Weather data for:
     * - Past 7 days only
     */
    dt?: string;
    /** Optional for Forecast - Add Weather Alert Data:
     * - Yes or No
     */
    alerts?: "yes" | "no";
    /** Required for Forecast
     * - integer between 1-10 */
    days?: number;
    /** Optional for Current and Forecast - Air Quality Data:
     * - Yes or No */
    aqi?: "yes" | "no";
    /** Optional for History or Forecast, provide data for requested hour only:
     * - integer between 0-23 */
    hour?: number; //
  }
}
