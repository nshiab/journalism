/**
 * Converts an array of objects into an object of arrays.
 *
 * @example
 * Basic usage
 * ```ts
 * const data = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 35 }
 * ];
 * const result = dataToArrays(data);
 * console.log(result);
 * // Output:
 * // {
 * //   name: ['Alice', 'Bob', 'Charlie'],
 * //   age: [25, 30, 35]
 * // }
 * ```
 *
 * @param data - An array of objects where each object has the same set of keys.
 *
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
