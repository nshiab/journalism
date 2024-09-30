import { fromFile } from "geotiff";
import type { GeoTIFFImage } from "geotiff";

/**
 * Extracts detailed informations from a geoTIFF that can be used with the getGeoTiffValues function. Just for NodeJS and similar runtimes.
 *
 * ```js
 * const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
 * const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
 * ```
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
