import { minIndex } from "npm:d3-array@3";
import distance from "./distance.ts";

/**
 * Return the closest item of a list based on longitude and latitude. The options (last parameter) are optional. If `addDistance` is true and `geoItems` have a `properties` key, the distance will be added to the properties.
 *
 * @example
 * Basic usage
 * ```js
 * const geoItems = [
 *    {name: "Montreal", lon: -73.66, lat: 45.51 },
 *    {name: "Toronto", lon: -79.43, lat: 43.66 },
 * ]
 * const ottawa = {lat: 45.37, lon: -75.71}
 * const closest = getClosest(
 *    ottawa.lon,
 *    ottawa.lat,
 *    geoItems,
 *    d => d.lon,
 *    d => d.lat,
 *    { addDistance: true, decimals: 3 }
 * )
 * // return { name: "Montreal", lon: -73.66, lat: 45.51, distance: 160.694 }
 * ```
 *
 * @param lon - The longitude of the reference point.
 * @param lat - The latitude of the reference point.
 * @param geoItems - The list of geographical items to search through.
 * @param getItemLon - Function to get the longitude of an item.
 * @param getItemLat - Function to get the latitude of an item.
 * @param options - Optional settings.
 * @param options.addDistance - Whether to add the distance to the closest item.
 * @param options.decimals - Number of decimal places for the distance.
 *
 * @category Geo
 */

export default function getClosest(
  lon: number,
  lat: number,
  geoItems: Array<unknown>,
  getItemLon: (d: unknown) => number,
  getItemLat: (d: unknown) => number,
  options: {
    addDistance?: boolean;
    decimals?: number;
  } = {},
): {
  properties?:
    | {
      distance?: number | undefined;
    }
    | undefined;
  distance?: number | undefined;
} {
  const distances = [];

  for (let i = 0; i < geoItems.length; i++) {
    const item = geoItems[i];
    distances[i] = distance(lon, lat, getItemLon(item), getItemLat(item), {
      decimals: options.decimals,
    });
  }

  const distanceMinIndex = minIndex(distances);
  const closest = geoItems[distanceMinIndex] as {
    properties?: { distance?: number };
    distance?: number;
  };

  if (options.addDistance) {
    if (typeof closest.properties === "object") {
      closest.properties.distance = distances[distanceMinIndex];
    } else {
      closest.distance = distances[distanceMinIndex];
    }
  }

  return closest;
}
