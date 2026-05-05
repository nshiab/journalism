// Fast 2-decimal rounding via pure arithmetic (avoids toFixed string allocations).
const r2 = (x) => Math.round(x * 100) / 100;
export default function computeBalances(persona, winVariableOnly, monthIndex, numberOfMonths) {
    if (!winVariableOnly || monthIndex === numberOfMonths - 1) {
        // Monthly balance — field names are statically known, avoid Object.keys/reduce
        const totalMonthlyExpenses = persona.monthlyExpenses.mortgageCapital +
            persona.monthlyExpenses.mortgageInterests +
            persona.monthlyExpenses.rent +
            persona.monthlyExpenses.insurance +
            persona.monthlyExpenses.securityDeposit +
            persona.monthlyExpenses.maintenance +
            persona.monthlyExpenses.propertyTax +
            persona.monthlyExpenses.condoFees +
            persona.monthlyExpenses.downPayment +
            persona.monthlyExpenses.purchaseFixedFees +
            persona.monthlyExpenses.insurancePremium;
        const totalMonthlyGains = persona.monthlyGains.tfsaGains +
            persona.monthlyGains.tfsaContribution +
            persona.monthlyGains.stocksGains +
            persona.monthlyGains.newStocks +
            persona.monthlyGains.homeEquityGains;
        persona.summary.balance = r2(totalMonthlyGains - totalMonthlyExpenses);
        // Cumulative balance
        const totalCumulativeExpenses = persona.cumulativeExpenses.mortgageCapital +
            persona.cumulativeExpenses.mortgageInterests +
            persona.cumulativeExpenses.rent +
            persona.cumulativeExpenses.insurance +
            persona.cumulativeExpenses.securityDeposit +
            persona.cumulativeExpenses.maintenance +
            persona.cumulativeExpenses.propertyTax +
            persona.cumulativeExpenses.condoFees +
            persona.cumulativeExpenses.downPayment +
            persona.cumulativeExpenses.purchaseFixedFees +
            persona.cumulativeExpenses.insurancePremium;
        const totalCumulativeGains = persona.cumulativeGains.tfsaGains +
            persona.cumulativeGains.tfsaContribution +
            persona.cumulativeGains.stocksGains +
            persona.cumulativeGains.newStocks +
            persona.cumulativeGains.homeEquityGains;
        persona.summaryCumulative.balance = r2(totalCumulativeGains - totalCumulativeExpenses);
        // Balance after selling
        const totalSaleNetGains = persona.saleNetGains.stockSellingGains +
            persona.saleNetGains.tfsaSellingGains +
            persona.saleNetGains.homeSellingGains +
            persona.saleNetGains.securityDeposit;
        persona.summaryCumulative.balanceAfterSelling = r2(totalSaleNetGains - totalCumulativeExpenses);
    }
}
