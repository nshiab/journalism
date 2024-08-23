/**
 * Computes the Z-Score for a given variable in an array of objects. By default, the function adds a new key `zScore` in each object, but you can change it by passing this option as the last parameter `{ newKey: "myNewKey" }`.
 *
 * @example Basic example
 * ```js
 * // Let's say we have a data set like this.
 * const data = [
 *   { grade: 1 },
 *   { grade: 4 },
 *   { grade: 7 },
 *   { grade: 2 },
 *   { grade: 6 },
 * ]
 *
 * // We compute the Z-Score for the variable grade.
 * addZScore(data, "grade")
 *
 * // We now have the key zScore in the data.
 * // [
 * //  { grade: 1, zScore: -1.3155870289605438 },
 * //  { grade: 4, zScore: 0 },
 * //  { grade: 7, zScore: 1.3155870289605438 },
 * //  { grade: 2, zScore: -0.8770580193070292 },
 * //  { grade: 6, zScore: 0.8770580193070292 },
 * // ]
 *
 * // If you want a specific new key, use the options.
 * addZScore(data, "grade", { newKey: "zScoreGrade"})
 *
 * // We now have the key zScoreGrade in the data.
 * // [
 * //  { grade: 1, zScoreGrade: -1.3155870289605438 },
 * //  { grade: 4, zScoreGrade: 0 },
 * //  { grade: 7, zScoreGrade: 1.3155870289605438 },
 * //  { grade: 2, zScoreGrade: -0.8770580193070292 },
 * //  { grade: 6, zScoreGrade: 0.8770580193070292 },
 * // ]
 * ```
 * @category Statistics
 */

export default function addZScore(
    data: Record<string, unknown>[],
    variable: string,
    options: { newKey?: string } = {}
) {
    // Average
    let sum = 0
    for (let i = 0; i < data.length; i++) {
        const val = data[i][variable]
        if (typeof val !== "number") {
            throw new Error(`This is not a number: ${data[i][variable]}`)
        }
        sum += val
    }
    const mean = sum / data.length

    // Standard deviation
    const sqdDistFromMean = data
        .map((d) => Math.pow((d[variable] as number) - mean, 2)) // we checked the type above
        .reduce((acc, curr) => (acc += curr), 0)

    const stdDev = Math.sqrt(sqdDistFromMean / data.length)

    // Z-Score
    const newKey =
        typeof options.newKey === "string" ? options.newKey : "zScore"
    for (let i = 0; i < data.length; i++) {
        data[i][newKey] = ((data[i][variable] as number) - mean) / stdDev // we checked the type above
    }

    return data
}
