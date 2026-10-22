[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / logLineChart

# Function: logLineChart()

> **logLineChart**\<`T`, `X`\>(`data`, `x`, `y`, `options?`): `void`

Defined in: [journalism-dataviz/src/dataviz/logLineChart.ts:71](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/logLineChart.ts#L71)

Generates and logs a text-based line chart to the console. This function is particularly useful for visualizing trends over time providing a quick and accessible way to understand data progression directly within a terminal or log output.

The chart is rendered using ASCII characters, ensuring broad compatibility. It supports custom formatting for both x and y-axis values, and can generate small multiples to compare trends across different categories. When the chart's width is smaller than the number of data points, the line represents an averaged approximation of the data, providing a smoothed view of the trend. For optimal visualization, it's recommended that the input `data` be sorted by the x-axis values.

**Data Type Requirements:**
- **X-axis values**: Must be `number` or `Date` objects.
- **Y-axis values**: Must be `number` values.
- All values must be non-null and defined.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

### X

`X` *extends* `string` \| `number` \| `symbol` = keyof `T`

## Parameters

### data

`T`[]

An array of objects representing the data to be visualized. Each object should contain keys corresponding to the `x` and `y` parameters.

### x

`X`

The key in the data objects whose values will be plotted on the x-axis. Values must be numbers or Date objects.

### y

keyof `T`

The key in the data objects whose values will be plotted on the y-axis. Values must be numbers.

### options?

An optional object to customize the chart's appearance and behavior.

#### fixedScales?

`boolean`

If `true` and `smallMultiples` is used, all small multiple charts will share the same x and y scales, allowing for direct comparison of magnitudes. If `false`, each small multiple will have its own independent scales. Defaults to `false`.

#### formatX?

(`d`) => `string`

A function to format the x-axis values for display. It receives the raw x-value as input and should return a string. If the first data point's x value is a Date, it defaults to formatting the date as "YYYY-MM-DD".

#### formatY?

(`d`) => `string`

A function to format the y-axis values for display. It receives the numerical y-value as input and should return a string.

#### height?

`number`

The height of the chart in lines. This affects the vertical resolution of the chart. Defaults to `20`.

#### smallMultiples?

keyof `T`

A key in the data objects to create small multiples (separate charts) for each unique value of this key. This is useful for comparing trends across different categories.

#### smallMultiplesPerRow?

`number`

The number of small multiples to display per row when `smallMultiples` is used. Defaults to `3`.

#### title?

`string`

The title of the chart. If not provided, a default title based on `x`, `y`, and `smallMultiples` (if applicable) will be generated.

#### width?

`number`

The width of the chart in characters. This affects the horizontal resolution of the chart. Defaults to `60`.

## Returns

`void`

## Examples

```ts
// Visualize a simple time series of values.
const timeSeriesData = [
    { date: new Date("2023-01-01"), value: 10 },
    { date: new Date("2023-02-01"), value: 20 },
    { date: new Date("2023-03-01"), value: 30 },
    { date: new Date("2023-04-01"), value: 40 },
];

logLineChart(timeSeriesData, "date", "value", {
    formatX: (d) => d.toISOString().slice(0, 10),
    title: "Monthly Data Trend",
});
```

```ts
// Compare trends across different categories using small multiples.
const multiCategoryData = [
    { date: new Date("2023-01-01"), value: 10, category: "A" },
    { date: new Date("2023-02-01"), value: 20, category: "A" },
    { date: new Date("2023-03-01"), value: 30, category: "A" },
    { date: new Date("2023-04-01"), value: 40, category: "A" },
    { date: new Date("2023-01-01"), value: 15, category: "B" },
    { date: new Date("2023-02-01"), value: 25, category: "B" },
    { date: new Date("2023-03-01"), value: 35, category: "B" },
    { date: new Date("2023-04-01"), value: 45, category: "B" },
];

logLineChart(multiCategoryData, "date", "value", {
    formatX: (d) => d.toLocaleDateString(),
    formatY: (d) => "$" + d.toString(),
    smallMultiples: "category",
    smallMultiplesPerRow: 2,
    fixedScales: true,
    title: "Sales Trend by Category",
});
```
