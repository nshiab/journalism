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
})
