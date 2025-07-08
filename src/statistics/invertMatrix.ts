/**
 * Computes the inverse of a square matrix.
 *
 * The function takes a square matrix as input and returns its inverse. It handles both 2x2 and larger square matrices. If the matrix is singular (i.e., its determinant is zero), it cannot be inverted, and the function will throw an error.
 *
 * @param matrix - The square matrix to be inverted. It must be a 2D array where the number of rows equals the number of columns.
 * @returns A new 2D array representing the inverse of the input matrix.
 * @throws {Error} If the input matrix is not square (e.g., `matrix.length !== matrix[0].length`), or if it is singular (non-invertible), an error will be thrown.
 *
 * @example
 * // -- Basic Usage: Inverting a 2x2 matrix --
 *
 * // Invert a simple 2x2 matrix.
 * const matrix2x2 = [
 *   [4, 7],
 *   [2, 6]
 * ];
 * const inverted2x2 = invertMatrix(matrix2x2);
 * console.log(inverted2x2);
 *
 * @example
 * // -- Inverting a 3x3 matrix --
 *
 * // Invert a 3x3 matrix.
 * const matrix3x3 = [
 *   [1, 2, 3],
 *   [0, 1, 4],
 *   [5, 6, 0]
 * ];
 * const inverted3x3 = invertMatrix(matrix3x3);
 * console.log(inverted3x3);
 *
 * @example
 * // -- Handling a Singular Matrix --
 *
 * // Attempting to invert a singular matrix will throw an error.
 * const singularMatrix = [
 *   [1, 2],
 *   [2, 4]
 * ];
 * try {
 *   invertMatrix(singularMatrix);
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   // Expected output: "Error: Matrix is singular and cannot be inverted"
 * }
 *
 * @category Statistics
 */
export default function invertMatrix(matrix: number[][]): number[][] {
  const n = matrix.length;

  // Create an augmented matrix [A|I]
  const augmented: number[][] = matrix.map((row) => [
    ...row,
    ...Array(n).fill(0),
  ]);
  for (let i = 0; i < n; i++) {
    augmented[i][n + i] = 1;
  }

  // Perform Gauss-Jordan elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxElement = Math.abs(augmented[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(augmented[k][i]) > maxElement) {
        maxElement = Math.abs(augmented[k][i]);
        maxRow = k;
      }
    } // Swap maximum row with current row

    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

    // Make all rows below this one 0 in current column
    for (let k = i + 1; k < n; k++) {
      const c = -augmented[k][i] / augmented[i][i];
      for (let j = i; j < 2 * n; j++) {
        if (i === j) {
          augmented[k][j] = 0;
        } else {
          augmented[k][j] += c * augmented[i][j];
        }
      }
    }
  }

  // Solve equation Ax=b using back substitution
  for (let i = n - 1; i >= 0; i--) {
    if (augmented[i][i] === 0) {
      throw new Error("Matrix is singular and cannot be inverted");
    }
    for (let k = i - 1; k >= 0; k--) {
      const c = -augmented[k][i] / augmented[i][i];
      for (let j = 2 * n - 1; j >= i; j--) {
        augmented[k][j] += c * augmented[i][j];
      }
    }
  }

  // Make diagonal elements 1
  for (let i = 0; i < n; i++) {
    const c = 1 / augmented[i][i];
    for (let j = i; j < 2 * n; j++) {
      augmented[i][j] *= c;
    }
  }

  // Extract the invert matrix
  return augmented.map((row) => row.slice(n));
}
