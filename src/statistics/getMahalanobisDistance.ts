/**
 * Computes the Mahalanobis distance between two data points (`x1` and `x2`) given the inverted covariance matrix of the dataset. The Mahalanobis distance is a measure of the distance between a point and a distribution. It is a unitless measure. This function can handle data points of any dimension (i.e., with more than 2 coordinates).
 *
 * This function requires the inverted covariance matrix of your dataset, which can be computed using the `getCovarianceMatrix` function with the `invert: true` option.
 *
 * @param x1 - The first data point (an array of numbers).
 * @param x2 - The second data point (an array of numbers).
 * @param invCovMatrix - The inverted covariance matrix of the dataset (a 2D array of numbers).
 * @returns The Mahalanobis distance between `x1` and `x2`.
 *
 * @example
 * ```ts
 * // Calculate the Mahalanobis distance between two simple 2D points.
 * // Note: In a real-world scenario, `invCovMatrix` would be derived from a dataset.
 * const x1 = [1, 2];
 * const x2 = [3, 4];
 * const invCovMatrix = [
 *   [1, 0],
 *   [0, 1]
 * ];
 * const distance = getMahalanobisDistance(x1, x2, invCovMatrix);
 * console.log(`Mahalanobis Distance: ${distance}`);
 * ```
 * @example
 * ```ts
 * // Calculate the Mahalanobis distance for 3D points.
 * const p1 = [1, 2, 3];
 * const p2 = [4, 5, 6];
 * const invCovMatrix3D = [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1]
 * ];
 * const distance3D = getMahalanobisDistance(p1, p2, invCovMatrix3D);
 * console.log(`Mahalanobis Distance (3D): ${distance3D}`);
 * ```
 * @example
 * ```ts
 * // Demonstrate how `getMahalanobisDistance` would typically be used with `getCovarianceMatrix`.
 * import { getCovarianceMatrix, getMahalanobisDistance} from "journalism";
 *
 * const dataPoints = [
 *   [1, 10],
 *   [2, 12],
 *   [3, 11],
 *   [4, 15],
 *   [5, 13]
 * ];
 * const point1 = [2, 12];
 * const point2 = [4, 15];
 *
 * const covMatrix = getCovarianceMatrix(dataPoints, { invert: true });
 * const mahalanobisDist = getMahalanobisDistance(point1, point2, covMatrix);
 * console.log(`Mahalanobis Distance between point1 and point2: ${mahalanobisDist}`);
 * ```
 * @category Statistics
 */

export default function getMahalanobisDistance(
  x1: number[],
  x2: number[],
  invCovMatrix: number[][],
): number {
  if (x1.length !== x2.length || x1.length !== invCovMatrix.length) {
    throw new Error("Dimensions mismatch");
  }

  const diff = x1.map((val, i) => val - x2[i]);
  let sum = 0;

  for (let i = 0; i < diff.length; i++) {
    for (let j = 0; j < diff.length; j++) {
      sum += diff[i] * invCovMatrix[i][j] * diff[j];
    }
  }

  return Math.sqrt(sum);
}
