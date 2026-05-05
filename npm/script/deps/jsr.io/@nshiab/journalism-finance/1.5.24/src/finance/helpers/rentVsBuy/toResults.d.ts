import type { MortgagePayment } from "./types/mortgagePayment.js";
import type { Persona } from "./types/persona.js";
export default function toResults(category: "renter" | "buyerFixed" | "buyerVariable", persona: Persona, results: ({
    monthIndex: number;
    amount: number;
    category: "renter" | "buyerFixed" | "buyerVariable";
} & ({
    group: "monthlyExpenses" | "cumulativeExpenses";
    variable: "rent" | "insurance" | "securityDeposit" | "mortgageCapital" | "mortgageInterests" | "maintenance" | "propertyTax" | "condoFees" | "downPayment" | "purchaseFixedFees" | "landTransferTax" | "insurancePremium" | "tfsaFees" | "stocksFees";
    effectiveInterestRate?: number;
    postedInterestRate?: number;
    fixedRateAdjustment?: number;
    variableRateAdjustment?: number;
} | {
    group: "monthlyGains" | "cumulativeGains";
    variable: "tfsaGains" | "tfsaContribution" | "stocksGains" | "newStocks" | "homeEquityGains";
    homeValue?: number;
} | {
    group: "assets";
    variable: "tfsa" | "stocks" | "securityDeposit" | "homeEquity";
} | {
    group: "summary";
    variable: "balance";
} | {
    group: "summaryCumulative";
    variable: "balance" | "balanceAfterSelling";
} | {
    group: "saleCosts";
    variable: "stockTaxes" | "homeSellingCommission" | "homeSellingFixedFees" | "mortgagePenalty" | "mortgageBalance";
    employmentIncome?: number;
} | {
    group: "saleNetGains";
    variable: "stockSellingGains" | "tfsaSellingGains" | "homeSellingGains" | "securityDeposit";
} | {
    group: "totals";
    variable: "monthlyExpenses" | "cumulativeExpenses" | "monthlyGains" | "cumulativeGains" | "assets" | "saleCosts" | "saleNetGains";
}))[], monthIndex: number, numberOfMonths: number, winVariableOnly: boolean, mortgagePayment: MortgagePayment | null, employmentIncome: number | null, inflationMultiplier: number, onRecord?: (category: string, group: string, variable: string, monthIndex: number, amount: number) => void, winVariable?: "balance" | "balanceAfterSelling" | "assets", groups?: string[]): void;
//# sourceMappingURL=toResults.d.ts.map