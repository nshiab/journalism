const ids: Set<string> = new Set();
const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Creates a unique id with letters, numbers, but no spaces or special characters. By default, the length is 6 characters. Works in the browser and NodeJS (and other runtimes). Handy, but not cryptographically secure.
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
