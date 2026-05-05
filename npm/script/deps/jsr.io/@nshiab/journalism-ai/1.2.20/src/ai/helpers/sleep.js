"use strict";
// From journalism-extras
// https://jsr.io/@nshiab/journalism-extras/doc/~/sleep
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sleep;
function sleep(ms, start) {
    return new Promise((resolve) => {
        const end = Date.now();
        const duration = end - start;
        const remaining = ms - duration;
        if (remaining > 0) {
            return setTimeout(resolve, remaining);
        }
        else {
            return resolve();
        }
    });
}
