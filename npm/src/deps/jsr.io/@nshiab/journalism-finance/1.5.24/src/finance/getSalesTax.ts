export type Province =
  | "Alberta"
  | "British Columbia"
  | "Manitoba"
  | "New Brunswick"
  | "Newfoundland and Labrador"
  | "Nova Scotia"
  | "Northwest Territories"
  | "Nunavut"
  | "Ontario"
  | "Prince Edward Island"
  | "Quebec"
  | "Saskatchewan"
  | "Yukon";

type TaxYear = 2025;

const SALES_TAX_RATES: Record<
  TaxYear,
  Record<Province, { gstRate: number; pstRate: number; hstRate: number }>
> = {
  2025: {
    Alberta: { gstRate: 0.05, pstRate: 0, hstRate: 0 },
    "British Columbia": { gstRate: 0.05, pstRate: 0.07, hstRate: 0 },
    Manitoba: { gstRate: 0.05, pstRate: 0.07, hstRate: 0 },
    "New Brunswick": { gstRate: 0, pstRate: 0, hstRate: 0.15 },
    "Newfoundland and Labrador": { gstRate: 0, pstRate: 0, hstRate: 0.15 },
    "Northwest Territories": { gstRate: 0.05, pstRate: 0, hstRate: 0 },
    "Nova Scotia": { gstRate: 0, pstRate: 0, hstRate: 0.14 },
    Nunavut: { gstRate: 0.05, pstRate: 0, hstRate: 0 },
    Ontario: { gstRate: 0, pstRate: 0, hstRate: 0.13 },
    "Prince Edward Island": { gstRate: 0, pstRate: 0, hstRate: 0.15 },
    Quebec: { gstRate: 0.05, pstRate: 0.09975, hstRate: 0 },
    Saskatchewan: { gstRate: 0.05, pstRate: 0.06, hstRate: 0 },
    Yukon: { gstRate: 0.05, pstRate: 0, hstRate: 0 },
  },
};

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
export default function getSalesTax(
  amount: number,
  province:
    | "Alberta"
    | "British Columbia"
    | "Manitoba"
    | "New Brunswick"
    | "Newfoundland and Labrador"
    | "Nova Scotia"
    | "Northwest Territories"
    | "Nunavut"
    | "Ontario"
    | "Prince Edward Island"
    | "Quebec"
    | "Saskatchewan"
    | "Yukon",
  year: 2025,
): {
  gst: number;
  pst: number;
  hst: number;
  totalTax: number;
  totalAmount: number;
} {
  const rates = SALES_TAX_RATES[year]?.[province];
  if (!rates) {
    throw new Error(
      `Sales tax rates not found for province ${province} and year ${year}`,
    );
  }

  const { gstRate, pstRate, hstRate } = rates;

  const gst = Number((amount * gstRate).toFixed(4));
  const pst = Number((amount * pstRate).toFixed(4));
  const hst = Number((amount * hstRate).toFixed(4));
  const totalTax = Number((gst + pst + hst).toFixed(4));

  return {
    gst,
    pst,
    hst,
    totalTax,
    totalAmount: Number((amount + totalTax).toFixed(4)),
  };
}
