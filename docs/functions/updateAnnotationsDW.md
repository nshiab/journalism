[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / updateAnnotationsDW

# Function: updateAnnotationsDW()

> **updateAnnotationsDW**(`chartId`, `annotations`, `options?`): `Promise`\<`void` \| `Response`\>

Defined in: [journalism-dataviz/src/dataviz/updateAnnotationsDW.ts:84](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/updateAnnotationsDW.ts#L84)

Updates annotations on a Datawrapper chart. This function allows you to programmatically add, modify, or remove text and line annotations on your Datawrapper visualizations, providing precise control over highlighting specific data points or trends.

This function supports various annotation properties, including position, text content, styling (bold, italic, color, size), alignment, and connector lines with customizable arrowheads.

Authentication is handled via an API key, which can be provided through environment variables (`DATAWRAPPER_KEY`) or explicitly in the options. For detailed information on Datawrapper annotations and their properties, refer to the official Datawrapper API documentation.

Annotation fields:
- `x`: The x-coordinate of the annotation's position on the chart.
- `y`: The y-coordinate of the annotation's position on the chart.
- `text`: The text content of the annotation.
- `bg`: If `true`, the annotation text will have a background. Defaults to `false`.
- `dx`: The horizontal offset of the annotation text from its `x` coordinate, in pixels. Defaults to `0`.
- `dy`: The vertical offset of the annotation text from its `y` coordinate, in pixels. Defaults to `0`.
- `bold`: If `true`, the annotation text will be bold. Defaults to `false`.
- `size`: The font size of the annotation text in pixels. Defaults to `12`.
- `align`: The alignment of the annotation text relative to its `x` and `y` coordinates. Can be `"tl"` (top-left), `"tc"` (top-center), `"tr"` (top-right), `"ml"` (middle-left), `"mc"` (middle-center), `"mr"` (middle-right), `"bl"` (bottom-left), `"bc"` (bottom-center), or `"br"` (bottom-right). Defaults to `"mr"`.
- `color`: The color of the annotation text (e.g., `"#FF0000"`, `"red"`). Defaults to `"#8C8C8C"`.
- `width`: The maximum width of the annotation text box in pixels. Text will wrap if it exceeds this width. Defaults to `20`.
- `italic`: If `true`, the annotation text will be italic. Defaults to `false`.
- `underline`: If `true`, the annotation text will be underlined. Defaults to `false`.
- `showMobile`: If `true`, the annotation will be visible on mobile devices. Defaults to `true`.
- `showDesktop`: If `true`, the annotation will be visible on desktop devices. Defaults to `true`.
- `mobileFallback`: If `true`, the annotation will be displayed as a simple text label on mobile if it's too complex. Defaults to `false`.
- `connectorLine`: An object defining the properties of a connector line from the annotation to a data point.
- `connectorLine.type`: The type of the connector line. Can be `"straight"`, `"curveRight"`, or `"curveLeft"`. Defaults to `"straight"`.
- `connectorLine.circle`: If `true`, a circle will be drawn at the end of the connector line. Defaults to `false`.
- `connectorLine.stroke`: The stroke width of the connector line. Can be `1`, `2`, or `3`. Defaults to `1`.
- `connectorLine.enabled`: If `true`, the connector line will be drawn. Defaults to `false`.
- `connectorLine.arrowHead`: The style of the arrowhead. Can be `"lines"`, `"triangle"`, or `false` (no arrowhead). Defaults to `"lines"`.
- `connectorLine.circleStyle`: The style of the circle at the end of the connector line. Defaults to `"solid"`.
- `connectorLine.circleRadius`: The radius of the circle at the end of the connector line. Defaults to `10`.
- `connectorLine.inheritColor`: If `true`, the connector line will inherit the annotation's text color. Defaults to `false`.
- `connectorLine.targetPadding`: The padding between the end of the connector line and the target data point. Defaults to `4`.

## Parameters

### chartId

`string`

The ID of the Datawrapper chart to update. This ID can be found in the Datawrapper URL or dashboard.

### annotations

`object`[]

An array of annotation objects. Each object defines a single annotation with its properties. Required properties for each annotation are `x`, `y`, and `text`.

### options?

#### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key. If not provided, the function defaults to looking for `DATAWRAPPER_KEY`.

#### returnResponse?

`boolean`

If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

## Returns

`Promise`\<`void` \| `Response`\>

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.

## Examples

```ts
// Update annotations on a Datawrapper chart with a simple text annotation and one with an arrow.

const chartID = "myChartId";
const myAnnotations = [
   {
       "x": "2024/08/30 01:52",
       "y": "14496235",
       "text": "This is an annotation!"
   },
   {
       "x": "2024/06/29",
       "y": "15035128",
       "dy": 50,
       "text": "This is also some text, but with an arrow!",
       "connectorLine": {
           "enabled": true,
           "type": "straight",
           "arrowHead": "lines"
       },
       "mobileFallback": false
   }
];

await updateAnnotationsDW(chartID, myAnnotations);
console.log(`Annotations updated for chart ${chartID}.`);
```

```ts
// If your Datawrapper API key is stored under a different environment variable name (e.g., `DW_API_KEY`).
const customApiKeyChartID = "anotherChartId";
const annotationsForCustomKey = [
  { x: "2024/01/01", y: "100", text: "Custom API Key Test" }
];
await updateAnnotationsDW(customApiKeyChartID, annotationsForCustomKey, { apiKey: "DW_API_KEY" });
console.log(`Annotations updated for chart ${customApiKeyChartID} using custom API key.`);
```
