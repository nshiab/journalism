import { csvFormat } from "npm:d3-dsv@3";

/**
 * Converts an array of objects into a CSV (Comma-Separated Values) string.
 *
 * The function takes an array of objects and returns a string in CSV format. The first line of the string will be the headers, which are derived from the keys of the first object in the array. Each subsequent line will represent an object, with the values in the same order as the headers.
 *
 * @param data An array of objects to be converted. All objects in the array should have the same keys.
 *
 * @returns A string representing the data in CSV format.
 *
 * @example
 * ```ts
 * // Basic usage with a simple dataset
 * const dataset = [
 *   { make: "Toyota", model: "Camry", year: 2021 },
 *   { make: "Honda", model: "Accord", year: 2022 },
 *   { make: "Ford", model: "Mustang", year: 2020 }
 * ];
 * 
 * const csvString = dataAsCsv(dataset);
 * 
 * console.log(csvString);
 * // Expected output:
 * // "make,model,year\nToyota,Camry,2021\nHonda,Accord,2022\nFord,Mustang,2020"
 * ```
 * @category Formatting
 */
export default function dataAsCsv(
  arrayOfObjects: { [key: string]: unknown }[],
): string {
  return csvFormat(arrayOfObjects);
}
