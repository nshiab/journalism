import mortgageInsurancePremium from "./mortgageInsurancePremium.js"

/**
 * Calculates the maximum purchase price (and other variables) for a property a person can afford and the related mortgage it would qualify for based on annual income, down payment, mortgage interest rate, and additional options.
 *
 * ```ts
 * // With an annual income of $100,000, a down payment of $25,000, and a rate of 5.25%.
 * const results = maxMortgageAmount(100_000, 25_000, 5.25)
 * // results = {
 * //   annualIncome: 100000,
 * //   downPayment: 25000,
 * //   rate: 5.25,
 * //   rateTested: 7.25,
 * //   purchasePrice: 307000,
 * //   mortgageAmount: 293280,
 * //   insurancePremium: 11280,
 * //   monthlyMortgagePayment: 2099.65,
 * //   grossDebtServiceRatio: 0.32,
 * //   totalDebtServiceRatio: 0.32,
 * //   reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
 * //   monthlyDebtPayment: 0,
 * //   monthlyHeating: 175,
 * //   isHeatingEstimate: true,
 * //   monthlyTax: 385,
 * //   isTaxEstimate: true,
 * //   monthlyCondoFees: 0,
 * // }
 * ```
 *
 * @param annualIncome - The annual income of the borrower.
 * @param downPayment - The amount of money paid upfront.
 * @param rate - The mortgage interest rate.
 * @param options - Additional options such.
 * @param   options.monthlyDebtPayment - The monthly debt payment of the borrower. Defaults to 0.
 * @param   options.monthlyHeating - The monthly heating cost. Defaults to $175, like Royal Bank of Canada does.
 * @param   options.monthlyTax - The monthly property tax. Default to 1.5% of the purchase price, like Royal Bak of Canada does.
 * @param   options.monthlyCondoFees - The monthly condo fees. Defaults to 0.
 *
 * @category Finance
 **/

export default function mortgageMaxAmount(
    annualIncome: number,
    downPayment: number,
    rate: number,
    options: {
        monthlyDebtPayment?: number
        monthlyHeating?: number
        monthlyTax?: number
        monthlyCondoFees?: number
    } = {}
): {
    annualIncome: number
    downPayment: number
    rate: number
    rateTested: number
    purchasePrice: number
    mortgageAmount: number
    insurancePremium: number
    monthlyMortgagePayment: number
    grossDebtServiceRatio: number
    totalDebtServiceRatio: number
    reason: string
    monthlyDebtPayment: number
    monthlyHeating: number
    isHeatingEstimate: boolean
    monthlyTax: number
    isTaxEstimate: boolean
    monthlyCondoFees: number
} {
    const monthlyIncome = annualIncome / 12

    // For the stress test, the rate should be the highest value between rate+2 or 5.25
    const rateTested = parseFloat(Math.max(rate + 2, 5.25).toFixed(2))

    // Default monthlyDebtPayment is 0
    const monthlyDebtPayment = options.monthlyDebtPayment ?? 0

    // Default monthly heating is $175, like Royal Bank of Canada.
    const monthlyHeating = options.monthlyHeating ?? 175
    const isHeatingEstimate =
        typeof options.monthlyHeating === "number" ? false : true

    // Default condo fees is $0
    const monthlyCondoFees = options.monthlyCondoFees ?? 0

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
        purchasePrice: downPayment,
        mortgageAmount: 0,
        insurancePremium: 0,
        monthlyMortgagePayment: 0,
        grossDebtServiceRatio: 0,
        totalDebtServiceRatio: 0,
        reason: "",
        monthlyDebtPayment,
        monthlyHeating,
        isHeatingEstimate,
        monthlyTax: 0,
        isTaxEstimate: false,
        monthlyCondoFees,
    }

    // We start with the down payment and increment by $100,000
    findMaxAmount(
        downPayment,
        100_000,
        monthlyIncome,
        downPayment,
        monthlyRate,
        amortizationPeriodinMonths,
        monthlyHeating,
        monthlyCondoFees,
        monthlyDebtPayment,
        options,
        results
    )
    // Then with the purchase price previously found but we increment by $10,000
    findMaxAmount(
        results.purchasePrice,
        10_000,
        monthlyIncome,
        downPayment,
        monthlyRate,
        amortizationPeriodinMonths,
        monthlyHeating,
        monthlyCondoFees,
        monthlyDebtPayment,
        options,
        results
    )
    // Again but $1,000 increment
    findMaxAmount(
        results.purchasePrice,
        1_000,
        monthlyIncome,
        downPayment,
        monthlyRate,
        amortizationPeriodinMonths,
        monthlyHeating,
        monthlyCondoFees,
        monthlyDebtPayment,
        options,
        results
    )

    if (results.purchasePrice === 10_000_000) {
        results.reason = "max purchase price"
    }

    // We return the results.
    return results
}

