import mortgageInsurancePremium from "./mortgageInsurancePremium.js"

/**
 * Calculates the maximum mortgage amount (and other variables) a person can qualify for based on annual income, down payment, mortgage interest rate, and additional options.
 *
 * ```ts
 * // Returns ...
 * const results = maxMortgageAmount(100_000, 25_000, 5)
 * ```
 *
 * @param  annualIncome - The annual income of the borrower.
 * @param  downPayment - The amount of money paid upfront as a percentage of the property price.
 * @param  rate - The annual mortgage interest rate.
 * @param  options - Additional options such.
 * @param options.monthlyDebtPayment - The monthly debt payment of the borrower. Defaults to 0.
 * @param options.monthlyHeating - The monthly heating cost. Defaults to $175, like Royal Bank of Canada does.
 * @param options.monthlyTax - The monthly property tax. Default to 1.5% of the purchase price, like Royal Bak of Canada does.
 * @param options.monthlyCondoFees - The monthly condo fees. Defaults to 0.
 *
 **/

export default function maxMortgageAmount(
    annualIncome: number,
    downPayment: number,
    rate: number,
    options: {
        monthlyDebtPayment?: number
        monthlyHeating?: number
        monthlyTax?: number
        monthlyCondoFees?: number
    } = {}
) {
    const monthlyIncome = annualIncome / 12

    // For the stress test, the rate should be the higher value between rate+2 or 5.25
    const rateTested = Math.max(rate + 2, 5.25)

    // Default monthlyDebtPayment is 0
    const monthlyDebtPayment = options.monthlyDebtPayment ?? 0

    // Default monthly heating is $175, like Royal Bank of Canada.
    const monthlyHeating = options.monthlyHeating ?? 175
    const isHeatingEstimate =
        typeof options.monthlyHeating === "number" ? false : true

    // Default condo fees is $0
    const monthlyCondoFees = options.monthlyCondoFees ?? 0

    // We start with zeros
    let grossDebtServiceRatio = 0
    let totalDebtServiceRatio = 0

    // We calculate variables for the monthly payment. Formula comes from the mortgagePayment function and is applicable only for fixed mortgage rates in Canada.
    const nominalRate = rateTested / 100
    const annualEffectiveRate = Math.pow(1 + nominalRate / 2, 2) // Compounded two times per year
    const monthlyRate = Math.pow(annualEffectiveRate, 1 / 12) - 1
    const amortizationPeriodinMonths = 25 * 12 // Amortization period of 25 years

    // We will return an object. We define it here.
    const results = {
        annualIncome,
        downPayment,
        rate,
        rateTested,
        amount: 0,
        insurancePremium: 0,
        monthlyMortgagePayment: 0,
        grossDebtServiceRatio,
        totalDebtServiceRatio,
        reason: "",
        monthlyDebtPayment,
        monthlyHeating,
        isHeatingEstimate,
        monthlyTax: 0,
        isTaxEstimate: false,
        monthlyCondoFees,
    }

    // We test amount up to $10,000,000
    for (let amount = 1000; amount <= 10_000_000; amount += 1000) {
        console.log("\n*** amount", amount, "***")

        // The downPayment must be at least 5% of the purchase price.
        const downPaymentPerc = downPayment / amount
        console.log("downPaymentPerc", downPaymentPerc)

        if (downPaymentPerc < 0.05) {
            console.log("break downPaymentPerc < 0.05")
            results.reason = `Maximum amount allowed with a down payment of ${downPayment}. The down payment must be at least 5% of the purchase price.`
            break
        }

        // We calculate the insurance premium
        const insurancePremium = mortgageInsurancePremium(amount, downPayment)
        console.log("insurancePremium", insurancePremium)

        // Then the actual mortgage amount
        const mortageAmount =
            Math.max(amount - downPayment, 0) + insurancePremium
        console.log("mortageAmount", mortageAmount)

        // And monthly mortgage payment
        const monthlyMortgagePayment =
            (monthlyRate * mortageAmount) /
            (1 - Math.pow(1 + monthlyRate, -amortizationPeriodinMonths))
        console.log("monthlyMortgagePayment", monthlyMortgagePayment)

        // The default annual tax rate is 1.5% of purchase price, like Royal Bank of Canada.
        const monthlyTax = options.monthlyTax ?? (amount * 0.015) / 12
        results.monthlyTax = monthlyTax
        results.isTaxEstimate =
            typeof options.monthlyTax === "number" ? false : true

        console.log("monthlyTax", monthlyTax)

        const monthlyHomeExpenses =
            monthlyMortgagePayment +
            monthlyHeating +
            monthlyTax +
            monthlyCondoFees
        console.log("monthlyHomeExpenses", monthlyHomeExpenses)

        // We update the ratios.
        grossDebtServiceRatio = monthlyHomeExpenses / monthlyIncome
        console.log("grossDebtServiceRatio", grossDebtServiceRatio)
        totalDebtServiceRatio =
            (monthlyHomeExpenses + monthlyDebtPayment) / monthlyIncome
        console.log("totalDebtServiceRatio", totalDebtServiceRatio)
        // If the GDS or TDS are above the thresholds established by the Financial Consumer Agency of Canada, we break. Otherwise, we update the previous values.
        if (grossDebtServiceRatio > 0.32 && totalDebtServiceRatio > 0.4) {
            results.reason = `Gross debt service ratio would be above threshold of 0.32 and total debt service ratio would be above threshold of 0.4 with a bigger amount.`
            break
        } else if (grossDebtServiceRatio > 0.32) {
            results.reason = `Gross debt service ratio would be above threshold of 0.32 with a bigger amount`
            break
        } else if (totalDebtServiceRatio > 0.4) {
            results.reason = `Total debt service ratio would be above threshold of 0.4 with a bigger amount`
            break
        } else {
            results.amount = amount
            results.insurancePremium = insurancePremium
            results.monthlyMortgagePayment = parseFloat(
                monthlyMortgagePayment.toFixed(2)
            )
            results.grossDebtServiceRatio = parseFloat(
                grossDebtServiceRatio.toFixed(2)
            )
            results.totalDebtServiceRatio = parseFloat(
                totalDebtServiceRatio.toFixed(2)
            )
        }
    }

    if (results.amount === 10_000_000) {
        results.reason = "Maximum amount tested with this function."
    }

    // We return the results.
    return results
}
