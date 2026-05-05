import { WINNER_CATEGORIES } from "./simulateRentVsBuyMonteCarlo.js";
import type {
  ColumnarResult,
  WinnersColumnar,
} from "./simulateRentVsBuyMonteCarlo.js";

export type { ColumnarResult, WinnersColumnar };

/**
 * Decodes a columnar `monthlyIterations` result back into a flat object array.
 *
 * **⚠️ Memory Warning:** This function can allocate millions of small objects during large simulations.
 * Proceed with caution or use pagination/UI virtualization if rendering these arrays to the DOM.
 *
 * Keys are `"category|group|variable"`. Each `Float64Array` has size `iterations × months`.
 * Access: `data[key][iteration * cols + monthIndex]`.
 *
 * Records where `amount === 0` are omitted from the output, matching the zero-filtering
 * applied by the `onRecord` callback during data collection.
 */
export function decodeMonteCarloMonthlyIterations(
  c: ColumnarResult,
): {
  iteration: number;
  category: string;
  group: string;
  variable: string;
  monthIndex: number;
  amount: number;
}[] {
  const { data, rows, cols, keys } = c;
  const result: {
    iteration: number;
    category: string;
    group: string;
    variable: string;
    monthIndex: number;
    amount: number;
  }[] = new Array(keys.length * rows * cols);
  let idx = 0;
  for (const key of keys) {
    const [category, group, variable] = key.split("|");
    const arr = data[key];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const amount = arr[row * cols + col];
        if (amount !== 0) {
          result[idx++] = {
            iteration: row,
            category,
            group,
            variable,
            monthIndex: col,
            amount,
          };
        }
      }
    }
  }
  result.length = idx;
  return result;
}

/**
 * Decodes a columnar `values` result back into the original object-array shape.
 *
 * Keys are variable names. Each `Float64Array` has size `iterations × months`.
 */
export function decodeMonteCarloValues(
  c: ColumnarResult,
): {
  iteration: number;
  variable: string;
  value: number;
  monthIndex: number;
}[] {
  const { data, rows, cols, keys } = c;
  const result: {
    iteration: number;
    variable: string;
    value: number;
    monthIndex: number;
  }[] = new Array(keys.length * rows * cols);
  let idx = 0;
  for (const variable of keys) {
    const arr = data[variable];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result[idx++] = {
          iteration: row,
          variable,
          value: arr[row * cols + col],
          monthIndex: col,
        };
      }
    }
  }
  return result;
}

/**
 * Decodes a columnar `monthlyQuantiles` result back into a flat record array.
 *
 * Keys are `"category|group|variable"`. Layout: `data[key][qIdx * cols + monthIndex]`
 * where `rows` = number of quantile levels and `cols` = number of months.
 *
 * @param c - The `ColumnarResult` returned as `monthlyQuantiles` by `simulateRentVsBuyMonteCarlo`.
 * @param quantiles - The same quantile levels passed to `options.monthlyQuantiles` (e.g. `[0, 0.5, 1]`).
 */
export function decodeMonteCarloMonthlyQuantiles(
  c: ColumnarResult,
  quantiles: number[],
): {
  category: string;
  group: string;
  variable: string;
  monthIndex: number;
  quantile: number;
  value: number;
}[] {
  const { data, cols, keys } = c;
  const result: {
    category: string;
    group: string;
    variable: string;
    monthIndex: number;
    quantile: number;
    value: number;
  }[] = new Array(keys.length * quantiles.length * cols);
  let idx = 0;
  for (const key of keys) {
    const [category, group, variable] = key.split("|");
    const arr = data[key];
    for (let qi = 0; qi < quantiles.length; qi++) {
      for (let mi = 0; mi < cols; mi++) {
        result[idx++] = {
          category,
          group,
          variable,
          monthIndex: mi,
          quantile: quantiles[qi],
          value: arr[qi * cols + mi],
        };
      }
    }
  }
  return result;
}

/**
 * Decodes a columnar `winners` result back into the original object-array shape.
 *
 * `category` bytes map to category names via `WINNER_CATEGORIES`
 * (0 = "renter", 1 = "buyerFixed", 2 = "buyerVariable").
 * Records are returned in iteration order (row 0 = iteration 0).
 */
export function decodeMonteCarloWinners(
  w: WinnersColumnar,
): {
  iteration: number;
  monthIndex: number;
  amount: number;
  category: "renter" | "buyerFixed" | "buyerVariable";
}[] {
  const length = w.monthIndex.length;
  const result: {
    iteration: number;
    monthIndex: number;
    amount: number;
    category: "renter" | "buyerFixed" | "buyerVariable";
  }[] = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = {
      iteration: i,
      monthIndex: w.monthIndex[i],
      amount: w.amount[i],
      category: WINNER_CATEGORIES[w.category[i]] as
        | "renter"
        | "buyerFixed"
        | "buyerVariable",
    };
  }
  return result;
}
