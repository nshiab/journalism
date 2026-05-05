// From journalism-extras
// https://jsr.io/@nshiab/journalism-extras/doc/~/sleep
export default function sleep(ms, start) {
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
