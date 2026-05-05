const ids: Set<string> = new Set();
const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Generates a unique ID string composed of letters and numbers, without spaces or special characters. By default, the ID has a length of 6 characters. While handy for general use, it is not cryptographically secure, meaning it should not be used for security-sensitive applications where true randomness and unpredictability are required.
 *
 * The function ensures uniqueness by keeping track of previously generated IDs within the current session. If a collision occurs (which is highly unlikely for reasonable lengths), it will attempt to generate a new ID. For very small `length` values, repeated collisions might trigger a warning to suggest increasing the length to maintain uniqueness.
 *
 * @param length - The desired length of the generated ID. Defaults to 6.
 * @returns A unique string ID.
 *
 * @example
 * ```ts
 * // Generate a default length ID (6 characters).
 * const id = getId();
 * console.log(id); // e.g., 'a1B2c3'
 * ```
 * @example
 * ```ts
 * // Generate an ID with a specified length (e.g., 10 characters).
 * const customId = getId(10);
 * console.log(customId); // e.g., 'a1B2c3D4e5'
 * ```
 * @category Other
 */

export default function getId(length: number = 6): string {
  let i = 0;
  let id = "";
  do {
    id = createId(length);
    i++;
    if (i > 3) {
      console.warn(`getId.ts attempt ${i}! Increase the length.`);
    }
  } while (ids.has(id));
  ids.add(id);
  return id;
}

function createId(length: number) {
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join("");
}
