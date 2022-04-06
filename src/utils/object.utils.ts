export function toQueryString(obj: any, encode = true): string {
  return Object.keys(obj)
    .map((key) =>
      obj[key] !== null && obj[key] !== undefined
        ? `${encode ? encodeURIComponent(key) : key}=${
            encode ? encodeURIComponent(obj[key]) : obj[key]
          }`
        : ""
    )
    .join("&");
}
