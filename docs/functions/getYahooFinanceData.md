[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / getYahooFinanceData

# Function: getYahooFinanceData()

> **getYahooFinanceData**(`symbol`, `startDate`, `endDate`, `variable`, `interval`): `Promise`\<`object`[]\>

Fetches historical prices or trading volume for a symbol from Yahoo Finance.

**Yahoo Finance notice:** This function uses an undocumented Yahoo Finance
endpoint and is not affiliated with or endorsed by Yahoo. It is provided for
educational, research, and journalistic purposes. Before using it, review
Yahoo's terms and any applicable data-provider restrictions.

## Parameters

### symbol

`string`

The stock or index symbol, such as `"AAPL"` or `"^GSPTSE"`.

### startDate

`Date`

The inclusive start of the requested range.

### endDate

`Date`

The inclusive end of the requested range. The observation
beginning at this date or time is included when available.

### variable

`"low"` \| `"high"` \| `"open"` \| `"close"` \| `"adjclose"` \| `"volume"`

The financial variable to retrieve.

### interval

`"1d"` \| `"1h"` \| `"1m"`

The interval between observations: daily, hourly, or every
minute.

## Returns

`Promise`\<`object`[]\>

The available observations, with Unix timestamps in milliseconds.
Missing values reported by Yahoo are omitted.

## Example

```ts
const prices = await getYahooFinanceData(
  "^GSPTSE",
  new Date("2025-03-01"),
  new Date("2025-03-15"),
  "adjclose",
  "1d",
);
console.log(prices);
```

## Throws

If either date is invalid or `endDate` is before
`startDate`.

## Throws

If Yahoo rejects the request, returns no data, or provides invalid timestamps.

## See

 - https://legal.yahoo.com/us/en/yahoo/terms/otos/index.html
 - https://help.yahoo.com/kb/finance/SLN2310.html
