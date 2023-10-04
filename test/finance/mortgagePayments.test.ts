import assert from "assert"
import mortgagePayments from "../../src/finance/mortgagePayments.js"

describe("mortgagePayments", () => {
    it("should return the monthly mortgage payments for a $250k loan with a 6.00% rate.", () => {
        // Checking against https://www.yorku.ca/amarshal/CMTGMONT.xls
        const payments = mortgagePayments(250_000, 6, "monthly", 5, 25)
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 1599.52,
                    interest: 1234.66,
                    capital: 364.86,
                    balance: 249635.14,
                    amountPaid: 1599.52,
                    interestPaid: 1234.66,
                    capitalPaid: 364.86,
                },
                lastPayment: {
                    paymentId: 59,
                    payment: 1599.52,
                    interest: 1111.58,
                    capital: 487.93,
                    balance: 224591.84,
                    amountPaid: 95970.99,
                    interestPaid: 70562.76,
                    capitalPaid: 25408.23,
                },
            }
        )
    })
    it("should return the monthly mortgage payments for a $250k loan with a 6.00% rate, and add an id.", () => {
        const payments = mortgagePayments(250_000, 6, "monthly", 5, 25, {
            id: "monthly",
        })
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    id: "monthly",
                    paymentId: 0,
                    payment: 1599.52,
                    interest: 1234.66,
                    capital: 364.86,
                    balance: 249635.14,
                    amountPaid: 1599.52,
                    interestPaid: 1234.66,
                    capitalPaid: 364.86,
                },
                lastPayment: {
                    id: "monthly",
                    paymentId: 59,
                    payment: 1599.52,
                    interest: 1111.58,
                    capital: 487.93,
                    balance: 224591.84,
                    amountPaid: 95970.99,
                    interestPaid: 70562.76,
                    capitalPaid: 25408.23,
                },
            }
        )
    })
    it("should return the accelerated weekly mortgage payments for a $250k loan with a 6.00% rate.", () => {
        // Checking against https://www.yorku.ca/amarshal/CMTG1WKT.xls
        const payments = mortgagePayments(
            250_000,
            6,
            "acceleratedWeekly",
            5,
            25
        )
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 399.88,
                    interest: 283.6,
                    capital: 116.28,
                    balance: 249883.72,
                    amountPaid: 399.88,
                    interestPaid: 283.6,
                    capitalPaid: 116.28,
                },
                lastPayment: {
                    paymentId: 259,
                    payment: 399.88,
                    interest: 243.91,
                    capital: 155.96,
                    balance: 214859.68,
                    amountPaid: 103968.58,
                    interestPaid: 68828.27,
                    capitalPaid: 35140.31,
                },
            }
        )
    })
    it("should return the monthly mortgage payments for a $700k loan with a 2.34% rate and a 30-year amortization.", () => {
        // Checking against https://www.mikesukmanowsky.com/blog/a-guide-to-canadian-mortgage-calculations and https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/
        const payments = mortgagePayments(700_000, 2.34, "monthly", 5, 30)
        const firstPayment = payments[0]
        const fifthPayment = payments[4]

        assert.deepStrictEqual(
            { firstPayment, fifthPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 2703.9,
                    interest: 1358.39,
                    capital: 1345.5,
                    balance: 698654.5,
                    amountPaid: 2703.9,
                    interestPaid: 1358.39,
                    capitalPaid: 1345.5,
                },
                fifthPayment: {
                    paymentId: 4,
                    payment: 2703.9,
                    interest: 1347.92,
                    capital: 1355.98,
                    balance: 693246.32,
                    amountPaid: 13519.49,
                    interestPaid: 6765.8,
                    capitalPaid: 6753.68,
                },
            }
        )
    })
    it("should return the monthly mortgage payments for a $100k loan with a 5.00% rate.", () => {
        // Checking against https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MCCalc-CHCalc-eng.aspx and https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/
        const payments = mortgagePayments(100_000, 5, "monthly", 5, 25)
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 581.6,
                    interest: 412.39,
                    capital: 169.21,
                    balance: 99830.79,
                    amountPaid: 581.6,
                    interestPaid: 412.39,
                    capitalPaid: 169.21,
                },
                lastPayment: {
                    paymentId: 59,
                    payment: 581.6,
                    interest: 365.89,
                    capital: 215.72,
                    balance: 88507.53,
                    amountPaid: 34896.3,
                    interestPaid: 23403.81,
                    capitalPaid: 11492.49,
                },
            }
        )
    })
    it("should return the semi-montlhy mortgage payments for a $100k loan with a 5.00% rate.", () => {
        // Checking against https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MCCalc-CHCalc-eng.aspx and https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/
        const payments = mortgagePayments(100_000, 5, "semiMonthly", 5, 25)
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 290.8,
                    interest: 205.98,
                    capital: 84.82,
                    balance: 99915.18,
                    amountPaid: 290.8,
                    interestPaid: 205.98,
                    capitalPaid: 84.82,
                },
                lastPayment: {
                    paymentId: 119,
                    payment: 290.8,
                    interest: 182.45,
                    capital: 108.35,
                    balance: 88466.77,
                    amountPaid: 34896.3,
                    interestPaid: 23363.12,
                    capitalPaid: 11533.18,
                },
            }
        )
    })
    it("should return the bi-weekly mortgage payments for a $100k loan with a 5.00% rate.", () => {
        // Checking against https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MCCalc-CHCalc-eng.aspx and https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/
        const payments = mortgagePayments(100_000, 5, "biWeekly", 5, 25)
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 268.43,
                    interest: 189.6,
                    capital: 78.83,
                    balance: 99921.17,
                    amountPaid: 268.43,
                    interestPaid: 189.6,
                    capitalPaid: 78.83,
                },
                lastPayment: {
                    paymentId: 129,
                    payment: 268.43,
                    interest: 167.78,
                    capital: 100.65,
                    balance: 88390.97,
                    amountPaid: 34896.3,
                    interestPaid: 23287.25,
                    capitalPaid: 11609.05,
                },
            }
        )
    })
    it("should return the accelerated bi-weekly mortgage payments for a $100k loan with a 5.00% rate.", () => {
        // Checking against https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MCCalc-CHCalc-eng.aspx and https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/
        const payments = mortgagePayments(
            100_000,
            5,
            "acceleratedBiWeekly",
            5,
            25
        )
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 290.8,
                    interest: 189.6,
                    capital: 101.2,
                    balance: 99898.8,
                    amountPaid: 290.8,
                    interestPaid: 189.6,
                    capitalPaid: 101.2,
                },
                lastPayment: {
                    paymentId: 129,
                    payment: 290.8,
                    interest: 161.59,
                    capital: 129.21,
                    balance: 85096.72,
                    amountPaid: 37804.32,
                    interestPaid: 22901.02,
                    capitalPaid: 14903.3,
                },
            }
        )
    })
    it("should return the weekly mortgage payments for a $100k loan with a 5.00% rate.", () => {
        // Checking against https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MCCalc-CHCalc-eng.aspx and https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/
        const payments = mortgagePayments(100_000, 5, "weekly", 5, 25)
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 134.22,
                    interest: 94.76,
                    capital: 39.46,
                    balance: 99960.54,
                    amountPaid: 134.22,
                    interestPaid: 94.76,
                    capitalPaid: 39.46,
                },
                lastPayment: {
                    paymentId: 259,
                    payment: 134.22,
                    interest: 83.79,
                    capital: 50.43,
                    balance: 88372.08,
                    amountPaid: 34896.3,
                    interestPaid: 23268.49,
                    capitalPaid: 11627.81,
                },
            }
        )
    })
    it("should return the accelerated weekly mortgage payments for a $100k loan with a 5.00% rate.", () => {
        // Checking against https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MCCalc-CHCalc-eng.aspx and https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/
        const payments = mortgagePayments(
            100_000,
            5,
            "acceleratedWeekly",
            5,
            25
        )
        const firstPayment = payments[0]
        const lastPayment = payments[payments.length - 1]
        assert.deepStrictEqual(
            { firstPayment, lastPayment },
            {
                firstPayment: {
                    paymentId: 0,
                    payment: 145.4,
                    interest: 94.76,
                    capital: 50.64,
                    balance: 99949.36,
                    amountPaid: 145.4,
                    interestPaid: 94.76,
                    capitalPaid: 50.64,
                },
                lastPayment: {
                    paymentId: 259,
                    payment: 145.4,
                    interest: 80.68,
                    capital: 64.72,
                    balance: 85076.43,
                    amountPaid: 37804.32,
                    interestPaid: 22880.74,
                    capitalPaid: 14923.59,
                },
            }
        )
    })
})
