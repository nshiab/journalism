/**
 * Wraps a string to a specified maximum width, attempting to break at word boundaries when possible.
 * If a single word exceeds the maximum width, it will be broken at the character boundary.
 * This function is primarily used for preparing text to be displayed in console tables.
 *
 * @param str - The string to wrap.
 * @param maxWidth - The maximum width of each line.
 * @param wordWrap - If true, attempts to break at word boundaries. If false, breaks at character boundaries. Defaults to true.
 * @returns The wrapped string with newline characters inserted at appropriate positions.
 *
 * @example
 * ```typescript
 * const text = "This is a very long sentence that needs to be wrapped";
 * const wrapped = wrapString(text, 20);
 * console.log(wrapped);
 * // Output:
 * // This is a very long
 * // sentence that needs
 * // to be wrapped
 * ```
 *
 * @example
 * ```typescript
 * // Character-based wrapping (no word boundaries)
 * const text = "Thisisaverylongword";
 * const wrapped = wrapString(text, 10, false);
 * // Output: Thisisaver / ylongword
 * ```
 */
export default function wrapString(str: string, maxWidth: number, wordWrap?: boolean): string;
//# sourceMappingURL=wrapString.d.ts.map