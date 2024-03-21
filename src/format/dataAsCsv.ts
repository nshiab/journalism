import { csvFormat } from "d3-dsv"

/**
 * Convert an array of objects into CSV format.
 *
 * ```js
 * const data = [
 *  { firstName: "Graeme", lastName: "Bruce" },
 *  { firstName: "Nael", lastName: "Shiab" },
 * ]
 *
 * const csv = dataAsCsv(data)
 * // Returns "firstName,lastName\nGraeme,Bruce\nNael,Shiab"
 * ```
 * @category Formatting
 */
export default function dataAsCsv(
    arrayOfObjects: { [key: string]: unknown }[]
) {
    return csvFormat(arrayOfObjects)
}
