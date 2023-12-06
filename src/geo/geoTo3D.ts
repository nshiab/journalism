/**
 * Convert longitude and latitude to x,y,z coordinates based on a given radius. The options (last parameter) are optional.
 *
 *```js
 * const coords = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2})
 * // returns  { x: -0.67, y: 0.71, z: 0.2 }
 * ```
 * You can pass { toArray: true } to return an array instead of an object.
 *
 * @category Geo
 */

export default function geoTo3D(
    lon: number,
    lat: number,
    radius: number,
    options: {
        decimals?: number
        toArray?: boolean
    } = {}
): { x: number; y: number; z: number } | [number, number, number] {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (90 - lon) * (Math.PI / 180)

    let x = radius * Math.sin(phi) * Math.cos(theta)

    let y = radius * Math.cos(phi)

    let z = radius * Math.sin(phi) * Math.sin(theta)

    if (typeof options.decimals === "number") {
        x = parseFloat(x.toFixed(options.decimals))
        y = parseFloat(y.toFixed(options.decimals))
        z = parseFloat(z.toFixed(options.decimals))
    }

    if (options.toArray) {
        return [x, y, z]
    } else {
        return { x, y, z }
    }
}
