/**
 * Transforms an array of objects into an object of arrays. This function is the inverse of `arraysToData` and is useful for converting data from a row-based format to a columnar format.
 *
 * @param data An array of objects. Each object is expected to have the same set of keys.
 *
 * @returns An object where each key maps to an array of values, effectively representing the data in a columnar format.
 *
 * @example
 * ```ts
 * // Basic usage with a simple dataset
 * const rowData = [
 *   { name: 'Alice', age: 30, city: 'New York' },
 *   { name: 'Bob', age: 25, city: 'London' },
 *   { name: 'Charlie', age: 35, city: 'Paris' }
 * ];
 *
 * const columnarData = dataToArrays(rowData);
 *
 * console.log(columnarData);
 * // Expected output:
 * // {
 * //   name: ['Alice', 'Bob', 'Charlie'],
 * //   age: [30, 25, 35],
 * //   city: ['New York', 'London', 'Paris']
 * // }
 * ```
 * @example
 * ```ts
 * // Preparing data for statistical analysis
 * const measurements = [
 *   { id: 1, temp: 20, humidity: 60 },
 *   { id: 2, temp: 22, humidity: 65 },
 *   { id: 3, temp: 18, humidity: 55 }
 * ];
 *
 * const separatedVariables = dataToArrays(measurements);
 *
 * console.log(separatedVariables);
 * // Expected output:
 * // {
 * //   id: [1, 2, 3],
 * //   temp: [20, 22, 18],
 * //   humidity: [60, 65, 55]
 * // }
 * ```
 * @category Formatting
 */

export default function dataToArrays(data: { [key: string]: unknown }[]): {
  [key: string]: unknown[];
} {
  const newData: { [key: string]: unknown[] } = {};

  const keys = Object.keys(data[0]);

  for (const key of keys) {
    newData[key] = data.map((d) => d[key]);
  }

  return newData;
}
