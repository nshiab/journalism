/**
 * Normalizes a string by converting it to lowercase, stripping accents, punctuation (optional), and trimming whitespace.
 *
 * @param string The string to be normalized.
 * @param options An optional object with options.
 * @param options.stripPunctuation If true, punctuation and underscores will be stripped. Defaults to true.
 *
 * @returns A new string with characters in lowercase, without accents, without punctuation (if specified), with single spaces between words, and without leading or trailing whitespace.
 *
 * @example
 * ```ts
 * // Basic usage (strips punctuation by default)
 * const normalized = normalizeString("Évènement!  de  test");
 * console.log(normalized); // "evenement de test"
 * ```
 * @example
 * ```ts
 * // Keeping punctuation
 * const normalized = normalizeString("Évènement!", { stripPunctuation: false });
 * console.log(normalized); // "evenement!"
 * ```
 * @example
 * ```ts
 * // With accents, punctuation, and uppercase
 * const normalized = normalizeString("¡Niño!");
 * console.log(normalized); // "nino"
 * ```
 * @example
 * ```ts
 * // Handling multiple types of whitespace and symbols
 * const normalized = normalizeString("Hello,  World!\t100%");
 * console.log(normalized); // "hello world 100"
 * ```
 * @example
 * ```ts
 * // Stripping hyphens and underscores
 * const normalized = normalizeString("multi-word_example");
 * console.log(normalized); // "multiwordexample"
 * ```
 * @example
 * ```ts
 * // Handling emails (strips @ and .)
 * const normalized = normalizeString("email@example.com");
 * console.log(normalized); // "emailexamplecom"
 * ```
 * @category Formatting
 */
export default function normalizeString(
  string: string,
  options: { stripPunctuation?: boolean } = {},
): string {
  const { stripPunctuation = true } = options;

  let normalized = string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (stripPunctuation) {
    normalized = normalized.replace(/[^\w\s]|_/g, "");
  }

  return normalized
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
}
