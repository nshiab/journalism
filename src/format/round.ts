/**
 * Rounds a number based on specified criteria: a fixed number of decimal places, to the nearest integer multiple, or to a specific number of significant digits. This function provides flexible rounding capabilities essential for data presentation and numerical accuracy.
 *
 * By default, if no options are specified, the function rounds to the nearest whole number.
 *
 * @param number - The number to be rounded.
 * @param options - An object containing options for rounding.
 *   @param options.decimals - The number of decimal places to keep when rounding. For example, `round(123.456, { decimals: 2 })` returns `123.46`.
 *   @param options.nearestInteger - The base to which the number should be rounded. For example, `round(123, { nearestInteger: 10 })` rounds to `120`.
 *   @param options.significantDigits - The number of significant digits to retain. Significant digits are counted from the first non-zero digit. For example, `round(0.004622, { significantDigits: 1 })` rounds to `0.005`.
 *   @param options.try - If `true`, the function will return `NaN` (Not a Number) if the input `number` is not a valid number, instead of throwing an error. Defaults to `false`.
 * @returns The rounded number.
 * @throws {Error} If the input `number` is not a number (and `options.try` is not `true`), or if more than one rounding option (`decimals`, `nearestInteger`, `significantDigits`) is provided.
 *
 * @example
 * // -- Basic Usage --
 *
 * // Round to the nearest integer (default behavior).
 * const resultDefault = round(1234.567);
 * console.log(resultDefault); // Expected output: 1235
 *
 * // Round to one decimal place.
 * const resultDecimal = round(1234.567, { decimals: 1 });
 * console.log(resultDecimal); // Expected output: 1234.6
 *
 * @example
 * // -- Rounding to Nearest Integer Multiple --
 *
 * // Round 123 to the nearest multiple of 10.
 * const resultNearestInteger = round(123, { nearestInteger: 10 });
 * console.log(resultNearestInteger); // Expected output: 120
 *
 * // Round 127 to the nearest multiple of 5.
 * const resultNearestFive = round(127, { nearestInteger: 5 });
 * console.log(resultNearestFive); // Expected output: 125
 *
 * @example
 * // -- Rounding to Significant Digits --
 *
 * // Round 0.004622 to 1 significant digit.
 * const resultSignificantDigits = round(0.004622, { significantDigits: 1 });
 * console.log(resultSignificantDigits); // Expected output: 0.005
 *
 * // Round 12345 to 2 significant digits.
 * const resultSignificantDigitsLarge = round(12345, { significantDigits: 2 });
 * console.log(resultSignificantDigitsLarge); // Expected output: 12000
 *
 * @example
 * // -- Handling Invalid Input --
 *
 * // Attempting to round a non-numeric value without `try: true` will throw an error.
 * try {
 *   round("abc");
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   // Expected output: "Error: abc is not a number. If you want to return NaN instead of throwing an error, pass option {try: true}."
 * }
 *
 * // With `try: true`, it returns NaN for non-numeric input.
 * const nanResult = round("abc", { try: true });
 * console.log(nanResult); // Expected output: NaN
 *
 * @example
 * // -- Handling Conflicting Options --
 *
 * // Providing multiple rounding options will throw an error.
 * try {
 *   round(123.45, { decimals: 1, significantDigits: 2 });
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   // Expected output: "Error: You can't use options decimals, nearestInteger, or significantDigits together. Pick one."
 * }
 *
 * @category Formatting
 */

export default function round(
  number: number,
  options: {
    decimals?: number;
    nearestInteger?: number;
    significantDigits?: number;
    try?: boolean;
  } = {},
): number {
  const optionsToCheck = [
    options.decimals,
    options.nearestInteger,
    options.significantDigits,
  ];
  if (optionsToCheck.filter((d) => typeof d === "number").length > 1) {
    throw new Error(
      "You can't use options decimals, nearestInteger, or significantDigits together. Pick one.",
    );
  }

  if (typeof number !== "number") {
    if (options.try === true) {
      return NaN;
    } else {
      throw new Error(
        `${number} is not a number. If you want to return NaN instead of throwing an error, pass option {try: true}.`,
      );
    }
  }

  if (typeof options.decimals === "number") {
    return parseFloat(number.toFixed(options.decimals));
  } else if (typeof options.nearestInteger === "number") {
    return (
      Math.round(number / options.nearestInteger) * options.nearestInteger
    );
  } else if (typeof options.significantDigits === "number") {
    return parseFloat(number.toPrecision(options.significantDigits));
  } else {
    return Math.round(number);
  }
}
