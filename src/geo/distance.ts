// Based on https://github.com/Turfjs/turf/blob/master/packages/turf-distance/index.ts

/**
 * Compute the Haversine distance in kilometres based on longitude and latitude. The options (last parameter) are optional.
 *
 * @example
 * Basic usage
 *```js
 * const distance = distance(-73.66, 45.51, -79.43, 43.66, { decimals: 0 })
 * // returns 501
 * ```
 *
 * @param lon1 - Longitude of the first point
 * @param lat1 - Latitude of the first point
 * @param lon2 - Longitude of the second point
 * @param lat2 - Latitude of the second point
 * @param options - Optional parameter to specify the number of decimal places
 * @param options.decimals - The number of decimal places to keep in the result
 * @category Geo
 */

export default function distance(
    lon1: number,
    lat1: number,
    lon2: number,
    lat2: number,
    options: {
        decimals?: number
    } = {}
): number {
    const dLon = toRad(lon2 - lon1)
    const dLat = toRad(lat2 - lat1)
    lat1 = toRad(lat1)
    lat2 = toRad(lat2)

    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const dist = c * 6371.0088
    return typeof options.decimals === "number"
        ? parseFloat(dist.toFixed(options.decimals))
        : dist
}

function toRad(coord: number) {
    return (coord * Math.PI) / 180
}
