import invertMatrix from "./invertMatrix.ts";

/**
 * Computes the covariance matrix for a given dataset. The covariance matrix is a square matrix that describes the covariance between each pair of variables in a dataset.
 *
 * The function takes a 2D array (matrix) as input, where each inner array represents a data point and each element within the inner array represents a variable. It calculates the covariance between all pairs of variables.
 *
 * Optionally, you can choose to invert the computed covariance matrix by setting the `invert` option to `true`. The inverse covariance matrix is often used in statistical applications, particularly in the calculation of Mahalanobis distance.
 *
 * @param data - A 2D array of numbers representing the dataset. Each inner array is a data point, and each element is a variable.
 * @param options - Optional settings for the covariance matrix computation.
 * @param options.invert - If `true`, the function will return the inverse of the computed covariance matrix. Defaults to `false`.
 * @returns A 2D array representing the covariance matrix. If `options.invert` is `true`, the inverse covariance matrix is returned.
 * @throws {Error} If any element in the input `data` is not a number.
 *
 * @example
 * // Basic usage: Compute the covariance matrix for a 2x2 dataset.
 * // This example uses a subset of the wine-quality dataset.
 * const twoVariables = [
 *   [6.5, 11],
 *   [7.1, 12.2],
 *   [6.3, 10.5]
 * ];
 * const matrix2x2 = getCovarianceMatrix(twoVariables);
 * console.log(matrix2x2);
 * // Expected output (approximately):
 * // [
 * //   [0.7119681970550005, -0.12550719251309772],
 * //   [-0.12550719251309772, 1.514117788841716]
 * // ]
 *
 * @example
 * // Compute the inverse covariance matrix for a 2x2 dataset.
 * const invertedMatrix2x2 = getCovarianceMatrix(twoVariables, { invert: true });
 * console.log(invertedMatrix2x2);
 * // Expected output (approximately):
 * // [
 * //   [1.4253851985430073, 0.1181520327131952],
 * //   [0.11815203271319519, 0.6702443742450724]
 * // ]
 *
 * @example
 * // Basic usage: Compute the covariance matrix for a 3x3 dataset.
 * const threeVariables = [
 *   [6.5, 1.9, 11],
 *   [7.1, 2.2, 12.2],
 *   [6.3, 2.1, 10.5]
 * ];
 * const matrix3x3 = getCovarianceMatrix(threeVariables);
 * console.log(matrix3x3);
 * // Expected output (approximately):
 * // [
 * //   [0.7119681970550005, 0.3809440223475775, -0.12550719251309772],
 * //   [0.3809440223475775, 25.72051786341322, -2.8121660685891356],
 * //   [-0.12550719251309772, -2.8121660685891356, 1.514117788841716]
 * // ]
 *
 * @example
 * // Compute the inverse covariance matrix for a 3x3 dataset.
 * const invertedMatrix3x3 = getCovarianceMatrix(threeVariables, { invert: true });
 * console.log(invertedMatrix3x3);
 * // Expected output (approximately):
 * // [
 * //   [1.4275549391155293, -0.01029636303437083, 0.09920848359253127],
 * //   [-0.010296363034370827, 0.048860722373056165, 0.08989538259823723],
 * //   [0.09920848359253126, 0.08989538259823725, 0.835636521966158]
 * // ]
 *
 * @example
 * // Basic usage: Compute the covariance matrix for a 4x4 dataset.
 * const fourVariables = [
 *   [6.5, 1.9, 0.99],
 *   [7.1, 2.2, 0.98],
 *   [6.3, 2.1, 0.97]
 * ];
 * const matrix4x4 = getCovarianceMatrix(fourVariables);
 * console.log(matrix4x4);
 * // Expected output (approximately):
 * // [
 * //   [0.7119681970550005, 0.3809440223475775, 0.0006695405312093783, -0.12550719251309772],
 * //   [0.3809440223475775, 25.72051786341322, 0.012724566900994994, -2.8121660685891356],
 * //   [0.0006695405312093783, 0.012724566900994994, 0.000008943697841212739, -0.00287084411696803],
 * //   [-0.12550719251309772, -2.8121660685891356, -0.00287084411696803, 1.514117788841716]
 * // ]
 *
 * @example
 * // Compute the inverse covariance matrix for a 4x4 dataset.
 * const invertedMatrix4x4 = getCovarianceMatrix(fourVariables, { invert: true });
 * console.log(invertedMatrix4x4);
 * // Expected output (approximately):
 * // [
 * //   [1.890366500801349, 0.29548258210193046, -857.0948891407204, -0.9196015969508056],
 * //   [0.29548258210193046, 0.2508884395460819, -566.2813827046937, -0.583230998661561],
 * //   [-857.0948891407204, -566.2813827046937, 1587280.2449344082, 1886.7655549874191],
 * //   [-0.9196015969508056, -0.583230998661561, 1886.7655549874191, 3.078393760864504]
 * // ]
 *
 * @category Statistics
 */

export default function getCovarianceMatrix(
  data: number[][],
  options: { invert?: boolean } = {},
): number[][] {
  const n = data.length;
  const m = data[0].length;

  // Initialize sums
  const sums: number[] = Array(m).fill(0);
  const squaredSums: number[] = Array(m).fill(0);
  const productSums: number[][] = Array(m)
    .fill(null)
    .map(() => Array(m).fill(0));

  // Calculate sums
  for (let i = 0; i < n; i++) {
    for (let v = 0; v < m; v++) {
      if (typeof data[i][v] !== "number") {
        throw new Error(`This is not a number: ${data[i][v]}`);
      }
      sums[v] += data[i][v];
      squaredSums[v] += data[i][v] * data[i][v];
      for (let w = 0; w < m; w++) {
        productSums[v][w] += data[i][v] * data[i][w];
      }
    }
  }

  // Calculate means
  const means: number[] = sums.map((sum) => sum / n);

  // Initialize covariance matrix
  const covMatrix: number[][] = Array(m)
    .fill(null)
    .map(() => Array(m).fill(0));

  // Calculate covariances
  for (let v = 0; v < m; v++) {
    for (let w = 0; w < m; w++) {
      if (v <= w) {
        const cov = productSums[v][w] / n - means[v] * means[w];
        covMatrix[v][w] = cov;
        if (v !== w) {
          covMatrix[w][v] = cov; // Matrix is symmetric
        }
      }
    }
  }

  return options.invert ? invertMatrix(covMatrix) : covMatrix;
}
