// Fast 2-decimal rounding via pure arithmetic (avoids toFixed string allocations).
const r2 = (x) => Math.round(x * 100) / 100;
export default function incrementParameters(monthIndex, persona, rates) {
    // We increment the variables for following month
    // Renter
    if (persona.params.monthlyRent > 0) {
        persona.params.monthlyInsurance += r2(persona.params.monthlyInsurance *
            rates.renterInsuranceIncrease[monthIndex]);
        persona.params.monthlyRent += r2(persona.params.monthlyRent *
            rates.rentIncrease[monthIndex]);
    }
    // Buyer
    if (persona.params.homeValue > 0) {
        persona.params.homeValue = r2((1 + rates.appreciationIncrease[monthIndex]) * persona.params.homeValue);
        persona.params.monthlyInsurance += r2(persona.params.monthlyInsurance *
            rates.ownerInsuranceIncrease[monthIndex]);
        persona.params.monthlyPropertyTax += r2(persona.params.monthlyPropertyTax *
            rates.propertyTaxIncrease[monthIndex]);
        persona.params.monthlyCondoFees += r2(persona.params.monthlyCondoFees *
            rates.condoFeeIncrease[monthIndex]);
        persona.params.sellingFixedFees = r2(persona.params.sellingFixedFees + persona.params.sellingFixedFees *
            rates.sellingFixedFeesIncrease[monthIndex]);
        persona.params.monthlyMaintenanceCost += r2(persona.params.monthlyMaintenanceCost *
            rates.maintenanceIncrease[monthIndex]);
    }
}
