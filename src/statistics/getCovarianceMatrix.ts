import invertMatrix from "./invertMatrix.js"

/**
 * Computes the covariance matrix, with an option to invert it.
 *
 * @category Statistics
 */

export default function getCovarianceMatrix(
    data: number[][],
    options: { invert?: boolean } = {}
): number[][] {
    const n = data.length
    const m = data[0].length

    // Initialize sums
    const sums: number[] = Array(m).fill(0)
    const squaredSums: number[] = Array(m).fill(0)
    const productSums: number[][] = Array(m)
        .fill(null)
        .map(() => Array(m).fill(0))

    // Calculate sums
    for (let i = 0; i < n; i++) {
        for (let v = 0; v < m; v++) {
            if (typeof data[i][v] !== "number") {
                throw new Error(`This is not a number: ${data[i][v]}`)
            }
            sums[v] += data[i][v]
            squaredSums[v] += data[i][v] * data[i][v]
            for (let w = 0; w < m; w++) {
                productSums[v][w] += data[i][v] * data[i][w]
            }
        }
    }

    // Calculate means
    const means: number[] = sums.map((sum) => sum / n)

    // Initialize covariance matrix
    const covMatrix: number[][] = Array(m)
        .fill(null)
        .map(() => Array(m).fill(0))

    // Calculate covariances
    for (let v = 0; v < m; v++) {
        for (let w = 0; w < m; w++) {
            if (v <= w) {
                const cov = productSums[v][w] / n - means[v] * means[w]
                covMatrix[v][w] = cov
                if (v !== w) {
                    covMatrix[w][v] = cov // Matrix is symmetric
                }
            }
        }
    }

    return options.invert ? invertMatrix(covMatrix) : covMatrix
}
