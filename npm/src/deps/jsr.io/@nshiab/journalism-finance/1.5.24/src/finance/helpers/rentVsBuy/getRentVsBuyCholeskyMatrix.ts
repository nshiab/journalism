import {
  getCholeskyMatrix,
  getCorrelationMatrix,
} from "../../../../../../journalism-statistics/1.5.2/src/index.js";

/**
 * Valid stochastic variable names used in the Rent vs Buy Monte Carlo simulation.
 */
export type StochasticVariable =
  | "employmentIncome"
  | "market"
  | "rent"
  | "ownerInsurance"
  | "renterInsurance"
  | "maintenance"
  | "propertyTax"
  | "condoFee"
  | "appreciation"
  | "sellingFixedFees"
  | "fiveYearInterestRates"
  | "fourYearInterestRates"
  | "threeYearInterestRates"
  | "twoYearInterestRates"
  | "oneYearInterestRates"
  | "variableInterestRates";

/**
 * Historical data object representing the 16 stochastic variables.
 * Each variable must map to an array of equal-length historical values.
 */
export type StochasticData = Record<StochasticVariable, number[]>;

/**
 * Generates a Cholesky decomposition matrix from historical variable data,
 * formatted specifically for the `simulateRentVsBuyMonteCarlo` function.
 *
 * This helper calculates the covariance matrix of the provided data arrays,
 * normalizes it into a correlation matrix, and computes the Cholesky decomposition,
 * mapping variables internally to the correct 16x16 matrix indices.
 *
 * If no data object is provided, it returns the Cholesky decomposition of an
 * identity matrix (which results in independent, uncorrelated paths).
 *
 * @param data - An object containing arrays of equal-length historical values for all 16 variables.
 * @param options - Optional configuration.
 * @param options.jitter - A tiny positive value (e.g., 1e-9) added to the diagonal of the correlation matrix to force positive-definiteness. This can be useful if the decomposition fails due to numerical precision issues.
 *
 * @example
 * ```ts
 * // Using an identity matrix (no correlation)
 * const choleskyMatrixId = getRentVsBuyCholeskyMatrix();
 *
 * // Using historical data to capture true economic correlations
 * const choleskyMatrixCorrelated = getRentVsBuyCholeskyMatrix({
 *   employmentIncome: [75000, 76000, 78000, ...],
 *   market: [0.05, 0.07, -0.02, ...],
 *   rent: [1500, 1550, 1600, ...],
 *   // ... and the remaining 13 variables
 * });
 *
 * // Using jitter to handle numerical precision issues
 * const choleskyMatrixWithJitter = getRentVsBuyCholeskyMatrix(historicalData, { jitter: 1e-9 });
 *
 * const results = simulateRentVsBuyMonteCarlo({
 *   // ... other parameters
 *   choleskyMatrix: choleskyMatrixCorrelated,
 * });
 * ```
 */
export default function getRentVsBuyCholeskyMatrix(
  data?: StochasticData,
  options: { jitter?: number } = {},
): number[][] {
  const numVars = 16;

  if (!data) {
    const identityMatrix = Array.from(
      { length: numVars },
      (_, i) =>
        Array.from(
          { length: numVars },
          (_, j) => (i === j ? 1 : 0),
        ) as number[],
    );
    return getCholeskyMatrix(identityMatrix, options.jitter);
  }

  const arrays = [
    data.employmentIncome,
    data.market,
    data.rent,
    data.ownerInsurance,
    data.renterInsurance,
    data.maintenance,
    data.propertyTax,
    data.condoFee,
    data.appreciation,
    data.sellingFixedFees,
    data.fiveYearInterestRates,
    data.fourYearInterestRates,
    data.threeYearInterestRates,
    data.twoYearInterestRates,
    data.oneYearInterestRates,
    data.variableInterestRates,
  ];

  const length = arrays[0].length;
  if (length === 0) {
    throw new Error("Historical data arrays must contain at least one value.");
  }
  for (let i = 1; i < numVars; i++) {
    if (arrays[i].length !== length) {
      throw new Error(
        "All historical data arrays must have the exact same length.",
      );
    }
  }

  // Transpose to observations: rows = time, cols = variables
  const observations: number[][] = new Array(length);
  for (let i = 0; i < length; i++) {
    observations[i] = new Array(numVars);
    for (let v = 0; v < numVars; v++) {
      observations[i][v] = arrays[v][i];
    }
  }

  const corMatrix = getCorrelationMatrix(observations);

  return getCholeskyMatrix(corMatrix, options.jitter);
}
