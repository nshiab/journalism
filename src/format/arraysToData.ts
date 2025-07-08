/**
 * Transforms an object of arrays into an array of objects. This function is useful for converting data from a columnar format to a row-based format, which is common in data processing and visualization.
 *
 * It is assumed that all arrays in the input object have the same length.
 *
 * @param data An object where each key is a string and its corresponding value is an array of any type. All arrays are expected to have the same length.
 *
 * @returns An array of objects, where each object is a "row" of data created by combining values from the input arrays at the same index.
 *
 * @example
 * // Basic usage with mixed data types
 * const columnarData = {
 *   name: ['Alice', 'Bob', 'Charlie'],
 *   age: [30, 25, 35],
 *   city: ['New York', 'London', 'Paris']
 * };
 *
 * const rowData = arraysToData(columnarData);
 *
 * console.log(rowData);
 * // Expected output:
 * // [
 * //   { name: 'Alice', age: 30, city: 'New York' },
 * //   { name: 'Bob', age: 25, city: 'London' },
 * //   { name: 'Charlie', age: 35, city: 'Paris' }
 * // ]
 *
 * @example
 * // Usage with numerical data for charting
 * const chartData = {
 *   x: [1, 2, 3, 4, 5],
 *   y: [10, 20, 15, 25, 30]
 * };
 *
 * const plotPoints = arraysToData(chartData);
 *
 * console.log(plotPoints);
 * // Expected output:
 * // [
 * //   { x: 1, y: 10 },
 * //   { x: 2, y: 20 },
 * //   { x: 3, y: 15 },
 * //   { x: 4, y: 25 },
 * //   { x: 5, y: 30 }
 * // ]
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
