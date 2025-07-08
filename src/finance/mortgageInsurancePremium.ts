/**
 * Calculates the mortgage insurance premium based on the property's purchase price and the down payment amount. This function is designed to reflect the premium rates typically applied in Canada, as outlined by institutions like the Financial Consumer Agency of Canada. The calculated premium is rounded to the nearest integer.
 *
 * Mortgage insurance is generally required in Canada when the down payment is less than 20% of the home's purchase price.
 *
 * @param purchasePrice - The total price of the property being purchased.
 * @param downPayment - The amount of money paid upfront by the buyer towards the purchase price.
 * @returns The calculated mortgage insurance premium, rounded to the nearest integer. Returns `0` if the down payment is 20% or more, as insurance is typically not required in such cases.
 * @throws {Error} If the down payment is less than 5% of the purchase price, as this is generally the minimum required down payment for insured mortgages in Canada.
 *
 * @example
 * ```ts
 * // Calculate the insurance premium for a property with a $500,000 purchase price and a $25,000 down payment.
 * // (5% down payment, so 4% premium on the mortgage amount)
 * const insurancePremium = mortgageInsurancePremium(500_000, 25_000);
 * console.log(insurancePremium); // Expected output: 19000 (4% of $475,000)
 * ```
 * @example
 * ```ts
 * // Scenario 1: 10% down payment ($50,000 on $500,000 property) - 3.1% premium
 * const premium10Percent = mortgageInsurancePremium(500_000, 50_000);
 * console.log(`Premium for 10% down: ${premium10Percent}`); // Expected: 13950 (3.1% of $450,000)
 *
 * // Scenario 2: 15% down payment ($75,000 on $500,000 property) - 2.8% premium
 * const premium15Percent = mortgageInsurancePremium(500_000, 75_000);
 * console.log(`Premium for 15% down: ${premium15Percent}`); // Expected: 11900 (2.8% of $425,000)
 *
 * // Scenario 3: 20% or more down payment ($100,000 on $500,000 property) - No premium
 * const premium20Percent = mortgageInsurancePremium(500_000, 100_000);
 * console.log(`Premium for 20% down: ${premium20Percent}`); // Expected: 0
 * ```
 * @example
 * ```ts
 * // Attempting to calculate with a down payment less than 5% will throw an error.
 * try {
 *   mortgageInsurancePremium(500_000, 20_000); // 4% down payment
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   // Expected output: "Error: The down payment must be more than 5% of the purchase price..."
 * }
 * ```
 * @category Finance
 */

export default function mortgageInsurancePremium(
  purchasePrice: number,
  downPayment: number,
) {
  const downPaymentPerc = downPayment / purchasePrice;
  const mortgageAmount = purchasePrice - downPayment;

  if (downPaymentPerc < 0.05) {
    throw new Error(
      `The down payment must be more than 5% of the purchase price (downPaymentPerc=${downPaymentPerc}).`,
    );
  } else if (downPaymentPerc < 0.1) {
    return Math.round(mortgageAmount * 0.04);
  } else if (downPaymentPerc < 0.15) {
    return Math.round(mortgageAmount * 0.031);
  } else if (downPaymentPerc < 0.2) {
    return Math.round(mortgageAmount * 0.028);
  } else {
    return 0;
  }
}
