/**
 * Performs Cholesky Decomposition on a symmetric, positive-definite covariance matrix.
 * @param matrix - A square, symmetric, positive-definite covariance matrix.
 * @param jitter - A tiny positive value (e.g., 1e-9) added to the diagonal to force positive-definiteness.
 * @returns A lower triangular matrix L.
 */
export default function getCholeskyMatrix(matrix: number[][], jitter?: number): number[][];
//# sourceMappingURL=getCholeskyMatrix.d.ts.map