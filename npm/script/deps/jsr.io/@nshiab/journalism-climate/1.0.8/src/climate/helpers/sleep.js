"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sleep;
/**
 * Delays execution for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A Promise that resolves after the specified delay.
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
