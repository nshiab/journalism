import getMortgagePenalty from "../../getMortgagePenalty.js";
import type { Persona } from "./types/persona.js";
import type { MortgagePayment } from "./types/mortgagePayment.js";
import getIncomeTax from "../../getIncomeTax.js";

// Fast 2-decimal rounding via pure arithmetic (avoids toFixed string allocations).
const r2 = (x: number) => Math.round(x * 100) / 100;

export default function computeSale(
  monthIndex: number,
  persona: Persona,
  employmentIncome: number,
  mortgagePayment: MortgagePayment | null,
  currentPostedRates: Record<number, number> | null,
  mortgageType: "fixed" | "variable" | null,
  winVariableOnly: boolean,
  numberOfMonths: number,
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
  couple?: boolean,
  salesTaxMultiplier = 0,
) {
  if (!winVariableOnly || monthIndex === numberOfMonths - 1) {
    const TERM_MONTHS = 60;

    // First we calculate the sale costs
    const stockGains = persona.assets.stocks -
      persona.cumulativeGains.newStocks;

    // Note: Stock capital gains taxes are calculated using 2025 rates for all simulation years.
    let stockTaxes: number;
    if (stockGains <= 0) {
      // No taxable gains — skip the income tax call entirely.
      stockTaxes = 0;
    } else {
      stockTaxes = getIncomeTax(employmentIncome, province, 2025, {
        capitalGains: couple ? stockGains / 2 : stockGains,
        quebec: {
          ramq: false,
        },
      }).capitalGainsTax;

      if (couple) {
        stockTaxes *= 2;
      }
    }

    persona.saleCosts.stockTaxes = stockTaxes;

    // Then we calculate the home selling costs
    if (mortgagePayment && currentPostedRates && mortgageType) {
      // Sales tax included. Note: Sales taxes are calculated using 2025 rates for all simulation years.
      persona.saleCosts.homeSellingCommission = r2(
        persona.params.homeValue * persona.params.sellingCommissionRate *
          (1 + salesTaxMultiplier),
      );
      // Sales tax included. Note: Sales taxes are calculated using 2025 rates for all simulation years.
      persona.saleCosts.homeSellingFixedFees = r2(
        persona.params.sellingFixedFees * (1 + salesTaxMultiplier),
      );
      const remainingMonthsToTerm = TERM_MONTHS - (monthIndex % TERM_MONTHS) -
        1;

      const mortgagePenalty = getMortgagePenalty({
        remainingMonthsToTerm,
        mortgageBalance: mortgagePayment.balance,
        postedInterestRate: mortgagePayment.effectiveInterestRate,
        rateAdjustmentFixed: 0,
        rateAdjustmentVariable: 0,
        currentPostedRates: currentPostedRates,
        mortgageType,
      });
      persona.saleCosts.mortgagePenalty = mortgagePenalty;
      persona.saleCosts.mortgageBalance = mortgagePayment.balance;
    }

    // Now we calculate the sale gains
    persona.saleNetGains.stockSellingGains = r2(
      persona.assets.stocks -
        persona.saleCosts.stockTaxes,
    );
    persona.saleNetGains.tfsaSellingGains = persona.assets.tfsa;
    persona.saleNetGains.homeSellingGains = r2(
      persona.params.homeValue -
        persona.saleCosts.homeSellingCommission -
        persona.saleCosts.homeSellingFixedFees -
        persona.saleCosts.mortgagePenalty - persona.saleCosts.mortgageBalance,
    );
    persona.saleNetGains.securityDeposit = persona.assets.securityDeposit;
  }
}
