"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGeoTiffDetails;
const geotiff_1 = require("geotiff");
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
async function getGeoTiffDetails(path) {
    const file = await (0, geotiff_1.fromFile)(path);
    const image = await file.getImage();
    const bbox = image.getBoundingBox();
    const pixelWidth = image.getWidth();
    const pixelHeight = image.getHeight();
    const bboxWidth = bbox[2] - bbox[0];
    const bboxHeight = bbox[3] - bbox[1];
    return { image, bbox, pixelWidth, pixelHeight, bboxWidth, bboxHeight };
}
