/**
 * Returns an object made of arrays from an array of objects.
 *
 * For example, this data...
 * ```ts
 * [
 *  { keyA: "a", keyB: 1 },
 *  { keyA: "b", keyB: 2 },
 *  { keyA: "c", keyB: 3 },
 * ]
 * ```
 * ...would be returned like this.
 * ```ts
 * {
 *  keyA: ["a", "b", "c"],
 *  keyB: [1, 2, 3],
 * }
 * ```
 *
 * @category Formatting
 */

export default function dataToArrays(data: { [key: string]: unknown }[]) {
    const newData: { [key: string]: unknown[] } = {}

    const keys = Object.keys(data[0])

    for (const key of keys) {
        newData[key] = data.map((d) => d[key])
    }

    return newData
}
