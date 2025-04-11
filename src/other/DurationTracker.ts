import prettyDuration from "../format/prettyDuration.ts";

/**
 * Tracks the duration of iterations and logs the remaining time
 * based on the average duration of previous iterations.
 *
 * @example
 * ```ts
 * const data = [...]; // An array of data to process
 * const tracker = new DurationTracker(data.length, { prefix: "Remaining time: " });
 * for (const item of data) {
 *   tracker.start();
 *   // Process the item...
 *   tracker.log(); // Log the estimated remaining time
 * }
 * ```
 */
export default class DurationTracker {
  /**  An array to store the durations of each iteration. */
  private iterationDurations: number[];
  /** The start time of the current iteration. */
  private currentStart: number;
  /** The end time of the current iteration. */
  private currentEnd: number;
  /** The total number of iterations. */
  length: number;
  /** Optional prefix for the log message. */
  prefix: string;
  /** Option suffix for the log message. */
  suffix: string;

  /** @param length The total number of iterations. */
  constructor(
    length: number,
    options: { prefix?: string; suffix?: string } = {},
  ) {
    this.prefix = options.prefix || "";
    this.suffix = options.suffix || "";
    this.iterationDurations = [];
    this.currentStart = 0;
    this.currentEnd = 0;
    this.length = length;
  }

  /**
   * Starts the timer for the current iteration.
   */
  start() {
    this.currentStart = Date.now();
  }

  /**
   * Logs the estimated remaining time based on the average duration of previous iterations.
   */
  log() {
    this.currentEnd = Date.now();
    this.iterationDurations.push(this.currentEnd - this.currentStart);
    const averageDuration = Math.round(
      this.iterationDurations.reduce((a, b) => a + b, 0) /
        this.iterationDurations.length,
    );
    const remainingTime = averageDuration *
      (this.length - this.iterationDurations.length);
    console.log(
      `${this.prefix}${
        prettyDuration(0, { end: remainingTime })
      }${this.suffix}`,
    );
  }
}
