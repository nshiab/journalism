import getTfsaContribution from "./getTfsaContribution.js";
// Fast 2-decimal rounding via pure arithmetic (avoids toFixed string allocations).
const r2 = (x) => Math.round(x * 100) / 100;
export default function computeGains(year, persona, mortgagePayment, monthlyMarketReturnRate, totalMonthlyExpenses, maxMonthlyExpenses, tfsaContributions, couple, annualInvestmentFeeRate) {
    // We start by calculating the current month TFSA and stock gains.
    // The effective monthly rate nets out the annual investment fee (e.g. ETF MER).
    // Multiplicative combination ensures the fee is charged on the grown balance,
    // not the starting balance (the cross-term r × f/12 is negligible in practice).
    const effectiveMonthlyRate = (1 + monthlyMarketReturnRate) *
        (1 - annualInvestmentFeeRate / 12) - 1;
    // Compute gross and net gains per account, then derive fees as the difference.
    // This avoids rounding discrepancies between the fee tracker and the gain values.
    const tfsaGrossGain = r2(persona.assets.tfsa * monthlyMarketReturnRate);
    const tfsaNetGain = r2(persona.assets.tfsa * effectiveMonthlyRate);
    const stocksGrossGain = r2(persona.assets.stocks * monthlyMarketReturnRate);
    const stocksNetGain = r2(persona.assets.stocks * effectiveMonthlyRate);
    persona.monthlyExpenses.tfsaFees = r2(tfsaGrossGain - tfsaNetGain);
    persona.monthlyExpenses.stocksFees = r2(stocksGrossGain - stocksNetGain);
    persona.cumulativeExpenses.tfsaFees = r2(persona.cumulativeExpenses.tfsaFees + persona.monthlyExpenses.tfsaFees);
    persona.cumulativeExpenses.stocksFees = r2(persona.cumulativeExpenses.stocksFees + persona.monthlyExpenses.stocksFees);
    persona.monthlyGains.tfsaGains = tfsaNetGain;
    persona.monthlyGains.stocksGains = stocksNetGain;
    persona.cumulativeGains.tfsaGains = r2(persona.cumulativeGains.tfsaGains +
        persona.monthlyGains.tfsaGains);
    persona.cumulativeGains.stocksGains = r2(persona.cumulativeGains.stocksGains +
        persona.monthlyGains.stocksGains);
    persona.assets.tfsa = r2(persona.assets.tfsa + tfsaNetGain);
    persona.assets.stocks = r2(persona.assets.stocks + stocksNetGain);
    // We calculate home equity gains
    if (mortgagePayment) {
        const previousHomeEquity = persona.assets.homeEquity;
        persona.assets.homeEquity = r2(persona.params.homeValue -
            mortgagePayment.balance);
        persona.monthlyGains.homeEquityGains = r2(persona.assets.homeEquity -
            previousHomeEquity);
        persona.cumulativeGains.homeEquityGains = r2(persona.cumulativeGains.homeEquityGains +
            persona.monthlyGains.homeEquityGains);
    }
    // Now we deal with any savings from reduced expenses
    let monthlySavings = maxMonthlyExpenses - totalMonthlyExpenses;
    // If the buyer doesn't invest their savings, we skip this part
    if (persona.params.investsSavings === false && monthlySavings > 0) {
        monthlySavings = 0;
    }
    // We check if we can invest these savings in the TFSA first
    if (tfsaContributions && monthlySavings > 0) {
        let tfsaRoom = getTfsaContribution(year, couple
            ? persona.cumulativeGains.tfsaContribution / 2
            : persona.cumulativeGains.tfsaContribution);
        if (couple) {
            tfsaRoom *= 2;
        }
        const tfsaContribution = Math.min(tfsaRoom, monthlySavings);
        persona.monthlyGains.tfsaContribution = tfsaContribution;
        persona.cumulativeGains.tfsaContribution = r2(persona.cumulativeGains.tfsaContribution + tfsaContribution);
        persona.assets.tfsa = r2(persona.assets.tfsa + tfsaContribution);
    }
    else {
        persona.monthlyGains.tfsaContribution = 0;
    }
    // Any remaining savings go into stocks
    monthlySavings = r2(monthlySavings - persona.monthlyGains.tfsaContribution);
    if (monthlySavings > 0) {
        persona.monthlyGains.newStocks = monthlySavings;
        persona.cumulativeGains.newStocks = r2(persona.cumulativeGains.newStocks + monthlySavings);
        persona.assets.stocks = r2(persona.assets.stocks + monthlySavings);
    }
    else {
        persona.monthlyGains.newStocks = 0;
    }
}
