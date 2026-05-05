/**
 * Multiplies a lower triangular Cholesky matrix (L) by a vector of independent standard normal random variables (Z).
 * @param L - The lower triangular matrix.
 * @param Z - An array of independent standard normal random variables.
 * @returns An array of correlated random variables.
 */
export default function getCorrelatedShocks(
  L: number[][],
  Z: number[],
): number[] {
  const n = L.length;
  if (Z.length !== n) {
    throw new Error("L and Z must have the same length.");
  }
  const X = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j <= i; j++) {
      sum += L[i][j] * Z[j];
    }
    X[i] = sum;
  }
  return X;
}
