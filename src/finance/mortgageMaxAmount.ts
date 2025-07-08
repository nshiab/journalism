import mortgageInsurancePremium from "./mortgageInsurancePremium.ts";

/**
 * Calculates the maximum affordable property purchase price and the corresponding mortgage amount a borrower can qualify for, based on their annual income, down payment, and current mortgage interest rates. This function is designed to simulate mortgage qualification criteria, taking into account various financial factors and debt service ratios.
 *
 * The calculation incorporates a stress test, where the interest rate used for qualification is the higher of the provided rate + 2% or 5.25% (a common benchmark in Canada). It also considers monthly debt payments, heating costs, property taxes, and condo fees to determine the Gross Debt Service (GDS) and Total Debt Service (TDS) ratios, which are critical in mortgage approvals.
 *
 * @param annualIncome - The borrower's gross annual income.
 * @param downPayment - The amount of money the borrower is putting down as a down payment.
 * @param rate - The current mortgage interest rate (e.g., 5.25 for 5.25%).
 * @param options - Additional options to fine-tune the calculation:
 *   @param options.monthlyDebtPayment - The borrower's total monthly payments for other debts (e.g., car loans, credit cards). Defaults to `0`.
 *   @param options.monthlyHeating - The estimated monthly heating costs for the property. Defaults to `175` (a common estimate, e.g., by Royal Bank of Canada).
 *   @param options.monthlyTax - The estimated monthly property tax. Defaults to `1.5%` of the purchase price annually, divided by 12 (a common estimate, e.g., by Royal Bank of Canada).
 *   @param options.monthlyCondoFees - The estimated monthly condo fees, if applicable. Defaults to `0`.
 * @returns An object containing detailed results of the mortgage affordability calculation, including:
 *   - `annualIncome`: The annual income provided.
 *   - `downPayment`: The down payment provided.
 *   - `rate`: The mortgage interest rate provided.
 *   - `rateTested`: The interest rate used for the stress test (higher of `rate + 2%` or `5.25%`).
 *   - `purchasePrice`: The maximum affordable property purchase price.
 *   - `mortgageAmount`: The maximum mortgage amount the borrower qualifies for.
 *   - `insurancePremium`: The calculated mortgage insurance premium (if applicable).
 *   - `monthlyMortgagePayment`: The estimated monthly mortgage payment.
 *   - `grossDebtServiceRatio`: The calculated Gross Debt Service (GDS) ratio.
 *   - `totalDebtServiceRatio`: The calculated Total Debt Service (TDS) ratio.
 *   - `reason`: The limiting factor for the maximum amount (e.g., "debt limit", "downPayment limit", "max purchase price").
 *   - `monthlyDebtPayment`: The monthly debt payment used in the calculation.
 *   - `monthlyHeating`: The monthly heating cost used in the calculation.
 *   - `isHeatingEstimate`: `true` if `monthlyHeating` was an estimate, `false` if provided.
 *   - `monthlyTax`: The monthly property tax used in the calculation.
 *   - `isTaxEstimate`: `true` if `monthlyTax` was an estimate, `false` if provided.
 *   - `monthlyCondoFees`: The monthly condo fees used in the calculation.
 *
 * @example
 * ```ts
 * // Calculate affordability for a borrower with $100,000 annual income, $25,000 down payment, and a 5.25% rate.
 * const results = mortgageMaxAmount(100_000, 25_000, 5.25);
 * console.log(results);
 * // Expected output:
 * // {
 * //   annualIncome: 100000,
 * //   downPayment: 25000,
 * //   rate: 5.25,
 * //   rateTested: 7.25,
 * //   purchasePrice: 307000,
 * //   mortgageAmount: 293280,
 * //   insurancePremium: 11280,
 * //   monthlyMortgagePayment: 2100,
 * //   grossDebtServiceRatio: 0.32,
 * //   totalDebtServiceRatio: 0.32,
 * //   reason: "debt limit",
 * //   monthlyDebtPayment: 0,
 * //   monthlyHeating: 175,
 * //   isHeatingEstimate: true,
 * //   monthlyTax: 385,
 * //   isTaxEstimate: true,
 * //   monthlyCondoFees: 0,
 * // }
 * ```
 * @example
 * ```ts
 * // Calculate affordability with specific monthly debt payments and property taxes.
 * const customExpensesResults = mortgageMaxAmount(120_000, 40_000, 4.5,
 *   {
 *     monthlyDebtPayment: 300,
 *     monthlyTax: 450,
 *     monthlyCondoFees: 200,
 *   },
 * );
 * console.log(customExpensesResults);
 * ```
 * @category Finance
 */

