import assert from "assert"
import mortgagePayments from "../../src/finance/mortgagePayments.js"

describe("mortgagePayments", () => {
    it("should return the monthly mortgage payments for a $250k loan with a 6.00% rate.", () => {
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
                    capital: 487.94,
                    balance: 224591.46,
                    amountPaid: 95971.2,
                    interestPaid: 70562.71,
                    capitalPaid: 25408.49,
                },
            }
        )
    })
    it("should return the accelerated weekly mortgage payments for a $250k loan with a 5.00% rate.", () => {
        const payments = mortgagePayments(
            250_000,
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
                    payment: 363.5,
                    interest: 236.89,
                    capital: 126.61,
                    balance: 249873.39,
                    amountPaid: 363.5,
                    interestPaid: 236.89,
                    capitalPaid: 126.61,
                },
                lastPayment: {
                    paymentId: 259,
                    payment: 363.5,
                    interest: 201.69,
                    capital: 161.81,
                    balance: 212691.95,
                    amountPaid: 94510,
                    interestPaid: 57201.94,
                    capitalPaid: 37308.06,
                },
            }
        )
    })
})
