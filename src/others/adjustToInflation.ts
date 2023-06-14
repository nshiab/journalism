export default function adjustToInflation(
    amount: number,
    amountCPI: number,
    targetCPI: number,
    options: {
        nbDecimals?: number
    } = {}
) {
    const inflation = (targetCPI - amountCPI) / amountCPI
    const adjustedAmount = amount + amount * inflation

    return typeof options.nbDecimals === "number"
        ? parseFloat(adjustedAmount.toFixed(options.nbDecimals))
        : adjustedAmount
}
