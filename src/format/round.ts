interface options {
    nbDecimals?: number
    nearestInteger?: number
}

interface mergedOptions {
    nbDecimals: number
    nearestInteger: number
}

export default function round(number: number, options: options = {}): number {
    const mergedOptions: mergedOptions = {
        nbDecimals: 0,
        nearestInteger: 1,
        ...options,
    }

    if (mergedOptions.nbDecimals > 0 && mergedOptions.nearestInteger > 1) {
        throw new Error(
            "You can't use nbDecimals and nearestInteger at the same time. Use just one option."
        )
    }

    if (mergedOptions.nearestInteger === 1) {
        return parseFloat(number.toFixed(mergedOptions.nbDecimals))
    } else {
        return (
            Math.round(number / mergedOptions.nearestInteger) *
            mergedOptions.nearestInteger
        )
    }
}
