"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getMinimumDownPayment;
/**
 * Calculates the minimum down payment required for a property purchase in Canada, based on the purchase price.
 *
 * The calculation follows the Financial Consumer Agency of Canada (FCAC) rules:
 * - For properties $500,000 or less: 5% of the purchase price.
 * - For properties between $500,000 and $1.5 million: 5% of the first $500,000, plus 10% of the portion above $500,000.
 * - For properties $1.5 million or more: 20% of the total purchase price.
 *
 * @param purchasePrice - The total price of the property being purchased.
 * @returns The minimum down payment amount.
 *
 * @example
 * ```ts
 * // Minimum down payment for a $400,000 home (5%)
 * const downPayment400k = getMinimumDownPayment(400_000);
 * console.log(downPayment400k); // 20000
 *
 * // Minimum down payment for a $600,000 home (5% of 500k + 10% of 100k)
 * const downPayment600k = getMinimumDownPayment(600_000);
 * console.log(downPayment600k); // 35000
 *
 * // Minimum down payment for a $1,600,000 home (20%)
 * const downPayment1600k = getMinimumDownPayment(1_600_000);
 * console.log(downPayment1600k); // 320000
 * ```
 *
 * Reference: https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html
 * @category Finance
 */
function getMinimumDownPayment(purchasePrice) {
    if (purchasePrice <= 500_000) {
        return purchasePrice * 0.05;
    }
    else if (purchasePrice < 1_500_000) {
        return 25_000 + (purchasePrice - 500_000) * 0.1;
    }
    else {
        return purchasePrice * 0.2;
    }
}
