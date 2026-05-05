import type { Province } from "./getSalesTax.js";
/**
 * Valid Canadian metropolitan markets for Land Transfer Tax calculations.
 */
export type City = "Toronto" | "Montreal" | "Calgary" | "Ottawa" | "Edmonton" | "Winnipeg" | "Vancouver" | "Hamilton" | "Quebec" | "Halifax" | "London" | "Saskatoon" | "Kitchener-Waterloo" | "Regina" | "Victoria" | "Barrie" | "Guelph" | "Kingston" | "Fredericton" | "Moncton" | "Saint John (NB)" | "Saint John's (NL)";
/**
 * Returns the province associated with a given city.
 */
export declare function getProvinceFromCity(city: City): Province;
/**
 * Calculates the standard Land Transfer Tax (or equivalent registration fee)
 * for a given city and property value based on 2026 tax frameworks.
 * * * **Rebate Limitations and Exclusions:**
 * The `firstTimeOwner` parameter applies structural, point-of-sale land transfer tax
 * rebates assuming the buyer meets all idealized programmatic criteria (e.g., absolute
 * zero global ownership history, Canadian citizenship/PR, and continuous provincial residency).
 * * * The following rebates and subsidies are INTENTIONALLY EXCLUDED from this calculation:
 * - **Nova Scotia:** The First-Time Home Buyers Rebate is excluded because it is restricted
 * exclusively to a refund on the provincial portion of the HST for *newly built* properties,
 * not the 1.5% municipal Deed Transfer Tax calculated here.
 * - **Montreal (HPAP) & Quebec City (Programme Accès Famille):** Excluded because they operate
 * as localized financial grants or down payment assistance loans requiring specific household
 * compositions (e.g., dependents under 18) or new-build environmental certifications, rather
 * than structural tax base reductions.
 * - **Manitoba & Quebec (2026 Provincial):** Excluded because their respective FTHB relief
 * amounts are general income tax credits claimed on annual tax returns in the spring/fall,
 * not an upfront point-of-sale deduction from the land transfer tax.
 * * @param city - The metropolitan market.
 * @param propertyValue - The fair market value or purchase price of the property.
 * @param year - The tax year (currently only 2026 is supported).
 * @param firstTimeOwner - Indicates if the purchaser qualifies for strict FTHB exemptions.
 * @returns The total calculated transaction friction cost in Canadian Dollars.
 */
export default function getLandTransferTax(city: City, propertyValue: number, year: 2026, firstTimeOwner?: boolean): number;
//# sourceMappingURL=getLandTransferTax.d.ts.map