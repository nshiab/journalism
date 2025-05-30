import { fromFile } from "npm:geotiff@2";
import type { GeoTIFFImage } from "npm:geotiff@2";

/**
 * Extracts detailed informations from a geoTIFF that can be used with the getGeoTiffValues function. Just for NodeJS and similar runtimes.
 *
 * @example
 * Basic usage
 * ```js
 * const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
 * const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
 * ```
 *
 * @param path - The path to the geoTIFF file.
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
