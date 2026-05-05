// Based on https://github.com/Turfjs/turf/blob/master/packages/turf-distance/index.ts

/**
 * Calculates the Haversine distance between two geographical points (longitude and latitude) in kilometers. The Haversine formula is used to determine the great-circle distance between two points on a sphere given their longitudes and latitudes.
 *
 * This function is useful for geospatial applications where accurate distance measurements over the Earth's surface are required,.
 *
 * @param lon1 The longitude of the first point.
 * @param lat1 The latitude of the first point.
 * @param lon2 The longitude of the second point.
 * @param lat2 The latitude of the second point.
 * @param options Optional settings for the distance calculation.
 * @param options.decimals The number of decimal places to round the result to. If not specified, the result will not be rounded.
 *
 * @returns The distance between the two points in kilometers.
 *
 * @example
 * ```ts
 * // Basic usage: Calculate the distance between two cities.
 * // Montreal (-73.5673, 45.5017) and Toronto (-79.3832, 43.6532)
 * const dist = distance(-73.5673, 45.5017, -79.3832, 43.6532);
 * console.log(dist); // Approximately 504.5 km
 * ```
 * @example
 * ```ts
 * // Rounding the result to a whole number.
 * const roundedDist = distance(-73.5673, 45.5017, -79.3832, 43.6532, { decimals: 0 });
 * console.log(roundedDist); // 505 km
 * ```
 * @category Geo
 */

export default function distance(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number,
  options: {
    decimals?: number;
  } = {},
): number {
  const dLon = toRad(lon2 - lon1);
  const dLat = toRad(lat2 - lat1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a = Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const dist = c * 6371.0088;
  return typeof options.decimals === "number"
    ? parseFloat(dist.toFixed(options.decimals))
    : dist;
}

function toRad(coord: number) {
  return (coord * Math.PI) / 180;
}
