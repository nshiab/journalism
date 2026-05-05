export default function precomputeMortgagePayments(numberOfYears: number, startingMortgageAmount: number, fixedRateAdjustment: number, variableRateAdjustment: number, fixedInterestRates: number[], variableInterestRates: number[], floorRate: number): {
    allFixedMortgagePayments: {
        paymentId: number;
        payment: number;
        interest: number;
        capital: number;
        balance: number;
        amountPaid: number;
        interestPaid: number;
        capitalPaid: number;
        effectiveInterestRate: number;
        postedInterestRate: number;
        fixedRateAdjustment: number;
        variableRateAdjustment: number;
    }[];
    allVariableMortgagePayments: {
        paymentId: number;
        payment: number;
        interest: number;
        capital: number;
        balance: number;
        amountPaid: number;
        interestPaid: number;
        capitalPaid: number;
        effectiveInterestRate: number;
        postedInterestRate: number;
        fixedRateAdjustment: number;
        variableRateAdjustment: number;
    }[];
};
//# sourceMappingURL=precomputeMortgagePayments.d.ts.map