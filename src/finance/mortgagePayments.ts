import round from "../format/round.js"

/**
 * Returns mortgage payments in an array. Each payment is an object with the paymentId, the payment amount, the interest and capital portions of the payment, the remaining mortgage balance, and the total amount paid, total interest paid, and total capital reimbursed so far. The calculations have been tested for Canada.
 *
 * These options can be passed in an object as the last parameter:
 * - id: a string if we want to add an id in the payment objects.
 * - nbDecimals: the number of decimals to round to. By default, it's 2.
 * - debug: Will log the effectiveRate, periodicInterestRate, numberOfPaymentsinTerm, and amortizationPeriodinMonths if true.
 * Calculations are based on https://www.yorku.ca/amarshal/mortgage.htm
 */

export default function mortgagePayments(
    mortageAmount: number,
    rate: number,
    paymentFrequency:
        | "weekly"
        | "biWeekly"
        | "monthly"
        | "semiMonthly"
        | "acceleratedWeekly"
        | "acceleratedBiWeekly",
    term: number,
    amortizationPeriod: number,
    options: {
        id?: string
        nbDecimals?: number
        debug?: boolean
    } = {}
) {
    options = {
        nbDecimals: 2,
        ...options,
    }

    // The rate as a percentage
    const nominalRate = rate / 100
    // A function to compute the rate for a given time interval
    const computeRate = (interval: number) => {
        return Math.pow(Math.pow(1 + nominalRate / 2, 2), interval) - 1
    }

    // The monthly rate and the montly payment
    const monthlyRate = computeRate(1 / 12)
    const amortizationPeriodinMonths = amortizationPeriod * 12
    const monthlyPayment =
        (monthlyRate * mortageAmount) /
        (1 - Math.pow(1 + monthlyRate, -amortizationPeriodinMonths))

    let numberOfPaymentsinTerm
    let periodicInterestRate: number
    let periodicPayment: number

    if (paymentFrequency === "monthly") {
        // Monthly parameters, already calculated above.
        numberOfPaymentsinTerm = 12 * term
        periodicInterestRate = monthlyRate
        periodicPayment = round(monthlyPayment, { nbDecimals: 2 })
    } else if (paymentFrequency === "biWeekly") {
        // Payment every 14 days.
        numberOfPaymentsinTerm = Math.floor((365 / 14) * term)
        periodicInterestRate = computeRate(14 / 365)
        periodicPayment = round((monthlyPayment * 12) / 26, { nbDecimals: 2 })
    } else if (paymentFrequency === "acceleratedBiWeekly") {
        // Payment every 14 days, but the periodic payment is calculated as the monthly payment divided by two, which makes it higher than biWeekly.
        numberOfPaymentsinTerm = Math.floor((365 / 14) * term)
        periodicInterestRate = computeRate(14 / 365)
        periodicPayment = round(monthlyPayment / 2, { nbDecimals: 2 }) // 26 or 365/14 ?
    } else if (paymentFrequency === "semiMonthly") {
        // Payment twice every month. It's two payments less than bi-weekly.
        numberOfPaymentsinTerm = 24 * term
        periodicInterestRate = computeRate(1 / 24)
        periodicPayment = round(monthlyPayment / 2, { nbDecimals: 2 })
    } else if (paymentFrequency === "weekly") {
        // Payment every week.
        numberOfPaymentsinTerm = Math.floor((365 / 7) * term)
        periodicInterestRate = computeRate(7 / 365)
        periodicPayment = round((monthlyPayment * 12) / 52, { nbDecimals: 2 })
    } else if (paymentFrequency === "acceleratedWeekly") {
        // Payment every week, but the periodic payment is calculated as the monthly payment divided by four, which makes it higher than weekly.
        numberOfPaymentsinTerm = Math.floor((365 / 7) * term)
        periodicInterestRate = computeRate(7 / 365)
        periodicPayment = round(monthlyPayment / 4, { nbDecimals: 2 })
    } else {
        throw new Error(`Unknown paymentFrequency ${paymentFrequency}`)
    }

    // The expected shape of the data we want to return.
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

    // If options.debug is true, let's log some extra information.
    options.debug &&
        console.log({
            periodicInterestRate,
            numberOfPaymentsinTerm,
            amortizationPeriodinMonths,
        })

    // Three variables we will increment as we loop over the payments.
    let amountPaid = 0
    let interestPaid = 0
    let capitalPaid = 0

    // We loop over the payments.
    for (let i = 0; i < numberOfPaymentsinTerm; i++) {
        // We calculate the interest, the capital, and the balance of each payment. For the interest and the balance, we need the balance of the previous payment. If there is none (first payment), we use the mortgageAmount.
        const interest = paymentSchedule[i - 1]
            ? paymentSchedule[i - 1].balance * periodicInterestRate
            : mortageAmount * periodicInterestRate
        const capital = periodicPayment - interest
        const balance = paymentSchedule[i - 1]
            ? paymentSchedule[i - 1].balance - capital
            : mortageAmount - capital

        // We increment the amountPaid, interestPaid, and capitalPaid to have cumulative values.
        amountPaid += periodicPayment
        interestPaid += interest
        capitalPaid += capital

        // We round the values after all the calculations.
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

    // If there is an id as options, we add it to the objects before returning the array.
    return options.id
        ? paymentSchedule.map((d) => {
              return { ...d, id: options.id }
          })
        : paymentSchedule
}
