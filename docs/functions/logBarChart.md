[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / logBarChart

# Function: logBarChart()

> **logBarChart**\<`T`\>(`data`, `labels`, `values`, `options?`): `void`

Generates and logs a text-based bar chart to the console. This function is useful for quickly visualizing data distributions or comparisons directly within a terminal or log output, without needing a graphical interface. It's particularly effective for presenting categorical data or showing the relative magnitudes of different items.

The chart is constructed using ASCII characters, making it universally compatible across various terminal environments. It can display data for various categories and their corresponding numerical values, with extensive options for custom formatting of labels and values, controlling the chart's width, and adding a descriptive title or a total label. For optimal visualization, it's recommended that the input `data` be sorted by the `values` key in descending order, though the function does not enforce this.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

## Parameters

### data

`T`[]

An array of objects, where each object represents a bar in the chart. Each object should contain keys corresponding to the `labels` and `values` parameters.

### labels

keyof `T`

The key in the data objects whose values will be used as textual labels for each bar (e.g., 'category', 'name', 'country').

### values

keyof `T`

The key in the data objects whose numerical values will determine the length of each bar and be displayed alongside the labels (e.g., 'sales', 'count', 'percentage').

### options?

Optional configuration for customizing the appearance and behavior of the chart.

#### compact?

`boolean`

If `true`, the chart will be rendered in a more compact format, reducing vertical spacing between bars. Defaults to `false`.

#### formatLabels?

(`d`) => `string`

A function to format the labels displayed on the chart. It receives the raw label value as input and should return a string. Defaults to converting the label to a string.

#### formatValues?

(`d`) => `string`

A function to format the numerical values displayed next to the bars. It receives the numerical value as input and should return a string. Defaults to formatting the number using `formatNumber` (which adds commas for thousands, etc.).

#### showPercentages?

`boolean`

If `true`, the percentage of the total for each bar will be displayed next to its value. Defaults to `false`.

#### showTotal?

`boolean`

If `true`, the total sum of all values will be displayed above the chart. Defaults to `false`.

#### title?

`string`

An optional title to display above the chart. If not provided, a default title based on `labels` and `values` keys will be generated.

#### totalLabel?

`string`

An optional label to display for the total sum of all values at the bottom of the chart. If provided, the sum of all `values` will be calculated and displayed next to this label. This also enables the display of the total row.

#### width?

`number`

The maximum width of the bars in characters. The bars will scale proportionally to this width. A larger width allows for more detailed visualization. Defaults to `40`.

## Returns

`void`

## Examples

```ts
// Visualize sales data for different regions.
const salesData = [
  { region: 'North', sales: 1200 },
  { region: 'South', sales: 800 },
  { region: 'East', sales: 1500 },
  { region: 'West', sales: 950 }
];
logBarChart(salesData, 'region', 'sales', { title: 'Regional Sales Overview' });
```

```ts
// Display product popularity with custom value formatting, a compact layout, and show percentages.
const productPopularity = [
  { product: 'Laptop', views: 5000 },
  { product: 'Mouse', views: 1500 },
  { product: 'Keyboard', views: 2500 }
];
logBarChart(productPopularity, 'product', 'views', {
  formatValues: (v) => `${v / 1000}K`,
  width: 30,
  compact: true,
  totalLabel: 'Total Views',
  showPercentages: true
});
```
