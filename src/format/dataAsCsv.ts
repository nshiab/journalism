import { csvFormat } from "d3-dsv"

/**
 * Convert an array of objects into CSV format.
 *
 * @example
 * Basic usage
 * ```js
 * const data = [
 *  { firstName: "Graeme", lastName: "Bruce" },
 *  { firstName: "Nael", lastName: "Shiab" },
 * ]
 *
 * const csv = dataAsCsv(data)
 * // Returns "firstName,lastName\nGraeme,Bruce\nNael,Shiab"
 * ```
 *
 * @param arrayOfObjects - The array of objects to be converted into CSV format.
 *
 * @category Formatting
 */
export default function dataAsCsv(
    arrayOfObjects: { [key: string]: unknown }[]
): string {
    return csvFormat(arrayOfObjects)
}
