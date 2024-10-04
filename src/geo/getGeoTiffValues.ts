import type { GeoTIFFImage, TypedArray } from "geotiff"

/**
 * Extracts values at specific lat/lon coordinates from a geotiff. Works with the values returned by the getGeoTiffDetails function.
 *
 * @example
 * Basic usage
 * ```js
 * const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
 * const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
 * ```
 *
 * @param lat - The latitude coordinate.
 * @param lon - The longitude coordinate.
 * @param geoTiffDetails - The details of the GeoTIFF file, computed with the getGeoTiffDetails function.
 *
 * @category Geo
 */
export default async function getGeoTiffValues(
    lat: number,
    lon: number,
    geoTiffDetails: {
        image: GeoTIFFImage
        bbox: number[]
        pixelWidth: number
        pixelHeight: number
        bboxWidth: number
        bboxHeight: number
    }
): Promise<number | TypedArray> {
    const { image, bbox, pixelWidth, pixelHeight, bboxWidth, bboxHeight } =
        geoTiffDetails

    const widthPct = (lon - bbox[0]) / bboxWidth
    const heightPct = (lat - bbox[1]) / bboxHeight
    const xPx = Math.floor(pixelWidth * widthPct)
    const yPx = Math.floor(pixelHeight * (1 - heightPct))
    const window = [xPx, yPx, xPx + 1, yPx + 1]
    const data = await image.readRasters({ window })

    return data[0]
}
