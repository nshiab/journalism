import { minIndex } from "d3-array"
import distance from "./distance.js"

/**
 * Return the closest item of a list based on latitude and longitude. The options (last parameter) are optional.
 *
 * ```js
 * const geoItems = [
 *    {name: "Montreal", lat: 45.51, lon: -73.66 },
 *    {name: "Toronto", lat: 43.66, lon: -79.43 },
 * ]
 * const ottawa = {lat: 45.37, lon: -75.71}
 * const closest = getClosest(
 *    ottawa.lat,
 *    ottawa.lon,
 *    geoItems,
 *    d => d.lat,
 *    d => d.lon,
 *    { addDistance: true, nbDecimals: 3 }
 * )
 * // return { name: "Montreal", lat: 45.51, lon: -73.66, distance: 160.694 }
 * ```
 */

export default function getClosest(
    lat: number,
    lon: number,
    geoItems: Array<unknown>,
    getItemLat: (d: unknown) => number,
    getItemLon: (d: unknown) => number,
    options: {
        addDistance?: boolean
        nbDecimals?: number
    } = {}
) {
    const distances = []

    for (let i = 0; i < geoItems.length; i++) {
        const item = geoItems[i]
        distances[i] = distance(lat, lon, getItemLat(item), getItemLon(item), {
            nbDecimals: options.nbDecimals,
        })
    }

    const distanceMinIndex = minIndex(distances)
    const closest = geoItems[distanceMinIndex] as { distance?: number }
    if (options.addDistance) {
        closest.distance = distances[distanceMinIndex]
    }

    return closest
}
