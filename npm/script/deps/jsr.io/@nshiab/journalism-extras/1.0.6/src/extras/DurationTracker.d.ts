/**
 * A utility class for tracking the progress and estimating the remaining time of iterative processes. It calculates the average duration of completed iterations and uses this to project the time left for the remaining tasks. This is particularly useful for long-running operations where users need feedback on progress.
 *
 * The tracker provides methods to mark the start of an iteration and to log the estimated remaining time. The log message can be customized with a prefix and suffix.
 *
 * @param length The total number of iterations or items to process. This is used to calculate the remaining items.
 * @param options Optional settings for the tracker.
 * @param options.prefix A string to prepend to the logged remaining time message. Defaults to an empty string.
 * @param options.suffix A string to append to the logged remaining time message. Defaults to an empty string.
 *
 * @example
 * ```ts
 * // Basic usage: Tracking a loop with 100 iterations.
 * const totalItems = 100;
 * const tracker = new DurationTracker(totalItems, {
 *   prefix: "Processing... Estimated time remaining: ",
 *   suffix: " until completion."
 * });
 *
 * for (let i = 0; i < totalItems; i++) {
 *   tracker.start();
 *   // Simulate some work
 *   await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
 *   tracker.log();
 * }
 * console.log("Processing complete!");
 * ```
 * @category Other
 */
export default class DurationTracker {
    /**  An array to store the durations of each iteration. */
    private iterationDurations;
    /** The start time of the current iteration. */
    private currentStart;
    /** The end time of the current iteration. */
    private currentEnd;
    /** The total number of iterations. */
    length: number;
    /** Optional prefix for the log message. */
    prefix: string;
    /** Option suffix for the log message. */
    suffix: string;
    /**
     * Creates an instance of DurationTracker.
     * @param length The total number of iterations.
     * @param options Optional settings for the tracker.
     */
    constructor(length: number, options?: {
        prefix?: string;
        suffix?: string;
    });
    /**
     * Starts the timer for the current iteration.
     * @example
     * ```ts
     * const totalItems = 100;
     * const tracker = new DurationTracker(totalItems);
     * for (let i = 0; i < totalItems; i++) {
     *   tracker.start(); // Mark the start of each iteration
     *   // Simulate some work
     *   await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
     *   tracker.log();
     * }
     * ```
     * @returns {void}
     */
    start(): void;
    /**
     * Logs the estimated remaining time based on the average duration of previous iterations.
     * @example
     * ```ts
     * const totalItems = 100;
     * const tracker = new DurationTracker(totalItems);
     * for (let i = 0; i < totalItems; i++) {
     *   tracker.start();
     *   // Simulate some work
     *   await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
     *   tracker.log(); // Log the estimated remaining time for each iteration
     * }
     * ```
     * @returns {void}
     */
    log(): void;
}
//# sourceMappingURL=DurationTracker.d.ts.map