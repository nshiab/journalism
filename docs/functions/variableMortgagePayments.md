[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / variableMortgagePayments

# Function: variableMortgagePayments()

> **variableMortgagePayments**(`mortgageAmount`, `rates`, `term`, `amortizationPeriod`, `options?`): `object`[]

Calculates and returns a detailed schedule of variable-rate monthly mortgage payments (VRM). This function models a Variable Rate Mortgage where the payment amount stays FIXED for the term, but rate changes affect how much goes to interest vs. principal. If rates rise too high, payments may not cover interest, causing negative amortization (balance increases).

## Parameters

### mortgageAmount

`number`

The total amount of the mortgage loan.

### rates

`number`[]

An array of annual interest rates (e.g., `[6.00, 6.00, 5.50, 5.50, ...]` for rates in percentages). The array must contain at least as many rates as there are payments in the term. Each element corresponds to the rate for that payment period (0-based index).

### term

`number`

The term of the mortgage in years. This is the length of the current mortgage contract.

### amortizationPeriod

`number`

The total amortization period of the mortgage in years. This is the total time it will take to pay off the mortgage.

### options?

Additional options for customizing the mortgage calculation and output.

#### annualCompounding?

`number`

The number of times the mortgage interest should be compounded per year. Defaults to `12` (monthly compounding). Set to `2` for semi-annual compounding as is standard in Canada.

#### debug?

`boolean`

If `true`, enables debug logging to the console, providing additional insights into the calculation process. Defaults to `false`.

#### decimals?

`number`

The number of decimal places to round the financial values (payment, interest, capital, balance) to. Defaults to `2`.

#### id?

`string`

An optional string ID to be added to each payment object in the returned array. Useful for tracking payments related to a specific mortgage.

## Returns

`object`[]

An array of objects, where each object represents a single mortgage payment and contains:
  - `paymentId`: A 0-based index for the payment.
  - `payment`: The total amount of the payment (fixed for the term).
  - `interest`: The portion that goes towards interest (varies with rate changes).
  - `capital`: The portion that goes towards the principal (can be negative during negative amortization).
  - `balance`: The remaining mortgage balance after the payment (can increase if interest exceeds payment).
  - `amountPaid`: The cumulative total amount paid so far.
  - `interestPaid`: The cumulative total interest paid so far.
  - `capitalPaid`: The cumulative total capital reimbursed so far (can be negative).
  - `rate`: The annual interest rate in effect for this payment.
  - `id` (optional): The ID provided in `options.id`.

## Throws

If the `amortizationPeriod` is less than the `term`, as this is an invalid mortgage configuration.

## Throws

If the `rates` array does not contain enough rates for all payments in the term.

## Example

```ts
// VRM: Payment stays fixed, but rate changes affect interest/principal split
// If rates rise high enough, balance can increase (negative amortization)
const rates = [
  ...Array(12).fill(6),    // Months 0-11 at 6%
  ...Array(12).fill(5.5),  // Months 12-23 at 5.5% (more goes to principal)
  ...Array(36).fill(7.5)   // Months 24-59 at 7.5% (might trigger negative amortization)
];
const payments = variableMortgagePayments(250_000, rates, 5, 25);
console.log(payments[0]);  // Payment amount set based on initial rate
console.log(payments[12]); // Same payment, but less interest (rate dropped)
console.log(payments[24]); // Same payment, but more interest (rate increased)
```
