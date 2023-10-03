import round from "../format/round.js"

/**
 * Returns mortgage payments in an array. Each payment is an object with the paymentId, the payment amount, the interest and capital portions of the payment, the remaining mortgage balance, and the total amount paid, total interest paid, and total capital reimbursed so far.
 *
 * These options can be passed in an object as the last parameter:
 * - id: a string if we want to add an id in the payment objects.
 * - nbDecimals: the number of decimals to round to. By default, it's 2.
 * - compoudingFrequencyPerYear: the compounding frequency could vary depending on the countries. In Canada, it's 2 and it's the default value.
 * - debug: Will log the effectiveRate, periodicInterestRate, numberOfPaymentsinTerm, and amortizationPeriodinMonths if true.
 * Calculations are based on https://www.yorku.ca/amarshal/mortgage.htm
 */

export default function mortgagePayments(
    mortageAmount: number,
    rate: number,
    paymentFrequency: "weekly" | "everyTwoWeeks" | "monthly" | "semiMonthly",
    term: number,
    amortizationPeriod: number,
    options: {
        id?: string
        nbDecimals?: number
        compoundingFrequencyPerYear?: number
        debug?: boolean
    } = {}
) {
    options = {
        compoundingFrequencyPerYear: 2, // Specific to Canada. Default.
        nbDecimals: 2,
        ...options,
    }

    const nominalRate = rate / 100
    const compoundingFrequencyPerYear = 2 //In Canada, mortgages are always compounded semi-annually
    const effectiveRate =
        Math.pow(
            1 + nominalRate / compoundingFrequencyPerYear,
            compoundingFrequencyPerYear
        ) - 1
    const monthlyRate = Math.pow(1 + effectiveRate, 1 / 12) - 1
    const amortizationPeriodinMonths = amortizationPeriod * 12
    const monthlyPayment =
        (monthlyRate * mortageAmount) /
        (1 - Math.pow(1 + monthlyRate, -amortizationPeriodinMonths))

    let numberOfPaymentsinTerm
    let periodicInterestRate: number
    let periodicPayment: number
    if (paymentFrequency === "monthly") {
        numberOfPaymentsinTerm = 12 * term
        periodicInterestRate = monthlyRate
        periodicPayment = round(monthlyPayment, { nbDecimals: 2 })
    } else if (paymentFrequency === "everyTwoWeeks") {
        numberOfPaymentsinTerm = Math.floor((365 / 14) * term)
        // periodicInterestRate = Math.pow(Math.pow(1 + effectiveRate / 2, 2), 14 / 365) - 1  // Should not use effectiveRate?
        periodicInterestRate =
            Math.pow(Math.pow(1 + nominalRate / 2, 2), 14 / 365) - 1
        periodicPayment = round((monthlyPayment * 12) / 26, { nbDecimals: 2 }) // 26 or 365/14 ?
    } else if (paymentFrequency === "semiMonthly") {
        numberOfPaymentsinTerm = 24 * term
        // periodicInterestRate =
        //     Math.pow(Math.pow(1 + effectiveRate / 2, 2), 1 / (12 * 2)) - 1 // Should not use effectiveRate?
        periodicInterestRate =
            Math.pow(Math.pow(1 + nominalRate / 2, 2), 1 / 24) - 1
        periodicPayment = round(monthlyPayment / 2, { nbDecimals: 2 })
    } else if (paymentFrequency === "weekly") {
        numberOfPaymentsinTerm = Math.floor((365 / 7) * term)
        // periodicInterestRate = Math.pow(Math.pow(1 + effectiveRate / 2, 2), 7 / 365) - 1 // Should not use effectiveRate?
        periodicInterestRate =
            Math.pow(Math.pow(1 + nominalRate / 2, 2), 7 / 365) - 1
        // periodicPayment = round((monthlyPayment * 12) / 52, { nbDecimals: 2 }) // More precise?
        periodicPayment = round(monthlyPayment / 4, { nbDecimals: 2 })
    } else {
        throw new Error(`Unknown paymentFrequency ${paymentFrequency}`)
    }

    // Looping over each payment.
    const paymentSchedule: {
        id?: string
        paymentId: number
        payment: number
        interest: number
        capital: number
        balance: number
        amountPaid: number
        interestPaid: number
        capitalPaid: number
    }[] = []

    options.debug &&
        console.log({
            effectiveRate,
            periodicInterestRate,
            numberOfPaymentsinTerm,
            amortizationPeriodinMonths,
        })

    let amountPaid = 0
    let interestPaid = 0
    let capitalPaid = 0

    for (let i = 0; i < numberOfPaymentsinTerm; i++) {
        const interest = paymentSchedule[i - 1]
            ? paymentSchedule[i - 1].balance * periodicInterestRate
            : mortageAmount * periodicInterestRate
        const capital = periodicPayment - interest
        const balance = paymentSchedule[i - 1]
            ? paymentSchedule[i - 1].balance - capital
            : mortageAmount - capital

        amountPaid += periodicPayment
        interestPaid += interest
        capitalPaid += capital

        paymentSchedule.push({
            paymentId: i,
            payment: periodicPayment,
            interest: round(interest, options),
            capital: round(capital, options),
            balance: round(balance, options),
            amountPaid: round(amountPaid, options),
            interestPaid: round(interestPaid, options),
            capitalPaid: round(capitalPaid, options),
        })
    }

    return options.id
        ? paymentSchedule.map((d) => {
              return { ...d, id: options.id }
          })
        : paymentSchedule
}
