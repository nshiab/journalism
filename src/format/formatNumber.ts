import round from "./round.ts";

/**
 * Format a number with a specific style.
 * @example
 * Basic usage
 * ```js
 * const string = formatNumber(1234.567, { sign: true, round: true })
 * // returns "+1,235"
 * ```
 * @param number The number to format.
 * @param options An object containing the formatting options.
 * @param options.style The style to use for formatting. Can be "cbc" or "rc".
 * @param options.sign If true, "-" or "+" are added in front of the number.
 * @param options.round If true, the number will be rounded.
 * @param options.decimals The number of decimals to keep when rounding.
 * @param options.significantDigits The number of significant digits to keep.
 * @param options.fixed If true, display a fixed number of decimals by keeping 0 digits.
 * @param options.nearestInteger The base to use to round the number.
 * @param options.abreviation If true, the number will be abbreviated (e.g. 1.2M).
 * @param options.prefix A string to add before the number.
 * @param options.suffix A string to add after the number.
 *
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
  } = {},
): string {
  if (typeof number !== "number") {
    throw new Error("Not a number");
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
  if (mergedOptions.abreviation && number > 0) {
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
