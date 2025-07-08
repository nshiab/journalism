import { minIndex } from "npm:d3-array@3";
import distance from "./distance.ts";

/**
 * Finds the geographical item closest to a given reference point (longitude and latitude) from a list of geographical items.
 *
 * The function calculates the distance between the reference point and each item in the `geoItems` array using the Haversine formula (via the `distance` function). It then returns the item with the minimum distance.
 *
 * Optionally, you can choose to add the calculated distance as a new property to the returned closest item. If the `geoItems` have a `properties` key (common in GeoJSON-like structures), the distance will be added there; otherwise, it will be added directly to the item object.
 *
 * @param lon The longitude of the reference point.
 * @param lat The latitude of the reference point.
 * @param geoItems An array of geographical items to search through. Each item should contain properties that can be accessed by `getItemLon` and `getItemLat` to retrieve its longitude and latitude.
 * @param getItemLon A function that takes an item from `geoItems` and returns its longitude.
 * @param getItemLat A function that takes an item from `geoItems` and returns its latitude.
 * @param options Optional settings for the search.
 * @param options.addDistance If `true`, the calculated distance to the closest item will be added as a property (`distance`) to the returned object. Defaults to `false`.
 * @param options.decimals The number of decimal places to round the calculated distance to, if `addDistance` is `true`.
 *
 * @returns The geographical item from `geoItems` that is closest to the reference point. If `addDistance` is `true`, the returned object will also include the `distance` property.
 *
 * @example
 * ```ts
 * // Basic usage: Find the closest city to Ottawa.
 * const cities = [
 *   { name: "Montreal", lon: -73.5673, lat: 45.5017 },
 *   { name: "Toronto", lon: -79.3832, lat: 43.6532 },
 *   { name: "Vancouver", lon: -123.1207, lat: 49.2827 }
 * ];
 * const ottawa = { lon: -75.6972, lat: 45.4215 };
 *
 * const closestCity = getClosest(
 *   ottawa.lon,
 *   ottawa.lat,
 *   cities,
 *   (d) => d.lon,
 *   (d) => d.lat,
 *   { addDistance: true, decimals: 2 }
 * );
 *
 * console.log(closestCity);
 * // Expected output: { name: "Montreal", lon: -73.5673, lat: 45.5017, distance: 160.69 }
 * ```
 * @example
 * ```ts
 * // Finding the closest point in a GeoJSON FeatureCollection.
 * const featureCollection = {
 *   type: "FeatureCollection",
 *   features: [
 *     { type: "Feature", properties: { name: "Park A" }, geometry: { type: "Point", coordinates: [-74.0, 40.7] } },
 *     { type: "Feature", properties: { name: "Park B" }, geometry: { type: "Point", coordinates: [-73.9, 40.8] } }
 *   ]
 * };
 * const userLocation = { lon: -73.95, lat: 40.75 };
 *
 * const closestPark = getClosest(
 *   userLocation.lon,
 *   userLocation.lat,
 *   featureCollection.features,
 *   (f) => f.geometry.coordinates[0],
 *   (f) => f.geometry.coordinates[1],
 *   { addDistance: true }
 * );
 *
 * console.log(closestPark);
 * // Expected output: { type: "Feature", properties: { name: "Park B", distance: ... }, geometry: { ... } }
 * ```
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
