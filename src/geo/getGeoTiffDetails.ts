import { fromFile } from "npm:geotiff@2";
import type { GeoTIFFImage } from "npm:geotiff@2";

/**
 * Extracts detailed information from a GeoTIFF file, which can then be used with the `getGeoTiffValues` function.
 *
 * @example
 * // Basic usage
 * const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
 * console.log(geoTiffDetails.bbox) // [ -73.8, 45.4, -73.5, 45.6 ]
 *
 * @example
 * // Using the output with `getGeoTiffValues`
 * import getGeoTiffValues from "./getGeoTiffValues.ts";
 *
 * const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
 * const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
 * console.log(value) // 255
 *
 * @param path - The absolute path to the GeoTIFF file.
 * @returns A Promise that resolves to an object containing the GeoTIFF image, bounding box, pixel dimensions, and bounding box dimensions.
 *
 * @category Geo
 */
export default async function getGeoTiffDetails(path: string): Promise<{
  image: GeoTIFFImage;
  bbox: number[];
  pixelWidth: number;
  pixelHeight: number;
  bboxWidth: number;
  bboxHeight: number;
}> {
  const file = await fromFile(path);
  const image = await file.getImage();
  const bbox = image.getBoundingBox();
  const pixelWidth = image.getWidth();
  const pixelHeight = image.getHeight();
  const bboxWidth = bbox[2] - bbox[0];
  const bboxHeight = bbox[3] - bbox[1];

  return { image, bbox, pixelWidth, pixelHeight, bboxWidth, bboxHeight };
}
