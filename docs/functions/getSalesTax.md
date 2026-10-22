[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / getSalesTax

# Function: getSalesTax()

> **getSalesTax**(`amount`, `province`, `year`): `object`

Defined in: [journalism-finance/src/finance/getSalesTax.ts:61](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/getSalesTax.ts#L61)

Calculates the Canadian sales tax for a given amount, province, and year.

## Parameters

### amount

`number`

The base amount before tax.

### province

`"Newfoundland and Labrador"` \| `"Prince Edward Island"` \| `"Nova Scotia"` \| `"New Brunswick"` \| `"Quebec"` \| `"Ontario"` \| `"Manitoba"` \| `"Saskatchewan"` \| `"Alberta"` \| `"British Columbia"` \| `"Yukon"` \| `"Northwest Territories"` \| `"Nunavut"`

The province or territory.

### year

`2025`

The tax year.

## Returns

`object`

An object containing the breakdown of taxes and the total amount.

### gst

> **gst**: `number`

### hst

> **hst**: `number`

### pst

> **pst**: `number`

### totalAmount

> **totalAmount**: `number`

### totalTax

> **totalTax**: `number`

## Example

```ts
const salesTax = getSalesTax(100, "Quebec", 2025);
console.log(salesTax);
// { gst: 5, pst: 9.975, hst: 0, totalTax: 14.975, totalAmount: 114.975 }
```

Reference: https://www.retailcouncil.org/resources/quick-facts/sales-tax-rates-by-province/
