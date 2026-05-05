import type { ColumnarResult, WinnersColumnar } from "./simulateRentVsBuyMonteCarlo.js";
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
export declare function decodeMonteCarloMonthlyIterations(c: ColumnarResult): {
    iteration: number;
    category: string;
    group: string;
    variable: string;
    monthIndex: number;
    amount: number;
}[];
/**
 * Decodes a columnar `values` result back into the original object-array shape.
 *
 * Keys are variable names. Each `Float64Array` has size `iterations × months`.
 */
export declare function decodeMonteCarloValues(c: ColumnarResult): {
    iteration: number;
    variable: string;
    value: number;
    monthIndex: number;
}[];
/**
 * Decodes a columnar `monthlyQuantiles` result back into a flat record array.
 *
 * Keys are `"category|group|variable"`. Layout: `data[key][qIdx * cols + monthIndex]`
 * where `rows` = number of quantile levels and `cols` = number of months.
 *
 * @param c - The `ColumnarResult` returned as `monthlyQuantiles` by `simulateRentVsBuyMonteCarlo`.
 * @param quantiles - The same quantile levels passed to `options.monthlyQuantiles` (e.g. `[0, 0.5, 1]`).
 */
export declare function decodeMonteCarloMonthlyQuantiles(c: ColumnarResult, quantiles: number[]): {
    category: string;
    group: string;
    variable: string;
    monthIndex: number;
    quantile: number;
    value: number;
}[];
/**
 * Decodes a columnar `winners` result back into the original object-array shape.
 *
 * `category` bytes map to category names via `WINNER_CATEGORIES`
 * (0 = "renter", 1 = "buyerFixed", 2 = "buyerVariable").
 * Records are returned in iteration order (row 0 = iteration 0).
 */
export declare function decodeMonteCarloWinners(w: WinnersColumnar): {
    iteration: number;
    monthIndex: number;
    amount: number;
    category: "renter" | "buyerFixed" | "buyerVariable";
}[];
//# sourceMappingURL=decodeMonteCarloResults.d.ts.map