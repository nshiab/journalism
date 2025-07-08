/**
 * Capitalizes the first letter of a given string.
 *
 * @param input The string to be capitalized.
 *
 * @returns A new string with the first letter in uppercase.
 *
 * @example
 * // Basic usage
 * const capitalized = capitalize("hello world");
 * console.log(capitalized); // "Hello world"
 *
 * @example
 * // With an already capitalized string
 * const alreadyCapitalized = capitalize("Journalism");
 * console.log(alreadyCapitalized); // "Journalism"
 *
 * @example
 * // With a single character
 * const singleChar = capitalize("a");
 * console.log(singleChar); // "A"
 *
 * @category Formatting
 */
export default function capitalize(string: string): string {
  const first = string[0];
  return first.toUpperCase() + string.slice(1);
}
