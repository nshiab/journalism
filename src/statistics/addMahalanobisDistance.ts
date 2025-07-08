import getCovarianceMatrix from "./getCovarianceMatrix.ts";
import getMahalanobisDistance from "./getMahalanobisDistance.ts";

/**
 * Calculates the Mahalanobis distance for each object in an array relative to a specified origin point.
 *
 * The function enriches the input `data` array by adding a `mahaDist` property to each object, representing its Mahalanobis distance from the `origin`. The dimensions for the calculation are determined by the keys in the `origin` object.
 *
 * Optionally, you can also compute a `similarity` score, which is a normalized value between 0 and 1, where 1 indicates that the point is identical to the origin. To improve performance on large datasets, you can provide a pre-computed inverted covariance matrix.
 *
 * @param origin - An object defining the reference point for the distance calculation. The keys of this object represent the variables (dimensions) to be used, and the values are their corresponding coordinates.
 * @param data - An array of objects to be analyzed. Each object should contain the same keys as the `origin` object, and their values for these keys should be numbers.
 * @param options - Optional parameters to customize the function's behavior.
 * @param options.similarity - If `true`, a `similarity` property will be added to each object in the `data` array. The similarity is calculated as `1 - (mahaDist / maxMahaDist)`, providing an intuitive measure of closeness to the origin.
 * @param options.matrix - A pre-computed inverted covariance matrix. Providing this can significantly speed up calculations, as it avoids re-computing the matrix for each call. This matrix should be obtained from `getCovarianceMatrix` with `invert: true`.
 * @returns The input `data` array, with `mahaDist` (and optionally `similarity`) properties added to each object.
 * @throws {Error} If the dimensions of the data points or the provided matrix do not match, or if `getCovarianceMatrix` throws an error (e.g., due to non-numeric data).
 *
 * @example
 * ```ts
 * // Basic usage with a dataset of wines
 * const wines = [
 *   { 'fixed acidity': 6.5, 'alcohol': 11.0 },
 *   { 'fixed acidity': 7.1, 'alcohol': 12.2 },
 *   { 'fixed acidity': 6.3, 'alcohol': 10.5 },
 *   { 'fixed acidity': 7.2, 'alcohol': 11.3 }
 * ];
 *
 * // Define the ideal wine profile (our origin)
 * const idealWine = { 'fixed acidity': 7.2, 'alcohol': 11.3 };
 *
 * // Calculate the Mahalanobis distance for each wine
 * addMahalanobisDistance(idealWine, wines);
 *
 * // Sort the wines by their distance to the ideal profile
 * wines.sort((a, b) => a.mahaDist - b.mahaDist);
 *
 * console.log(wines);
 * // Expected output:
 * // [
 * //   { 'fixed acidity': 7.2, 'alcohol': 11.3, mahaDist: 0 },
 * //   { 'fixed acidity': 7.1, 'alcohol': 12.2, mahaDist: 0.939 },
 * //   { 'fixed acidity': 6.5, 'alcohol': 11.0, mahaDist: 1.263 },
 * //   { 'fixed acidity': 6.3, 'alcohol': 10.5, mahaDist: 2.079 }
 * // ]
 * ```
 * @example
 * ```ts
 * // Usage with the similarity option
 * addMahalanobisDistance(idealWine, wines, { similarity: true });
 *
 * console.log(wines);
 * // Expected output with similarity scores:
 * // [
 * //   { 'fixed acidity': 7.2, 'alcohol': 11.3, mahaDist: 0, similarity: 1 },
 * //   { 'fixed acidity': 7.1, 'alcohol': 12.2, mahaDist: 0.939, similarity: 0.548 },
 * //   { 'fixed acidity': 6.5, 'alcohol': 11.0, mahaDist: 1.263, similarity: 0.392 },
 * //   { 'fixed acidity': 6.3, 'alcohol': 10.5, mahaDist: 2.079, similarity: 0 }
 * // ]
 * ```
 * @category Statistics
 */

export default function addMahalanobisDistance(
  origin: Record<string, number>,
  data: Record<string, unknown>[],
  options: { similarity?: boolean; matrix?: number[][] } = {},
): Record<string, unknown>[] {
  const variables = Object.keys(origin);
  const originArray = variables.map((v) => origin[v]);
  const dataArray = data.map((d) => variables.map((v) => d[v]));

  const invertedCovarianceMatrix = Array.isArray(options.matrix)
    ? options.matrix
    : getCovarianceMatrix(
      dataArray as number[][], // getCovarianceMatrix will check the types
      {
        invert: true,
      },
    );

  data.forEach(
    (d) => (d.mahaDist = getMahalanobisDistance(
      originArray,
      variables.map((v) => d[v] as number), // types checked in getCovarianceMatrix
      invertedCovarianceMatrix,
    )),
  );

  if (options.similarity) {
    const maxDist = Math.max(...data.map((d) => d.mahaDist as number));
    data.forEach(
      (d) => (d.similarity = 1 - (d.mahaDist as number) / maxDist),
    );
  }

  return data;
}
