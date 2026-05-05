/**
 * Performs a paired t-test for dependent means to determine if there is a significant difference between two related samples.
 *
 * The paired t-test is used when comparing two measurements from the same subjects or entities,
 * such as before and after an event, policy change, or intervention. It tests whether the mean difference between paired observations
 * is significantly different from zero. This is a test for **dependent means** (related samples), not independent groups.
 *
 * **When to use this function:**
 * - Use when you have two measurements from the same subjects or entities (before/after an event, pre/post policy change)
 * - When comparing two related conditions or matched pairs (same districts, candidates, regions, etc.)
 * - When you want to control for individual variation between subjects (dependent means)
 * - When data differences are approximately normally distributed
 *
 * **Test types:**
 * - **"two-tailed"** (default): Tests if the mean difference is significantly different from zero
 * - **"left-tailed"**: Tests if the mean difference is significantly less than zero
 * - **"right-tailed"**: Tests if the mean difference is significantly greater than zero
 *
 * @example
 * ```ts
 * // A journalist investigating if parking fines increased after new enforcement policy
 * const parkingFineData = [
 *   { district_id: 1, fines_before: 125, fines_after: 142 },
 *   { district_id: 2, fines_before: 98, fines_after: 108 },
 *   { district_id: 3, fines_before: 156, fines_after: 175 },
 *   { district_id: 4, fines_before: 87, fines_after: 95 },
 *   { district_id: 5, fines_before: 203, fines_after: 228 },
 *   { district_id: 6, fines_before: 134, fines_after: 149 },
 * ];
 *
 * const result = performPairedTTest(parkingFineData, "fines_before", "fines_after");
 * console.log(`Mean increase in fines: ${result.meanDifference.toFixed(2)} per month`);
 * console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
 * console.log(`P-value: ${result.pValue.toFixed(4)}`);
 *
 * if (result.pValue < 0.05) {
 *   console.log("Parking fines increased significantly after the new policy");
 * } else {
 *   console.log("No significant change in parking fines");
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing if campaign spending affects vote share (right-tailed test)
 * const campaignData = [
 *   { district_id: 1, before_ads: 32.5, after_ads: 38.2 },
 *   { district_id: 2, before_ads: 28.9, after_ads: 34.1 },
 *   { district_id: 3, before_ads: 41.3, after_ads: 43.7 },
 *   { district_id: 4, before_ads: 25.6, after_ads: 31.9 },
 *   { district_id: 5, before_ads: 36.8, after_ads: 40.3 },
 * ];
 *
 * // Test if after_ads - before_ads > 0 (increase in vote share)
 * const testResult = performPairedTTest(
 *   campaignData,
 *   "before_ads",
 *   "after_ads",
 *   { tail: "right-tailed" }
 * );
 *
 * console.log(`Mean vote share increase: ${testResult.meanDifference.toFixed(2)}%`);
 * if (testResult.pValue < 0.05) {
 *   console.log("Campaign ads show significant increase in vote share!");
 * } else {
 *   console.log("Campaign ads don't show significant increase in vote share");
 * }
 * ```
 *
 * @param pairedData - An array of objects containing paired observations. Each object must contain both specified keys with numeric values.
 * @param firstVariableKey - The key for the first measurement in each pair (e.g., "before_event", "baseline", "pre_policy").
 * @param secondVariableKey - The key for the second measurement in each pair (e.g., "after_event", "follow_up", "post_policy").
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @returns An object containing comprehensive test results including sample statistics, differences, degrees of freedom, t-statistic, and p-value.
 *
 * @category Statistics
 */
export default function performPairedTTest<T extends Record<string, unknown>>(pairedData: T[], firstVariableKey: keyof T, secondVariableKey: keyof T, options?: {
    tail?: "two-tailed" | "left-tailed" | "right-tailed";
}): {
    sampleSize: number;
    firstMean: number;
    secondMean: number;
    meanDifference: number;
    differenceStdDev: number;
    differenceVariance: number;
    degreesOfFreedom: number;
    tStatistic: number;
    pValue: number;
};
//# sourceMappingURL=performPairedTTest.d.ts.map