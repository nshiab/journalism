/**
 * Returns an array of objects from an object made of arrays.
 *
 * For example, this data...
 * ```ts
 * {
 *  keyA: ["a", "b", "c"],
 *  keyB: [1, 2, 3],
 * }
 * ```
 * ...would be returned like this.
 * ```ts
 * [
 *  { keyA: "a", keyB: 1 },
 *  { keyA: "b", keyB: 2 },
 *  { keyA: "c", keyB: 3 },
 * ]
 * ```
 *
 * @category Formatting
 */

export default function arraysToData(data: {
    [key: string]: unknown[]
}): { [key: string]: unknown }[] {
    const keys = Object.keys(data)
    const nbItems = data[keys[0]].length

    const newData = []
    for (let i = 0; i < nbItems; i++) {
        const newItem: { [key: string]: unknown } = {}
        for (const key of keys) {
            newItem[key] = data[key][i]
        }
        newData.push(newItem)
    }

    return newData
}
