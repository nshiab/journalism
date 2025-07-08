import type { GeoTIFFImage, TypedArray } from "npm:geotiff@2";

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
export default async function getGeoTiffValues(
  lat: number,
  lon: number,
  geoTiffDetails: {
    image: GeoTIFFImage;
    bbox: number[];
    pixelWidth: number;
    pixelHeight: number;
    bboxWidth: number;
    bboxHeight: number;
  },
): Promise<number | TypedArray> {
  const { image, bbox, pixelWidth, pixelHeight, bboxWidth, bboxHeight } =
    geoTiffDetails;

  const widthPct = (lon - bbox[0]) / bboxWidth;
  const heightPct = (lat - bbox[1]) / bboxHeight;
  const xPx = Math.floor(pixelWidth * widthPct);
  const yPx = Math.floor(pixelHeight * (1 - heightPct));
  const window = [xPx, yPx, xPx + 1, yPx + 1];
  const data = await image.readRasters({ window });

  return data[0];
}
