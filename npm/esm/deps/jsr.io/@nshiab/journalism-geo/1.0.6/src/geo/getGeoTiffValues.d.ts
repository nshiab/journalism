/**
 * Extracts values at specific latitude and longitude coordinates from a GeoTIFF image. This function works in conjunction with the `getGeoTiffDetails` function, using the details returned by it.
 *
 * @example
 * ```ts
 * // Basic usage
 *
 * const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
 * const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
 * console.log(value) // 255
 * ```
 * @param lat - The latitude coordinate for which to extract the value.
 * @param lon - The longitude coordinate for which to extract the value.
 * @param geoTiffDetails - An object containing the GeoTIFF image details, typically obtained from `getGeoTiffDetails`.
 * @returns A Promise that resolves to the pixel value at the specified coordinates, or a `TypedArray` if multiple bands are present.
 * @throws {Error} If the coordinates are outside the GeoTIFF's bounding box or if there's an issue reading the raster data.
 *
 * @category Geo
 */
export default function getGeoTiffValues(lat: number, lon: number, geoTiffDetails: {
    image: unknown;
    bbox: number[];
    pixelWidth: number;
    pixelHeight: number;
    bboxWidth: number;
    bboxHeight: number;
}): Promise<Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array>;
//# sourceMappingURL=getGeoTiffValues.d.ts.map