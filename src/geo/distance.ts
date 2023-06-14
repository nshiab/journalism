// Based on https://github.com/Turfjs/turf/blob/master/packages/turf-distance/index.ts

/**
 * Compute the distance in kilometres based on latitude and longitude. The options (last parameter) are optional.
 *
 *```js
 * const distance = distance(45.51, -73.66, 43.66, -79.43, { nbDecimals: 0 })
 * // returns 501
 * ```
 */

export default function distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    options: {
        nbDecimals?: number
    } = {}
): number {
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    lat1 = toRad(lat1)
    lat2 = toRad(lat2)

    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const dist = c * 6371.0088
    return typeof options.nbDecimals === "number"
        ? parseFloat(dist.toFixed(options.nbDecimals))
        : dist
}

function toRad(coord: number) {
    return (coord * Math.PI) / 180
}
