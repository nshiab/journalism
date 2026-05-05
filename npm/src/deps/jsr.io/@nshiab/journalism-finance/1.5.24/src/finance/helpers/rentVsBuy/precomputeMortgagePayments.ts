import { round } from "../../../../../../journalism-format/1.1.7/src/index.js";
import mortgagePayments from "../../mortgagePayments.js";
import variableMortgagePayments from "../../variableMortgagePayments.js";

export default function precomputeMortgagePayments(
  numberOfYears: number,
  startingMortgageAmount: number,
  fixedRateAdjustment: number,
  variableRateAdjustment: number,
  fixedInterestRates: number[],
  variableInterestRates: number[],
  floorRate: number,
) {
  const TERM_YEARS = 5;
  const TERM_MONTHS = TERM_YEARS * 12;
  const AMORTIZATION_YEARS = 25;

  // We precompute all mortgage payments for the entire period for fixed-rate mortgages
  const allFixedMortgagePayments: {
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
  }[] = [];

  for (let month = 0; month < numberOfYears * 12; month += TERM_MONTHS) {
    const effectiveInterestRate = round(
      Math.max(floorRate, fixedInterestRates[month] + fixedRateAdjustment) *
        100,
      { decimals: 2 },
    );
    const mortgageAmount =
      allFixedMortgagePayments[allFixedMortgagePayments.length - 1]
        ? allFixedMortgagePayments[allFixedMortgagePayments.length - 1].balance
        : startingMortgageAmount;
    const payments = mortgagePayments(
      mortgageAmount,
      effectiveInterestRate,
      "monthly",
      TERM_YEARS,
      AMORTIZATION_YEARS - (month / 12),
      { decimals: 2 },
    );

    const effInterestRate = round(effectiveInterestRate / 100, { decimals: 4 });
    const postedIntRate = fixedInterestRates[month];

    for (let i = 0; i < payments.length; i++) {
      const payment = payments[i];
      allFixedMortgagePayments.push({
        paymentId: payment.paymentId,
        payment: payment.payment,
        interest: payment.interest,
        capital: payment.capital,
        balance: payment.balance,
        amountPaid: payment.amountPaid,
        interestPaid: payment.interestPaid,
        capitalPaid: payment.capitalPaid,
        effectiveInterestRate: effInterestRate,
        postedInterestRate: postedIntRate,
        fixedRateAdjustment: fixedRateAdjustment,
        variableRateAdjustment: 0, // No rate adjustment for fixed-rate mortgages
      });
    }
  }

  const allVariableMortgagePayments: {
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
  }[] = [];

  if (variableInterestRates.length < numberOfYears * 12) {
    throw new Error("Not enough variable interest rates provided");
  }

  for (let month = 0; month < numberOfYears * 12; month += TERM_MONTHS) {
    const mortgageAmount =
      allVariableMortgagePayments[allVariableMortgagePayments.length - 1]
        ? allVariableMortgagePayments[allVariableMortgagePayments.length - 1]
          .balance
        : startingMortgageAmount;
    const monthlyEffectiveRates = new Array(TERM_MONTHS);
    for (let i = 0; i < TERM_MONTHS; i++) {
      monthlyEffectiveRates[i] = round(
        Math.max(
          floorRate,
          variableInterestRates[month + i] + variableRateAdjustment,
        ) * 100,
        { decimals: 2 },
      );
    }
    const payments = variableMortgagePayments(
      mortgageAmount,
      monthlyEffectiveRates,
      TERM_YEARS,
      AMORTIZATION_YEARS - (month / 12),
      {
        decimals: 2,
      },
    );

    for (let i = 0; i < payments.length; i++) {
      const payment = payments[i];
      allVariableMortgagePayments.push({
        paymentId: payment.paymentId,
        payment: payment.payment,
        interest: payment.interest,
        capital: payment.capital,
        balance: payment.balance,
        amountPaid: payment.amountPaid,
        interestPaid: payment.interestPaid,
        capitalPaid: payment.capitalPaid,
        effectiveInterestRate: round(payment.rate / 100, { decimals: 4 }),
        postedInterestRate: variableInterestRates[month + i],
        fixedRateAdjustment: 0, // No rate adjustment for variable-rate mortgages
        variableRateAdjustment: variableRateAdjustment,
      });
    }
  }

  return { allFixedMortgagePayments, allVariableMortgagePayments };
}
