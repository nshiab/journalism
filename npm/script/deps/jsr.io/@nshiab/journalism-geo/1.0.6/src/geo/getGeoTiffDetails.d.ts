/**
 * Extracts detailed information from a GeoTIFF file, which can then be used with the `getGeoTiffValues` function.
 *
 * @example
 * ```ts
 * // Basic usage
 * const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
 * console.log(geoTiffDetails.bbox) // [ -73.8, 45.4, -73.5, 45.6 ]
 * ```
 * @example
 * ```ts
 * // Using the output with `getGeoTiffValues`
 *
 * const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
 * const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
 * console.log(value) // 255
 * ```
 * @param path - The absolute path to the GeoTIFF file.
 * @returns A Promise that resolves to an object containing the GeoTIFF image, bounding box, pixel dimensions, and bounding box dimensions.
 *
 * @category Geo
 */
export default function getGeoTiffDetails(path: string): Promise<{
    image: any;
    bbox: number[];
    pixelWidth: number;
    pixelHeight: number;
    bboxWidth: number;
    bboxHeight: number;
}>;
//# sourceMappingURL=getGeoTiffDetails.d.ts.map