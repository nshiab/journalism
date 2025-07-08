import round from "../format/round.ts";

/**
 * Calculates and returns a detailed schedule of fixed-rate mortgage payments. This function is designed to provide a comprehensive breakdown of each payment, including the principal and interest portions, remaining balance, and cumulative amounts paid. It adheres to Canadian mortgage regulations, which typically require semi-annual compounding, but allows for customization of the compounding frequency.
 *
 * The function is flexible, supporting various payment frequencies (weekly, bi-weekly, monthly, semi-monthly, accelerated weekly, accelerated bi-weekly) and allowing for the specification of the mortgage amount, interest rate, term, and amortization period. It also includes options for rounding payment values and enabling debug logging.
 *
 * @param mortageAmount - The total amount of the mortgage loan.
 * @param rate - The annual interest rate of the mortgage (e.g., `6.00` for 6.00%).
 * @param paymentFrequency - The frequency at which mortgage payments are made. Supported values are: `"weekly"`, `"biWeekly"`, `"monthly"`, `"semiMonthly"`, `"acceleratedWeekly"`, `"acceleratedBiWeekly"`.
 * @param term - The term of the mortgage in years. This is the length of the current mortgage contract.
 * @param amortizationPeriod - The total amortization period of the mortgage in years. This is the total time it will take to pay off the mortgage.
 * @param options - Additional options for customizing the mortgage calculation and output.
 *   @param options.id - An optional string ID to be added to each payment object in the returned array. Useful for tracking payments related to a specific mortgage.
 *   @param options.decimals - The number of decimal places to round the financial values (payment, interest, capital, balance) to. Defaults to `2`.
 *   @param options.annualCompounding - The number of times the mortgage interest should be compounded per year. Defaults to `2` (semi-annual compounding, as is standard in Canada).
 *   @param options.debug - If `true`, enables debug logging to the console, providing additional insights into the calculation process. Defaults to `false`.
 * @returns An array of objects, where each object represents a single mortgage payment and contains:
 *   - `paymentId`: A 0-based index for the payment.
 *   - `payment`: The total amount of the payment.
 *   - `interest`: The portion of the payment that goes towards interest.
 *   - `capital`: The portion of the payment that goes towards the principal (capital).
 *   - `balance`: The remaining mortgage balance after the payment.
 *   - `amountPaid`: The cumulative total amount paid so far.
 *   - `interestPaid`: The cumulative total interest paid so far.
 *   - `capitalPaid`: The cumulative total capital reimbursed so far.
 *   - `id` (optional): The ID provided in `options.id`.
 * @throws {Error} If the `amortizationPeriod` is less than the `term`, as this is an invalid mortgage configuration.
 *
 * @example
 * // -- Basic Usage --
 *
 * // Return the monthly mortgage payments for a $250,000 loan with a 6.00% rate, 5-year term, and 25-year amortization.
 * const payments = mortgagePayments(250_000, 6, "monthly", 5, 25);
 * console.log(payments[0]); // First payment details
 * // Expected output (example):
 * // {
 * //   paymentId: 0,
 * //   payment: 1599.52,
 * //   interest: 1234.66,
 * //   capital: 364.86,
 * //   balance: 249635.14,
 * //   amountPaid: 1599.52,
 * //   interestPaid: 1234.66,
 * //   capitalPaid: 364.86,
 * // }
 * console.log(payments[payments.length - 1]); // Last payment details
 * // Expected output (example):
 * // {
 * //   paymentId: 59,
 * //   payment: 1599.52,
 * //   interest: 1111.58,
 * //   capital: 487.93,
 * //   balance: 224591.84,
 * //   amountPaid: 95970.99,
 * //   interestPaid: 70562.76,
 * //   capitalPaid: 25408.23,
 * // }
 *
 * @example
 * // -- Handling Invalid Amortization Period --
 *
 * // Attempting to set an amortization period shorter than the term will throw an error.
 * try {
 *   mortgagePayments(200_000, 5, "monthly", 10, 5); // Term (10) > Amortization (5)
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   // Expected output: "Error: The amortizationPeriod should be equal or greater than the term."
 * }
 *
 * @category Finance
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
    id?: string;
    decimals?: number;
    annualCompounding?: number;
    debug?: boolean;
  } = {},
): {
  id?: string | undefined;
  paymentId: number;
  payment: number;
  interest: number;
  capital: number;
  balance: number;
  amountPaid: number;
  interestPaid: number;
  capitalPaid: number;
}[] {
  if (amortizationPeriod < term) {
    throw new Error(
      "The amortizationPeriod should be equal or greater than the term.",
    );
  }

  options = {
    decimals: 2,
    annualCompounding: 2,
    ...options,
  };

  if (!options.annualCompounding) {
    throw new Error("No options.annualCompounding");
  }

  // Calculating the annualEffectiveRate with semi-annually compounding.
  const nominalRate = rate / 100;
  const annualEffectiveRate = Math.pow(
    1 + nominalRate / options.annualCompounding,
    options.annualCompounding,
  );
  // A function to compute the rate for a given time interval
  const computePeriodicRate = (interval: number) => {
    return Math.pow(annualEffectiveRate, interval) - 1;
  };

  // The monthly rate and the montly payment
  const monthlyRate = computePeriodicRate(1 / 12);
  const amortizationPeriodinMonths = amortizationPeriod * 12;
  const monthlyPayment = (monthlyRate * mortageAmount) /
    (1 - Math.pow(1 + monthlyRate, -amortizationPeriodinMonths));

  let numberOfPaymentsinTerm: number;
  let periodicInterestRate: number;
  let periodicPayment: number;

  if (paymentFrequency === "monthly") {
    // Monthly parameters, already calculated above.
    numberOfPaymentsinTerm = 12 * term;
    periodicInterestRate = monthlyRate;
    periodicPayment = monthlyPayment;
  } else if (paymentFrequency === "biWeekly") {
    // Payment every 14 days.
    numberOfPaymentsinTerm = Math.floor((365 / 14) * term);
    periodicInterestRate = computePeriodicRate(14 / 365);
    periodicPayment = (monthlyPayment * 12) / 26;
  } else if (paymentFrequency === "acceleratedBiWeekly") {
    // Payment every 14 days, but the periodic payment is calculated as the monthly payment divided by two, which makes it higher than biWeekly.
    numberOfPaymentsinTerm = Math.floor((365 / 14) * term);
    periodicInterestRate = computePeriodicRate(14 / 365);
    periodicPayment = monthlyPayment / 2;
  } else if (paymentFrequency === "semiMonthly") {
    // Payment twice every month. It's two payments less than bi-weekly.
    numberOfPaymentsinTerm = 24 * term;
    periodicInterestRate = computePeriodicRate(1 / 24);
    periodicPayment = monthlyPayment / 2;
  } else if (paymentFrequency === "weekly") {
    // Payment every week.
    numberOfPaymentsinTerm = Math.floor((365 / 7) * term);
    periodicInterestRate = computePeriodicRate(7 / 365);
    periodicPayment = (monthlyPayment * 12) / 52;
  } else if (paymentFrequency === "acceleratedWeekly") {
    // Payment every week, but the periodic payment is calculated as the monthly payment divided by four, which makes it higher than weekly.
    numberOfPaymentsinTerm = Math.floor((365 / 7) * term);
    periodicInterestRate = computePeriodicRate(7 / 365);
    periodicPayment = monthlyPayment / 4;
  } else {
    throw new Error(`Unknown paymentFrequency ${paymentFrequency}`);
  }

  // The expected shape of the data we want to return.
  const paymentSchedule: {
    id?: string;
    paymentId: number;
    payment: number;
    interest: number;
    capital: number;
    balance: number;
    amountPaid: number;
    interestPaid: number;
    capitalPaid: number;
  }[] = [];

  // If options.debug is true, let's log some extra information.
  options.debug &&
    console.log({
      monthlyRate,
      monthlyPayment,
      periodicInterestRate,
      numberOfPaymentsinTerm,
      amortizationPeriodinMonths,
    });

  // Three variables we will increment as we loop over the payments.
  let amountPaid = 0;
  let interestPaid = 0;
  let capitalPaid = 0;

  // We loop over the payments.
  for (let i = 0; i < numberOfPaymentsinTerm; i++) {
    // We calculate the interest, the capital, and the balance of each payment. For the interest and the balance, we need the balance of the previous payment. If there is none (first payment), we use the mortgageAmount.
    const interest = paymentSchedule[i - 1]
      ? paymentSchedule[i - 1].balance * periodicInterestRate
      : mortageAmount * periodicInterestRate;
    const capital = periodicPayment - interest;
    const balance = paymentSchedule[i - 1]
      ? paymentSchedule[i - 1].balance - capital
      : mortageAmount - capital;

    // We increment the amountPaid, interestPaid, and capitalPaid to have cumulative values.
    amountPaid += periodicPayment;
    interestPaid += interest;
    capitalPaid += capital;

    // We round the values after all the calculations.
    paymentSchedule.push({
      paymentId: i,
      payment: round(periodicPayment, options),
      interest: round(interest, options),
      capital: round(capital, options),
      balance: round(balance, options),
      amountPaid: round(amountPaid, options),
      interestPaid: round(interestPaid, options),
      capitalPaid: round(capitalPaid, options),
    });
  }

  // If there is an id as options, we add it to the objects before returning the array.
  return options.id
    ? paymentSchedule.map((d) => {
      return { ...d, id: options.id };
    })
    : paymentSchedule;
}
