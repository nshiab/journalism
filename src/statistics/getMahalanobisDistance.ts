/**
 * Computes the Mahalanobis distance. You first need to compute the inverted covariance matrix of your data with `getCovarianceMatrix`.
 *
 * @example
 * Basic usage
 * ```js
 * const x1 = [1, 2];
 * const x2 = [3, 4];
 * const invCovMatrix = [
 *   [1, 0],
 *   [0, 1]
 * ];
 * const distance = getMahalanobisDistance(x1, x2, invCovMatrix);
 * ```
 *
 * @param x1 - The first data point
 * @param x2 - The second data point
 * @param invCovMatrix - The inverted covariance matrix
 *
 * @category Statistics
 */
export default function getMahalanobisDistance(
    x1: number[],
    x2: number[],
    invCovMatrix: number[][]
): number {
    if (x1.length !== x2.length || x1.length !== invCovMatrix.length) {
        throw new Error("Dimensions mismatch")
    }

    const diff = x1.map((val, i) => val - x2[i])
    let sum = 0

    for (let i = 0; i < diff.length; i++) {
        for (let j = 0; j < diff.length; j++) {
            sum += diff[i] * invCovMatrix[i][j] * diff[j]
        }
    }

    return Math.sqrt(sum)
}