export default function mortgageMaxAmount(
  annualIncome: number,
  downPayment: number,
  rate: number,
  options: {
    monthlyDebtPayment?: number;
    monthlyHeating?: number;
    monthlyTax?: number;
    monthlyCondoFees?: number;
  } = {},
): {
  annualIncome: number;
  downPayment: number;
  rate: number;
  rateTested: number;
  purchasePrice: number;
  mortgageAmount: number;
  insurancePremium: number;
  monthlyMortgagePayment: number;
  grossDebtServiceRatio: number;
  totalDebtServiceRatio: number;
  reason: string;
  monthlyDebtPayment: number;
  monthlyHeating: number;
  isHeatingEstimate: boolean;
  monthlyTax: number;
  isTaxEstimate: boolean;
  monthlyCondoFees: number;
} {
  const monthlyIncome = annualIncome / 12;

  // For the stress test, the rate should be the highest value between rate+2 or 5.25
  const rateTested = parseFloat(Math.max(rate + 2, 5.25).toFixed(2));

  // Default monthlyDebtPayment is 0
  const monthlyDebtPayment = options.monthlyDebtPayment ?? 0;

  // Default monthly heating is $175, like Royal Bank of Canada.
  const monthlyHeating = options.monthlyHeating ?? 175;
  const isHeatingEstimate = typeof options.monthlyHeating === "number"
    ? false
    : true;

  // Default condo fees is $0
  const monthlyCondoFees = options.monthlyCondoFees ?? 0;

  // We calculate variables for the monthly payment. Formula comes from the mortgagePayment function and is applicable only for fixed mortgage rates in Canada.
  const nominalRate = rateTested / 100;
  const annualEffectiveRate = Math.pow(1 + nominalRate / 2, 2); // Compounded two times per year
  const monthlyRate = Math.pow(annualEffectiveRate, 1 / 12) - 1;
  const amortizationPeriodinMonths = 25 * 12; // Amortization period of 25 years

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
  };

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
    results,
  );
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
    results,
  );
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
    results,
  );

  if (results.purchasePrice === 10_000_000) {
    results.reason = "max purchase price";
  }

  // We return the results.
  return results;
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
    annualIncome: number;
    downPayment: number;
    rate: number;
    rateTested: number;
    purchasePrice: number;
    mortgageAmount: number;
    insurancePremium: number;
    monthlyMortgagePayment: number;
    grossDebtServiceRatio: number;
    totalDebtServiceRatio: number;
    reason: string;
    monthlyDebtPayment: number;
    monthlyHeating: number;
    isHeatingEstimate: boolean;
    monthlyTax: number;
    isTaxEstimate: boolean;
    monthlyCondoFees: number;
  },
) {
  // We start with zeros
  let grossDebtServiceRatio = 0;
  let totalDebtServiceRatio = 0;

  // We test amount up to $10,000,000
  let downPaymentTooLow = false;
  for (
    let purchasePrice = startPrice;
    purchasePrice <= 10_000_000;
    purchasePrice += increment
  ) {
    // We check that the down payment is enough
    if (purchasePrice <= 500_000) {
      const downPaymentMin = purchasePrice * 0.05;
      if (downPayment < downPaymentMin) {
        downPaymentTooLow = true;
      }
    } else if (purchasePrice > 500_000 && purchasePrice < 1_500_000) {
      const downPaymentMin = 25_000 + (purchasePrice - 500_000) * 0.1;
      if (downPayment < downPaymentMin) {
        downPaymentTooLow = true;
      }
    } else if (purchasePrice >= 1_500_000) {
      const downPaymentMin = purchasePrice * 0.2;
      if (downPayment < downPaymentMin) {
        downPaymentTooLow = true;
      }
    }

    if (downPaymentTooLow) {
      results.reason = `downPayment limit`;
      break;
    }

    // We calculate the insurance premium
    const insurancePremium = mortgageInsurancePremium(
      purchasePrice,
      downPayment,
    );

    // Then the actual mortgage amount
    const mortgageAmount = Math.max(purchasePrice - downPayment, 0) +
      insurancePremium;

    // And monthly mortgage payment
    const monthlyMortgagePayment = Math.round(
      (monthlyRate * mortgageAmount) /
        (1 - Math.pow(1 + monthlyRate, -amortizationPeriodinMonths)),
    );

    // The default annual tax rate is 1.5% of purchase price, like Royal Bank of Canada.
    const monthlyTax = options.monthlyTax ??
      Math.round((purchasePrice * 0.015) / 12);
    results.monthlyTax = monthlyTax;
    results.isTaxEstimate = typeof options.monthlyTax === "number"
      ? false
      : true;

    const monthlyHomeExpenses = monthlyMortgagePayment +
      monthlyHeating +
      monthlyTax +
      monthlyCondoFees;

    // We update the ratios.
    grossDebtServiceRatio = monthlyHomeExpenses / monthlyIncome;
    totalDebtServiceRatio = (monthlyHomeExpenses + monthlyDebtPayment) /
      monthlyIncome;

    // If the GDS or TDS are equal or above the thresholds established by the Financial Consumer Agency of Canada, we break. Otherwise, we update the results values.
    if (grossDebtServiceRatio >= 0.32 || totalDebtServiceRatio >= 0.4) {
      results.reason = `debt limit`;
      break;
    } else {
      results.purchasePrice = purchasePrice;
      results.mortgageAmount = mortgageAmount;
      results.insurancePremium = insurancePremium;
      results.monthlyMortgagePayment = monthlyMortgagePayment;

      results.grossDebtServiceRatio = parseFloat(
        grossDebtServiceRatio.toFixed(2),
      );
      results.totalDebtServiceRatio = parseFloat(
        totalDebtServiceRatio.toFixed(2),
      );
    }
  }
}
