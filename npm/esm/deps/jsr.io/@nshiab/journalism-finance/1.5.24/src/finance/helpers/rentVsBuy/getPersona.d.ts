import type { Persona } from "./types/persona.js";
export default function getPersona(parameters: {
    startingMonthlyRent: number;
    securityDeposit: number;
    startingMonthlyInsurance: number;
    downPayment: number;
    purchasePrice: number;
    homeValue: number;
    insurancePremium: number;
    fixedRateAdjustment: number;
    variableRateAdjustment: number;
    purchaseFixedFees: number;
    startingAnnualMaintenanceCost: number;
    startingAnnualPropertyTax: number;
    startingMonthlyCondoFees: number;
    sellingFixedFees: number;
    sellingCommissionRate: number;
    landTransferTax: number;
    floorRate: number;
    investsSavings: boolean;
}): Persona;
//# sourceMappingURL=getPersona.d.ts.map