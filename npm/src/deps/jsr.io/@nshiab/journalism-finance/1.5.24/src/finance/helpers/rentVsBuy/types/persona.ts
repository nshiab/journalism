export type Persona = {
  params: {
    monthlyRent: number;
    monthlyInsurance: number;
    securityDeposit: number;
    downPayment: number;
    purchasePrice: number;
    homeValue: number;
    fixedRateAdjustment: number;
    variableRateAdjustment: number;
    purchaseFixedFees: number;
    monthlyMaintenanceCost: number;
    monthlyPropertyTax: number;
    monthlyCondoFees: number;
    sellingFixedFees: number;
    sellingCommissionRate: number;
    landTransferTax: number;
    insurancePremium: number;
    floorRate: number;
    investsSavings: boolean;
  };
  monthlyExpenses: {
    mortgageCapital: number;
    mortgageInterests: number;
    rent: number;
    insurance: number;
    securityDeposit: number;
    maintenance: number;
    propertyTax: number;
    condoFees: number;
    downPayment: number;
    purchaseFixedFees: number;
    landTransferTax: number;
    insurancePremium: number;
    tfsaFees: number;
    stocksFees: number;
  };
  cumulativeExpenses: {
    rent: number;
    insurance: number;
    securityDeposit: number;
    mortgageCapital: number;
    mortgageInterests: number;
    maintenance: number;
    propertyTax: number;
    condoFees: number;
    downPayment: number;
    purchaseFixedFees: number;
    landTransferTax: number;
    insurancePremium: number;
    tfsaFees: number;
    stocksFees: number;
  };
  monthlyGains: {
    tfsaGains: number;
    tfsaContribution: number;
    stocksGains: number;
    newStocks: number;
    homeEquityGains: number;
  };
  cumulativeGains: {
    tfsaGains: number;
    tfsaContribution: number;
    stocksGains: number;
    newStocks: number;
    homeEquityGains: number;
  };
  assets: {
    tfsa: number;
    stocks: number;
    securityDeposit: number;
    homeEquity: number;
  };
  summary: { balance: number };
  summaryCumulative: {
    balance: number;
    balanceAfterSelling: number;
  };
  saleCosts: {
    stockTaxes: number;
    homeSellingCommission: number;
    homeSellingFixedFees: number;
    mortgagePenalty: number;
    mortgageBalance: number;
  };
  saleNetGains: {
    stockSellingGains: number;
    tfsaSellingGains: number;
    homeSellingGains: number;
    securityDeposit: number;
  };
};
