/**
 * Calculates the mortgage insurance premium based on the property value and down payment. The returned value is rounded to the nearest integer. Based on the [Financial Consumer Agency of Canada calculator](https://itools-ioutils.fcac-acfc.gc.ca/MQ-HQ/MQCalc-EAPHCalc-eng.aspx?lang=eng).
 *
 * @example
 * Basic usage
 * ```ts
 * // Returns 19_000
 * const insurancePremium = mortgageInsurancePremium(500_000, 25_000)
 * ```
 *
 * @param purchasePrice - The price of the purchased property.
 * @param  downPayment - The amount of money paid upfront.
 *
 * @category Finance
 */

export default function mortgageInsurancePremium(
    purchasePrice: number,
    downPayment: number
) {
    const downPaymentPerc = downPayment / purchasePrice
    const mortgageAmount = purchasePrice - downPayment

    if (downPaymentPerc < 0.05) {
        throw new Error(
            `The down payment must be more than 5% of the purchase price (downPaymentPerc=${downPaymentPerc}).`
        )
    } else if (downPaymentPerc < 0.1) {
        return Math.round(mortgageAmount * 0.04)
    } else if (downPaymentPerc < 0.15) {
        return Math.round(mortgageAmount * 0.031)
    } else if (downPaymentPerc < 0.2) {
        return Math.round(mortgageAmount * 0.028)
    } else {
        return 0
    }
}
