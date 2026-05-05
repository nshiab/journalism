export type Province = "Alberta" | "British Columbia" | "Manitoba" | "New Brunswick" | "Newfoundland and Labrador" | "Nova Scotia" | "Northwest Territories" | "Nunavut" | "Ontario" | "Prince Edward Island" | "Quebec" | "Saskatchewan" | "Yukon";
/**
 * Calculates the Canadian sales tax for a given amount, province, and year.
 *
 * @param amount - The base amount before tax.
 * @param province - The province or territory.
 * @param year - The tax year.
 * @returns An object containing the breakdown of taxes and the total amount.
 *
 * @example
 * ```ts
 * const salesTax = getSalesTax(100, "Quebec", 2025);
 * console.log(salesTax);
 * // { gst: 5, pst: 9.975, hst: 0, totalTax: 14.975, totalAmount: 114.975 }
 * ```
 *
 * Reference: https://www.retailcouncil.org/resources/quick-facts/sales-tax-rates-by-province/
 */
export default function getSalesTax(amount: number, province: "Alberta" | "British Columbia" | "Manitoba" | "New Brunswick" | "Newfoundland and Labrador" | "Nova Scotia" | "Northwest Territories" | "Nunavut" | "Ontario" | "Prince Edward Island" | "Quebec" | "Saskatchewan" | "Yukon", year: 2025): {
    gst: number;
    pst: number;
    hst: number;
    totalTax: number;
    totalAmount: number;
};
//# sourceMappingURL=getSalesTax.d.ts.map