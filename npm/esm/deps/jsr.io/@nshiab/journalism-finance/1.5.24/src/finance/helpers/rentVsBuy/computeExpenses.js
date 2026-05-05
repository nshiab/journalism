// Fast 2-decimal rounding via pure arithmetic (avoids toFixed string allocations).
const r2 = (x) => Math.round(x * 100) / 100;
export default function computeExpenses(monthIndex, persona, mortgagePayment) {
    if (mortgagePayment) {
        // Buyer expenses
        persona.monthlyExpenses.mortgageCapital = mortgagePayment.capital;
        persona.monthlyExpenses.mortgageInterests = mortgagePayment.interest;
        persona.monthlyExpenses.maintenance = persona.params.monthlyMaintenanceCost;
        persona.monthlyExpenses.propertyTax = persona.params.monthlyPropertyTax;
        persona.monthlyExpenses.condoFees = persona.params.monthlyCondoFees;
        persona.monthlyExpenses.insurance = persona.params.monthlyInsurance;
        persona.cumulativeExpenses.mortgageCapital = r2(persona.cumulativeExpenses.mortgageCapital +
            persona.monthlyExpenses.mortgageCapital);
        persona.cumulativeExpenses.mortgageInterests = r2(persona.cumulativeExpenses.mortgageInterests +
            persona.monthlyExpenses.mortgageInterests);
        persona.cumulativeExpenses.insurance = r2(persona.cumulativeExpenses.insurance + persona.monthlyExpenses.insurance);
        persona.cumulativeExpenses.maintenance = r2(persona.cumulativeExpenses.maintenance +
            persona.monthlyExpenses.maintenance);
        persona.cumulativeExpenses.propertyTax = r2(persona.cumulativeExpenses.propertyTax +
            persona.monthlyExpenses.propertyTax);
        persona.cumulativeExpenses.condoFees = r2(persona.cumulativeExpenses.condoFees + persona.monthlyExpenses.condoFees);
        // Non recurring expenses
        if (monthIndex === 0) {
            persona.monthlyExpenses.downPayment = persona.params.downPayment;
            persona.monthlyExpenses.purchaseFixedFees =
                persona.params.purchaseFixedFees;
            persona.monthlyExpenses.landTransferTax = persona.params.landTransferTax;
            persona.monthlyExpenses.insurancePremium =
                persona.params.insurancePremium;
            persona.cumulativeExpenses.downPayment = r2(persona.cumulativeExpenses.downPayment +
                persona.monthlyExpenses.downPayment);
            persona.cumulativeExpenses.purchaseFixedFees = r2(persona.cumulativeExpenses.purchaseFixedFees +
                persona.monthlyExpenses.purchaseFixedFees);
            persona.cumulativeExpenses.landTransferTax = r2(persona.cumulativeExpenses.landTransferTax +
                persona.monthlyExpenses.landTransferTax);
            persona.cumulativeExpenses.insurancePremium = r2(persona.cumulativeExpenses.insurancePremium +
                persona.monthlyExpenses.insurancePremium);
        }
        else {
            persona.monthlyExpenses.downPayment = 0;
            persona.monthlyExpenses.purchaseFixedFees = 0;
            persona.monthlyExpenses.landTransferTax = 0;
            persona.monthlyExpenses.insurancePremium = 0;
        }
    }
    else {
        // Renter expenses
        persona.monthlyExpenses.rent = persona.params.monthlyRent;
        persona.monthlyExpenses.insurance = persona.params.monthlyInsurance;
        persona.cumulativeExpenses.rent = r2(persona.cumulativeExpenses.rent + persona.monthlyExpenses.rent);
        persona.cumulativeExpenses.insurance = r2(persona.cumulativeExpenses.insurance + persona.monthlyExpenses.insurance);
        // Non recurring expenses
        if (monthIndex === 0) {
            persona.monthlyExpenses.securityDeposit = persona.params.securityDeposit;
            persona.cumulativeExpenses.securityDeposit = r2(persona.cumulativeExpenses.securityDeposit +
                persona.monthlyExpenses.securityDeposit);
            // Security deposit is also an asset for the renter
            persona.assets.securityDeposit = persona.params.securityDeposit;
        }
        else {
            persona.monthlyExpenses.securityDeposit = 0;
        }
    }
    const totalMonthlyExpenses = r2(persona.monthlyExpenses.rent +
        persona.monthlyExpenses.insurance +
        persona.monthlyExpenses.securityDeposit +
        persona.monthlyExpenses.mortgageCapital +
        persona.monthlyExpenses.mortgageInterests +
        persona.monthlyExpenses.maintenance +
        persona.monthlyExpenses.propertyTax +
        persona.monthlyExpenses.condoFees +
        persona.monthlyExpenses.downPayment +
        persona.monthlyExpenses.purchaseFixedFees +
        persona.monthlyExpenses.landTransferTax +
        persona.monthlyExpenses.insurancePremium);
    return {
        totalMonthlyExpenses,
    };
}
