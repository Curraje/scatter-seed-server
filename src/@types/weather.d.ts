declare namespace Weather {
  declare type QueryType =
    | "current"
    | "forecast"
    | "search"
    | "history"
    | "future"
    | "timezone"
    | "sports"
    | "astronomy"
    | "ip";

  declare interface QueryParams {
    // ! = required
    dt?: string; // History!, Future, Astronomy (date after 2010, between 14 and 300 days in future for Future)
    alerts?: "yes" | "no"; // Forecast!
    days?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | 10; // Forecast!
    aqi?: "yes" | "no"; // Current, Forecast
  }
}
