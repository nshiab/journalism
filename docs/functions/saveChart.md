[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / saveChart

# Function: saveChart()

> **saveChart**\<`T`\>(`data`, `chart`, `path`, `options?`): `Promise`\<`void`\>

Saves an [Observable Plot](https://github.com/observablehq/plot) chart or map as a PNG or SVG file.
The chart function can return an SVG or HTML element directly or through a promise.
The rendering environment remains available until the chart function finishes.
Concurrent saves are processed one at a time to protect that environment.
Calling `saveChart` from inside its own chart function is not supported and rejects with an error.

## Type Parameters

### T

`T`

The type of data passed unchanged to the chart function.

## Parameters

### data

`T`

The data passed to the chart function.

### chart

(`data`) => `SVGSVGElement` \| `HTMLElement` \| `Promise`\<`SVGSVGElement` \| `HTMLElement`\>

A synchronous or asynchronous function returning an SVG or HTML element representing the chart or map.

### path

`string`

The output file path. The extension must be `.png` or `.svg`.

### options?

Optional settings to customize the chart's appearance.

#### dark?

`boolean`

If `true`, renders the chart with a dark theme. Defaults to `false`.

#### style?

`string`

A CSS string inserted into the generated SVG.

## Returns

`Promise`\<`void`\>

A promise that resolves after the file has been saved, or rejects if the chart function or saving fails.

## Examples

```ts
import { dot, plot } from "@observablehq/plot";

const data = [{ year: 2024, value: 10 }, { year: 2025, value: 15 }];
await saveChart(
  data,
  (rows) => plot({ marks: [dot(rows, { x: "year", y: "value" })] }),
  "output/chart.png",
);
```

```ts
// Load Observable Plot asynchronously before creating the chart.
const data = [{ year: 2024, value: 10 }, { year: 2025, value: 15 }];
await saveChart(
  data,
  async (rows) => {
    const { dot, plot } = await import("@observablehq/plot");
    return plot({ marks: [dot(rows, { x: "year", y: "value" })] });
  },
  "output/chart.svg",
  { dark: true, style: ".chart-title { font-size: 24px; }" },
);
```
