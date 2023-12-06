import assert from "assert"
import mortgageMaxAmount from "../../src/finance/mortgageMaxAmount.js"

// Tested against https://itools-ioutils.fcac-acfc.gc.ca/MQ-HQ/MQCalc-EAPHCalc-eng.aspx

describe("mortgageMaxAmount", () => {
    it("should return a purchase price of $0k with an income of $0k, down payment of $0k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(0, 0, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 0,
            downPayment: 0,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 0,
            mortgageAmount: 0,
            insurancePremium: 0,
            monthlyMortgagePayment: 0,
            grossDebtServiceRatio: 0,
            totalDebtServiceRatio: 0,
            reason: "Gross debt service ratio would be above threshold of 0.32 and total debt service ratio would be above threshold of 0.4 with a bigger amount.",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 0,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $25k with an income of $0k, down payment of $25k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(0, 25_000, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 0,
            downPayment: 25000,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 25000,
            mortgageAmount: 0,
            insurancePremium: 0,
            monthlyMortgagePayment: 0,
            grossDebtServiceRatio: 0,
            totalDebtServiceRatio: 0,
            reason: "Gross debt service ratio would be above threshold of 0.32 and total debt service ratio would be above threshold of 0.4 with a bigger amount.",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 31.25,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $32k with an income of $10k, down payment of $25k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(10_000, 25_000, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 10000,
            downPayment: 25000,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 32000,
            mortgageAmount: 7000,
            insurancePremium: 0,
            monthlyMortgagePayment: 50.11,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 41.25,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $155k with an income of $50k, down payment of $25k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(50_000, 25_000, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 50000,
            downPayment: 25000,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 155000,
            mortgageAmount: 133640,
            insurancePremium: 3640,
            monthlyMortgagePayment: 956.75,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 195,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $0k with an income of $100k, down payment of $0k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(100_000, 0, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 0,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 0,
            mortgageAmount: 0,
            insurancePremium: 0,
            monthlyMortgagePayment: 0,
            grossDebtServiceRatio: 0.02,
            totalDebtServiceRatio: 0.02,
            reason: "Maximum purchase price allowed with a down payment of 0. The down payment must be at least 5% of the purchase price.",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 0,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $0k with an income of $100k, down payment of $5k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(100_000, 5_000, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 5000,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 100000,
            mortgageAmount: 98800,
            insurancePremium: 3800,
            monthlyMortgagePayment: 707.33,
            grossDebtServiceRatio: 0.12,
            totalDebtServiceRatio: 0.12,
            reason: "Maximum purchase price allowed with a down payment of 5000. The down payment must be at least 5% of the purchase price.",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 125,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $307k with an income of $100k, down payment of $25k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 307000,
            mortgageAmount: 293280,
            insurancePremium: 11280,
            monthlyMortgagePayment: 2099.65,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 385,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $332k with an income of $100k, down payment of $50k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(100_000, 50_000, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 50000,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 332000,
            mortgageAmount: 289896,
            insurancePremium: 7896,
            monthlyMortgagePayment: 2075.42,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 416.25,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $360k with an income of $100k, down payment of $75k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(100_000, 75_000, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 75000,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 360000,
            mortgageAmount: 285000,
            insurancePremium: 0,
            monthlyMortgagePayment: 2040.37,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 451.25,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $381k with an income of $100k, down payment of $100k, and a rate of 5.25%", () => {
        const results = mortgageMaxAmount(100_000, 100_000, 5.25)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 100000,
            rate: 5.25,
            rateTested: 7.25,
            purchasePrice: 381000,
            mortgageAmount: 281000,
            insurancePremium: 0,
            monthlyMortgagePayment: 2011.73,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 477.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $355k with an income of $100k, down payment of $25k, and a rate of 1.00%", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 1)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 1,
            rateTested: 5.25,
            purchasePrice: 355000,
            mortgageAmount: 343200,
            insurancePremium: 13200,
            monthlyMortgagePayment: 2045.19,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 445,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $355k with an income of $100k, down payment of $25k, and a rate of 3.00%", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 3)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 3,
            rateTested: 5.25,
            purchasePrice: 355000,
            mortgageAmount: 343200,
            insurancePremium: 13200,
            monthlyMortgagePayment: 2045.19,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 445,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $336k with an income of $100k, down payment of $25k, and a rate of 4.00%", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 4)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 4,
            rateTested: 6,
            purchasePrice: 336000,
            mortgageAmount: 323440,
            insurancePremium: 12440,
            monthlyMortgagePayment: 2069.39,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 421.25,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $313k with an income of $100k, down payment of $25k, and a rate of 5.00%", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 313000,
            mortgageAmount: 299520,
            insurancePremium: 11520,
            monthlyMortgagePayment: 2097.89,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 392.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $274k with an income of $100k, down payment of $25k, and a rate of 7.00%", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 7)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 7,
            rateTested: 9,
            purchasePrice: 274000,
            mortgageAmount: 258960,
            insurancePremium: 9960,
            monthlyMortgagePayment: 2144.13,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 343.75,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $231k with an income of $100k, down payment of $25k, and a rate of 10.00%", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 10)
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 10,
            rateTested: 12,
            purchasePrice: 231000,
            mortgageAmount: 212386,
            insurancePremium: 6386,
            monthlyMortgagePayment: 2191.61,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 290,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $313k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly debt payment of $0.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyDebtPayment: 0,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 313000,
            mortgageAmount: 299520,
            insurancePremium: 11520,
            monthlyMortgagePayment: 2097.89,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 392.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $313k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly debt payment of $50.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyDebtPayment: 50,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 313000,
            mortgageAmount: 299520,
            insurancePremium: 11520,
            monthlyMortgagePayment: 2097.89,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.33,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 50,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 392.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $313k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly debt payment of $100.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyDebtPayment: 100,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 313000,
            mortgageAmount: 299520,
            insurancePremium: 11520,
            monthlyMortgagePayment: 2097.89,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.33,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 100,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 392.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $313k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly debt payment of $250.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyDebtPayment: 250,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 313000,
            mortgageAmount: 299520,
            insurancePremium: 11520,
            monthlyMortgagePayment: 2097.89,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.35,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 250,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 392.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $313k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly debt payment of $500.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyDebtPayment: 500,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 313000,
            mortgageAmount: 299520,
            insurancePremium: 11520,
            monthlyMortgagePayment: 2097.89,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.38,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 500,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 392.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $303k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly debt payment of $750.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyDebtPayment: 750,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 303000,
            mortgageAmount: 289120,
            insurancePremium: 11120,
            monthlyMortgagePayment: 2025.04,
            grossDebtServiceRatio: 0.31,
            totalDebtServiceRatio: 0.4,
            reason: "Total debt service ratio would be above threshold of 0.4 with a bigger amount",
            monthlyDebtPayment: 750,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 380,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $333k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly heating cost of $1.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyHeating: 1,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 333000,
            mortgageAmount: 320320,
            insurancePremium: 12320,
            monthlyMortgagePayment: 2243.57,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 1,
            isHeatingEstimate: false,
            monthlyTax: 417.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $322k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly heating cost of $100.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyHeating: 100,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 322000,
            mortgageAmount: 308880,
            insurancePremium: 11880,
            monthlyMortgagePayment: 2163.44,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 100,
            isHeatingEstimate: false,
            monthlyTax: 403.75,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $304k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly heating cost of $250.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyHeating: 250,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 304000,
            mortgageAmount: 290160,
            insurancePremium: 11160,
            monthlyMortgagePayment: 2032.33,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 250,
            isHeatingEstimate: false,
            monthlyTax: 381.25,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $304k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly heating cost of $500.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyHeating: 500,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 275000,
            mortgageAmount: 260000,
            insurancePremium: 10000,
            monthlyMortgagePayment: 1821.08,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 500,
            isHeatingEstimate: false,
            monthlyTax: 345,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $366k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly tax cost of $1.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyTax: 1,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 366000,
            mortgageAmount: 354640,
            insurancePremium: 13640,
            monthlyMortgagePayment: 2483.95,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 1,
            isTaxEstimate: false,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $298k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly tax cost of $500.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyTax: 500,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 298000,
            mortgageAmount: 283920,
            insurancePremium: 10920,
            monthlyMortgagePayment: 1988.62,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 500,
            isTaxEstimate: false,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $231k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly tax cost of $1k.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyTax: 1000,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 231000,
            mortgageAmount: 212386,
            insurancePremium: 6386,
            monthlyMortgagePayment: 1487.59,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 1000,
            isTaxEstimate: false,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $313k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly condo fees of $0.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyCondoFees: 0,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 313000,
            mortgageAmount: 299520,
            insurancePremium: 11520,
            monthlyMortgagePayment: 2097.89,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 392.5,
            isTaxEstimate: true,
            monthlyCondoFees: 0,
        })
    })
    it("should return a purchase price of $301k with an income of $100k, down payment of $25k, a rate of 5.00%, and monthly condo fees of $100.", () => {
        const results = mortgageMaxAmount(100_000, 25_000, 5, {
            monthlyCondoFees: 100,
        })
        assert.deepStrictEqual(results, {
            annualIncome: 100000,
            downPayment: 25000,
            rate: 5,
            rateTested: 7,
            purchasePrice: 301000,
            mortgageAmount: 287040,
            insurancePremium: 11040,
            monthlyMortgagePayment: 2010.47,
            grossDebtServiceRatio: 0.32,
            totalDebtServiceRatio: 0.32,
            reason: "Gross debt service ratio would be above threshold of 0.32 with a bigger amount",
            monthlyDebtPayment: 0,
            monthlyHeating: 175,
            isHeatingEstimate: true,
            monthlyTax: 377.5,
            isTaxEstimate: true,
            monthlyCondoFees: 100,
        })
    })
})
