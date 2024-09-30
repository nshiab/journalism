/**
 * Capitalizes the first character of a string.
 * ```
 * // Returns 'Journalism'.
 * const text = capitalize('journalism')
 * ```
 *
 * @category Formatting
 */
export default function capitalize(string: string): string {
    const first = string.at(0)
    if (first === undefined) {
        throw new Error("Can't capitalize because string.at(0) === undefined")
    }
    return first.toUpperCase() + string.slice(1)
}
