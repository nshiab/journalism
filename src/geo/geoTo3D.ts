/**
 * Converts geographical coordinates (longitude and latitude) into 3D Cartesian (x, y, z) coordinates based on a specified radius.
 *
 * The conversion assumes a spherical Earth model. The `radius` parameter determines the size of the sphere on which the points are projected.
 *
 * @param lon The longitude of the geographical point, in degrees.
 * @param lat The latitude of the geographical point, in degrees.
 * @param radius The radius of the sphere on which to project the coordinates.
 * @param options Optional settings for the conversion.
 * @param options.decimals The number of decimal places to round the x, y, and z coordinates to. If not specified, no rounding is applied.
 * @param options.toArray If `true`, the function will return the coordinates as an array `[x, y, z]` instead of an object `{ x, y, z }`. Defaults to `false`.
 *
 * @returns An object `{ x, y, z }` or an array `[x, y, z]` representing the 3D Cartesian coordinates.
 *
 * @example
 * // Basic usage: Convert geographical coordinates to 3D object coordinates.
 * // Longitude: -73.5674 (Montreal), Latitude: 45.5019 (Montreal), Radius: 1
 * const coordsObject = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2 });
 * console.log(coordsObject); // Expected output: { x: -0.67, y: 0.71, z: 0.2 }
 *
 * @example
 * // Convert geographical coordinates to 3D array coordinates.
 * const coordsArray = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2, toArray: true });
 * console.log(coordsArray); // Expected output: [-0.67, 0.71, 0.2]
 *
 * @example
 * // Using a larger radius for visualization purposes.
 * const earthCoords = geoTo3D(0, 0, 6371, { decimals: 0 }); // Earth's approximate radius in km
 * console.log(earthCoords); // Expected output: { x: 0, y: 6371, z: 0 } (for 0,0 lat/lon)
 *
 * @category Geo
 */

export default function geoTo3D(
  lon: number,
  lat: number,
  radius: number,
  options: {
    decimals?: number;
    toArray?: boolean;
  } = {},
): { x: number; y: number; z: number } | [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (90 - lon) * (Math.PI / 180);

  let x = radius * Math.sin(phi) * Math.cos(theta);

  let y = radius * Math.cos(phi);

  let z = radius * Math.sin(phi) * Math.sin(theta);

  if (typeof options.decimals === "number") {
    x = parseFloat(x.toFixed(options.decimals));
    y = parseFloat(y.toFixed(options.decimals));
    z = parseFloat(z.toFixed(options.decimals));
  }

  if (options.toArray) {
    return [x, y, z];
  } else {
    return { x, y, z };
  }
}
