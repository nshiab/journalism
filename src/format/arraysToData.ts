/**
 * Converts an object containing arrays into an array of objects, where each object corresponds to an index in the arrays.
 *
 * @example
 * Basic usage
 * ```ts
 * const input = {
 *   keyA: ["a", "b", "c"],
 *   keyB: [1, 2, 3],
 * };
 * const result = arraysToData(input);
 * console.log(result);
 * // Output:
 * // [
 * //   { keyA: "a", keyB: 1 },
 * //   { keyA: "b", keyB: 2 },
 * //   { keyA: "c", keyB: 3 },
 * // ]
 * ```
 *
 * @param data - An object where each key maps to an array of values.
 *
 * @category Formatting
 */

export default function arraysToData(data: {
  [key: string]: unknown[];
}): { [key: string]: unknown }[] {
  const keys = Object.keys(data);
  const nbItems = data[keys[0]].length;

  const newData = [];
  for (let i = 0; i < nbItems; i++) {
    const newItem: { [key: string]: unknown } = {};
    for (const key of keys) {
      newItem[key] = data[key][i];
    }
    newData.push(newItem);
  }

  return newData;
}