// A function where we loop and test mortgage amounts.
function findMaxAmount(
    startPrice: number,
    increment: number,
    monthlyIncome: number,
    downPayment: number,
    monthlyRate: number,
    amortizationPeriodinMonths: number,
    monthlyHeating: number,
    monthlyCondoFees: number,
    monthlyDebtPayment: number,
    options: { monthlyTax?: number },
    results: {
        annualIncome: number
        downPayment: number
        rate: number
        rateTested: number
        purchasePrice: number
        mortgageAmount: number
        insurancePremium: number
        monthlyMortgagePayment: number
        grossDebtServiceRatio: number
        totalDebtServiceRatio: number
        reason: string
        monthlyDebtPayment: number
        monthlyHeating: number
        isHeatingEstimate: boolean
        monthlyTax: number
        isTaxEstimate: boolean
        monthlyCondoFees: number
    }
) {
    // We start with zeros
    let grossDebtServiceRatio = 0
    let totalDebtServiceRatio = 0

    // We test amount up to $10,000,000
    let downPaymentTooLow = false
    for (
        let purchasePrice = startPrice;
        purchasePrice <= 10_000_000;
        purchasePrice += increment
    ) {
        // We check that the down payment is enough
        if (purchasePrice <= 500_000) {
            const downPaymentMin = purchasePrice * 0.05
            if (downPayment < downPaymentMin) {
                downPaymentTooLow = true
            }
        } else if (purchasePrice > 500_000 && purchasePrice < 1_000_000) {
            const downPaymentMin = 25_000 + (purchasePrice - 500_000) * 0.1
            if (downPayment < downPaymentMin) {
                downPaymentTooLow = true
            }
        } else if (purchasePrice >= 1_000_000) {
            const downPaymentMin = purchasePrice * 0.2
            if (downPayment < downPaymentMin) {
                downPaymentTooLow = true
            }
        }

        if (downPaymentTooLow) {
            results.reason = `downPayment limit`
            break
        }

        // We calculate the insurance premium
        const insurancePremium = mortgageInsurancePremium(
            purchasePrice,
            downPayment
        )

        // Then the actual mortgage amount
        const mortgageAmount =
            Math.max(purchasePrice - downPayment, 0) + insurancePremium

        // And monthly mortgage payment
        const monthlyMortgagePayment = Math.round(
            (monthlyRate * mortgageAmount) /
                (1 - Math.pow(1 + monthlyRate, -amortizationPeriodinMonths))
        )

        // The default annual tax rate is 1.5% of purchase price, like Royal Bank of Canada.
        const monthlyTax =
            options.monthlyTax ?? Math.round((purchasePrice * 0.015) / 12)
        results.monthlyTax = monthlyTax
        results.isTaxEstimate =
            typeof options.monthlyTax === "number" ? false : true

        const monthlyHomeExpenses =
            monthlyMortgagePayment +
            monthlyHeating +
            monthlyTax +
            monthlyCondoFees

        // We update the ratios.
        grossDebtServiceRatio = monthlyHomeExpenses / monthlyIncome
        totalDebtServiceRatio =
            (monthlyHomeExpenses + monthlyDebtPayment) / monthlyIncome

        // If the GDS or TDS are equal or above the thresholds established by the Financial Consumer Agency of Canada, we break. Otherwise, we update the results values.
        if (grossDebtServiceRatio >= 0.32 || totalDebtServiceRatio >= 0.4) {
            results.reason = `debt limit`
            break
        } else {
            results.purchasePrice = purchasePrice
            results.mortgageAmount = mortgageAmount
            results.insurancePremium = insurancePremium
            results.monthlyMortgagePayment = monthlyMortgagePayment

            results.grossDebtServiceRatio = parseFloat(
                grossDebtServiceRatio.toFixed(2)
            )
            results.totalDebtServiceRatio = parseFloat(
                totalDebtServiceRatio.toFixed(2)
            )
        }
    }
}
