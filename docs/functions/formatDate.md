[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / formatDate

# Function: formatDate()

> **formatDate**(`date`, `format`, `options?`): `string`

Formats a `Date` object into a human-readable string based on a specified format, style, and time zone. This function provides flexible date and time formatting options, including support for UTC, different linguistic styles (English/French), and various display preferences like abbreviations and zero-padding.

## Parameters

### date

`Date`

The `Date` object to be formatted.

### format

`"YYYY-MM-DD"` \| `"YYYY-MM-DD HH:MM:SS TZ"` \| `"DayOfWeek, Month Day"` \| `"Month DD"` \| `"Month DD, HH:MM period"` \| `"Month DD, HH:MM period TZ"` \| `"DayOfWeek, HH:MM period"` \| `"DayOfWeek, HH:MM period TZ"` \| `"Month DD, YYYY"` \| `"Month DD, YYYY, at HH:MM period"` \| `"Month DD, YYYY, at HH:MM period TZ"` \| `"DayOfWeek"` \| `"Month"` \| `"YYYY"` \| `"MM"` \| `"DD"` \| `"HH:MM period"` \| `"HH:MM period TZ"` \| `"HH:MM period TZ on Month DD, YYYY"` \| `"HH:MM period on Month DD, YYYY"` \| `"HH:MM period TZ on Month DD"` \| `"HH:MM period on Month DD"`

A predefined string literal specifying the desired output format. Examples include "YYYY-MM-DD", "Month DD, YYYY", "HH:MM period", etc.

### options?

Optional settings to customize the formatting behavior.

#### abbreviations?

`boolean`

If `true`, month and day names will be abbreviated (e.g., "Jan.", "Mon."). Defaults to `false`.

#### noZeroPadding?

`boolean`

If `true`, single-digit days and months will not be padded with a leading zero (e.g., "1" instead of "01"). Defaults to `false`.

#### style?

`"cbc"` \| `"rc"`

The linguistic style for formatting. Use "cbc" for English (default) or "rc" for French. This affects month and day names, and time representations.

#### threeLetterMonth?

`boolean`

If `true`, month abbreviations will be three letters (e.g., "Jan", "Feb"). Defaults to `false`.

#### timeZone?

`"Canada/Atlantic"` \| `"Canada/Central"` \| `"Canada/Eastern"` \| `"Canada/Mountain"` \| `"Canada/Newfoundland"` \| `"Canada/Pacific"` \| `"Canada/Saskatchewan"` \| `"Canada/Yukon"`

Specifies a time zone for formatting. Accepts standard IANA time zone names (e.g., "America/New_York") or specific Canadian time zones. If `utc` is `true`, this option is ignored.

#### utc?

`boolean`

If `true`, the date will be formatted in UTC (Coordinated Universal Time). Defaults to `false`.

## Returns

`string`

The formatted date string.

## Examples

```ts
// Basic usage: Format a date in default English style.
const date = new Date("2023-01-01T01:35:00.000Z");
const formatted = formatDate(date, "Month DD, YYYY, at HH:MM period", { utc: true });
console.log(formatted); // "January 1, 2023, at 1:35 a.m."
```

```ts
// Formatting in French style with abbreviations.
const frenchFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period", {
  style: "rc",
  abbreviations: true,
  utc: true
});
console.log(frenchFormatted); // "1 janv. 2023 à 1 h 35"
```

```ts
// Formatting with a specific time zone.
const estFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period TZ", {
  timeZone: "Canada/Eastern"
});
console.log(estFormatted); // "January 1, 2023, at 8:35 p.m. EST" (assuming date is UTC)
```

```ts
// Custom format: YYYY-MM-DD
const isoFormatted = formatDate(new Date("2024-03-15T10:00:00Z"), "YYYY-MM-DD");
console.log(isoFormatted); // "2024-03-15"
```
