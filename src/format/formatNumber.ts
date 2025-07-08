import round from "./round.ts";
import { transformPositionToCbcStyle } from "./helpers/transformPositionToCbcStyle.ts";
import { transformPositionToRcStyle } from "./helpers/transformPositionToRcStyle.ts";

/**
 * Formats a number according to specified style, rounding, and display options. This versatile function can handle various numerical formatting needs.
 *
 * The function supports two main styles: "cbc" (Canadian Broadcasting Corporation style, typically English) and "rc" (Radio-Canada style, typically French), which dictate the thousands separator and decimal marker.
 *
 * @param number The number to be formatted.
 * @param options An object containing various formatting options.
 * @param options.style The formatting style to apply. Can be "cbc" (default, typically English with comma thousands separator and dot decimal) or "rc" (typically French with space thousands separator and comma decimal).
 * @param options.sign If `true`, a "+" sign will be prepended to positive numbers. Negative numbers always retain their "-" sign. Defaults to `false`.
 * @param options.round If `true`, the number will be rounded to the nearest integer or based on `decimals`, `significantDigits`, or `nearestInteger` options. Defaults to `false`.
 * @param options.decimals The number of decimal places to round to.
 * @param options.significantDigits The number of significant digits to round to.
 * @param options.fixed If `true`, the number will be displayed with a fixed number of decimal places as specified by `decimals`, padding with zeros if necessary. Defaults to `false`.
 * @param options.nearestInteger The base to which the number should be rounded (e.g., 10 for rounding to the nearest ten, 100 for nearest hundred).
 * @param options.abreviation If `true`, the number will be abbreviated (e.g., 1,200,000 becomes "1.2M"). Defaults to `false`.
 * @param options.prefix A string to prepend before the formatted number.
 * @param options.suffix A string to append after the formatted number.
 * @param options.position If `true`, formats the number as an ordinal position (e.g., "1st", "2nd" in English, "1er", "2e" in French).
 *
 * @returns The formatted number as a string.
 *
 * @example
 * ```ts
 * // Basic usage: Format a number with thousands separator.
 * const num1 = formatNumber(1234567.89);
 * console.log(num1); // "1,234,567.89"
 * ```
 * @example
 * ```ts
 * // With sign and rounding to 0 decimals.
 * const num2 = formatNumber(1234.567, { sign: true, decimals: 0 });
 * console.log(num2); // "+1,235"
 * ```
 * @example
 * ```ts
 * // French style with abbreviation.
 * const num3 = formatNumber(1234567, { style: "rc", abreviation: true });
 * console.log(num3); // "1,2 M"
 * ```
 * @example
 * ```ts
 * // Fixed number of decimals with prefix and suffix.
 * const num4 = formatNumber(98.765, { decimals: 2, fixed: true, prefix: "$", suffix: " CAD" });
 * console.log(num4); // "$98.77 CAD"
 * ```
 * @example
 * ```ts
 * // Formatting as an ordinal position.
 * const position1 = formatNumber(1, { position: true });
 * console.log(position1); // "1st"
 *
 * const position2 = formatNumber(2, { position: true, style: "rc" });
 * console.log(position2); // "2e"
 * ```
 * @category Formatting
 */

export default function formatNumber(
  number: number,
  options: {
    style?: "cbc" | "rc";
    sign?: boolean;
    round?: boolean;
    decimals?: number;
    significantDigits?: number;
    fixed?: boolean;
    nearestInteger?: number;
    abreviation?: boolean;
    prefix?: string;
    suffix?: string;
    position?: boolean;
  } = {},
): string {
  if (typeof number !== "number") {
    throw new Error("Not a number");
  }

  if (options.position === true) {
    if (options.style === "rc") {
      return transformPositionToRcStyle(number);
    } else {
      return transformPositionToCbcStyle(number);
    }
  }

  const mergedOptions: {
    style: "cbc" | "rc";
    sign: boolean;
    round: boolean;
    decimals?: number;
    nearestInteger?: number;
    abreviation?: boolean;
    significantDigits?: number;
    fixed: boolean;
    prefix: string;
    suffix: string;
  } = {
    style: "cbc",
    sign: false,
    round: false,
    fixed: false,
    prefix: "",
    suffix: "",
    ...options,
  };

  let abbreviation = "";
  if (mergedOptions.abreviation && number !== 0) {
    const abbreviations = ["", "K", "M", "B", "T"];
    const index = Math.floor(
      Math.log10(Math.abs(number)) / 3,
    );
    abbreviation = abbreviations[index];
    number = number / Math.pow(10, index * 3);
  }

  if (
    mergedOptions.round ||
    typeof mergedOptions.decimals === "number" ||
    typeof mergedOptions.nearestInteger === "number" ||
    typeof mergedOptions.significantDigits === "number"
  ) {
    number = round(number, {
      decimals: mergedOptions.decimals,
      nearestInteger: mergedOptions.nearestInteger,
      significantDigits: mergedOptions.significantDigits,
    });
  }

  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const [integers, decimals] = mergedOptions.fixed
    ? number.toFixed(mergedOptions.decimals).split(".")
    : number.toString().split(".");

  let formattedNumber = "";

  if (mergedOptions.style === "cbc") {
    const formattedIntegers = integers.replace(regex, ",");
    if (decimals) {
      formattedNumber = `${formattedIntegers}.${decimals}`;
    } else {
      formattedNumber = formattedIntegers;
    }
  } else if (mergedOptions.style === "rc") {
    const string = mergedOptions.fixed
      ? number.toFixed(mergedOptions.decimals)
      : number.toString();
    if (string.length === 4) {
      formattedNumber = string.replace(".", ",");
    } else {
      const formattedIntegers = integers.replace(regex, " ");
      if (decimals) {
        formattedNumber = `${formattedIntegers},${decimals}`;
      } else {
        formattedNumber = formattedIntegers;
      }
    }
  } else {
    throw new Error("Unknown style");
  }

  if (mergedOptions.sign) {
    if (number > 0) {
      formattedNumber = `+${formattedNumber}`;
    }
    // Negative sign is always present for negative numbers
  } else if (options.sign === false) {
    // Only show absolute value when sign is strictly false
    formattedNumber = formattedNumber.replace(/^[-+]/, "");
  }

  return `${mergedOptions.prefix}${formattedNumber}${abbreviation}${mergedOptions.suffix}`;
}
