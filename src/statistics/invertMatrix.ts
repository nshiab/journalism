/**
 * Computes the invert of a square matrix.
 *
 * @param matrix - The square matrix to be inverted.
 *
 * @example
 * Basic usage
 * ```typescript
 * const matrix = [
 *   [1, 2],
 *   [3, 4]
 * ];
 * const inverted = invertMatrix(matrix);
 * ```
 *
 * @category Statistics
 */
export default function invertMatrix(matrix: number[][]): number[][] {
    const n = matrix.length

    // Create an augmented matrix [A|I]
    const augmented: number[][] = matrix.map((row) => [
        ...row,
        ...Array(n).fill(0),
    ])
    for (let i = 0; i < n; i++) {
        augmented[i][n + i] = 1
    }

    // Perform Gauss-Jordan elimination
    for (let i = 0; i < n; i++) {
        // Find pivot
        let maxElement = Math.abs(augmented[i][i])
        let maxRow = i
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmented[k][i]) > maxElement) {
                maxElement = Math.abs(augmented[k][i])
                maxRow = k
            }
        }

        // Swap maximum row with current row
        ;[augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]]

        // Make all rows below this one 0 in current column
        for (let k = i + 1; k < n; k++) {
            const c = -augmented[k][i] / augmented[i][i]
            for (let j = i; j < 2 * n; j++) {
                if (i === j) {
                    augmented[k][j] = 0
                } else {
                    augmented[k][j] += c * augmented[i][j]
                }
            }
        }
    }

    // Solve equation Ax=b using back substitution
    for (let i = n - 1; i >= 0; i--) {
        if (augmented[i][i] === 0) {
            throw new Error("Matrix is singular and cannot be inverted")
        }
        for (let k = i - 1; k >= 0; k--) {
            const c = -augmented[k][i] / augmented[i][i]
            for (let j = 2 * n - 1; j >= i; j--) {
                augmented[k][j] += c * augmented[i][j]
            }
        }
    }

    // Make diagonal elements 1
    for (let i = 0; i < n; i++) {
        const c = 1 / augmented[i][i]
        for (let j = i; j < 2 * n; j++) {
            augmented[i][j] *= c
        }
    }

    // Extract the invert matrix
    return augmented.map((row) => row.slice(n))
}
