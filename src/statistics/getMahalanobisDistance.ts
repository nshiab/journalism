/**
 * Computes the Mahalanobis distance. You first need to compute the inverted covariance matrix of your data.
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
