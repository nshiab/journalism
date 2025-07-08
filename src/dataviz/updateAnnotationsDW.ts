import process from "node:process";

/**
 * Updates annotations on a Datawrapper chart. This function allows you to programmatically add, modify, or remove text and line annotations on your Datawrapper visualizations, providing precise control over highlighting specific data points or trends.
 *
 * This function supports various annotation properties, including position, text content, styling (bold, italic, color, size), alignment, and connector lines with customizable arrowheads.
 *
 * Authentication is handled via an API key, which can be provided through environment variables (`DATAWRAPPER_KEY`) or explicitly in the options. For detailed information on Datawrapper annotations and their properties, refer to the official Datawrapper API documentation.
 *
 * @param chartId - The ID of the Datawrapper chart to update. This ID can be found in the Datawrapper URL or dashboard.
 * @param annotations - An array of annotation objects. Each object defines a single annotation with its properties. Required properties for each annotation are `x`, `y`, and `text`.
 *   @param annotations.x - The x-coordinate of the annotation's position on the chart.
 *   @param annotations.y - The y-coordinate of the annotation's position on the chart.
 *   @param annotations.text - The text content of the annotation.
 *   @param annotations.bg - If `true`, the annotation text will have a background. Defaults to `false`.
 *   @param annotations.dx - The horizontal offset of the annotation text from its `x` coordinate, in pixels. Defaults to `0`.
 *   @param annotations.dy - The vertical offset of the annotation text from its `y` coordinate, in pixels. Defaults to `0`.
 *   @param annotations.bold - If `true`, the annotation text will be bold. Defaults to `false`.
 *   @param annotations.size - The font size of the annotation text in pixels. Defaults to `12`.
 *   @param annotations.align - The alignment of the annotation text relative to its `x` and `y` coordinates. Can be `"tl"` (top-left), `"tc"` (top-center), `"tr"` (top-right), `"ml"` (middle-left), `"mc"` (middle-center), `"mr"` (middle-right), `"bl"` (bottom-left), `"bc"` (bottom-center), or `"br"` (bottom-right). Defaults to `"mr"`.
 *   @param annotations.color - The color of the annotation text (e.g., `"#FF0000"`, `"red"`). Defaults to `"#8C8C8C"`.
 *   @param annotations.width - The maximum width of the annotation text box in pixels. Text will wrap if it exceeds this width. Defaults to `20`.
 *   @param annotations.italic - If `true`, the annotation text will be italic. Defaults to `false`.
 *   @param annotations.underline - If `true`, the annotation text will be underlined. Defaults to `false`.
 *   @param annotations.showMobile - If `true`, the annotation will be visible on mobile devices. Defaults to `true`.
 *   @param annotations.showDesktop - If `true`, the annotation will be visible on desktop devices. Defaults to `true`.
 *   @param annotations.mobileFallback - If `true`, the annotation will be displayed as a simple text label on mobile if it's too complex. Defaults to `false`.
 *   @param annotations.connectorLine - An object defining the properties of a connector line from the annotation to a data point.
 *     @param annotations.connectorLine.type - The type of the connector line. Can be `"straight"`, `"curveRight"`, or `"curveLeft"`. Defaults to `"straight"`.
 *     @param annotations.connectorLine.circle - If `true`, a circle will be drawn at the end of the connector line. Defaults to `false`.
 *     @param annotations.connectorLine.stroke - The stroke width of the connector line. Can be `1`, `2`, or `3`. Defaults to `1`.
 *     @param annotations.connectorLine.enabled - If `true`, the connector line will be drawn. Defaults to `false`.
 *     @param annotations.connectorLine.arrowHead - The style of the arrowhead. Can be `"lines"`, `"triangle"`, or `false` (no arrowhead). Defaults to `"lines"`.
 *     @param annotations.connectorLine.circleStyle - The style of the circle at the end of the connector line. Defaults to `"solid"`.
 *     @param annotations.connectorLine.circleRadius - The radius of the circle at the end of the connector line. Defaults to `10`.
 *     @param annotations.connectorLine.inheritColor - If `true`, the connector line will inherit the annotation's text color. Defaults to `false`.
 *     @param annotations.connectorLine.targetPadding - The padding between the end of the connector line and the target data point. Defaults to `4`.
 * @param options.apiKey - The name of the environment variable that stores your Datawrapper API key. If not provided, the function defaults to looking for `DATAWRAPPER_KEY`.
 * @param options.returnResponse - If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.
 * @returns A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.
 *
 * @example
 * ```ts
 * // Update annotations on a Datawrapper chart with a simple text annotation and one with an arrow.
 *
 * const chartID = "myChartId";
 * const myAnnotations = [
 *    {
 *        "x": "2024/08/30 01:52",
 *        "y": "14496235",
 *        "text": "This is an annotation!"
 *    },
 *    {
 *        "x": "2024/06/29",
 *        "y": "15035128",
 *        "dy": 50,
 *        "text": "This is also some text, but with an arrow!",
 *        "connectorLine": {
 *            "enabled": true,
 *            "type": "straight",
 *            "arrowHead": "lines"
 *        },
 *        "mobileFallback": false
 *    }
 * ];
 *
 * await updateAnnotationsDW(chartID, myAnnotations);
 * console.log(`Annotations updated for chart ${chartID}.`);
 * ```
 * @example
 * ```ts
 * // If your Datawrapper API key is stored under a different environment variable name (e.g., `DW_API_KEY`).
 * const customApiKeyChartID = "anotherChartId";
 * const annotationsForCustomKey = [
 *   { x: "2024/01/01", y: "100", text: "Custom API Key Test" }
 * ];
 * await updateAnnotationsDW(customApiKeyChartID, annotationsForCustomKey, { apiKey: "DW_API_KEY" });
 * console.log(`Annotations updated for chart ${customApiKeyChartID} using custom API key.`);
 * ```
 * @category Dataviz
 */
export default async function updateAnnotationsDW(
  chartId: string,
  annotations: {
    x: string;
    y: string;
    text: string;
    bg?: boolean;
    dx?: number;
    dy?: number;
    bold?: boolean;
    size?: number;
    align?: "tl" | "tc" | "tr" | "ml" | "mc" | "mr" | "bl" | "bc" | "br";
    color?: string;
    width?: number;
    italic?: boolean;
    underline?: boolean;
    showMobile?: boolean;
    showDesktop?: boolean;
    mobileFallback?: boolean;
    connectorLine?: {
      type?: "straight" | "curveRight" | "curveLeft";
      circle?: boolean;
      stroke?: 1 | 2 | 3;
      enabled?: boolean;
      arrowHead?: "lines" | "triangle" | false;
      circleStyle?: string;
      circleRadius?: number;
      inheritColor?: boolean;
      targetPadding?: number;
    };
  }[],
  options: { apiKey?: string; returnResponse?: boolean } = {},
): Promise<void | Response> {
  const envVar = options.apiKey ?? "DATAWRAPPER_KEY";
  const apiKey = process.env[envVar];
  if (apiKey === undefined || apiKey === "") {
    throw new Error(`process.env.${envVar} is undefined or ''.`);
  }

  // We set defaults as non-nested objects
  const defaultsWithoutConnectorLine = {
    bg: false,
    dx: 0,
    dy: 0,
    bold: false,
    size: 12,
    align: "mr",
    color: "#8C8C8C",
    width: 20,
    italic: false,
    underline: false,
    showMobile: true,
    showDesktop: true,
    mobileFallback: false,
  };
  const defaultConnectorLine = {
    type: "straight",
    circle: false,
    stroke: 1,
    enabled: false,
    arrowHead: "lines",
    circleStyle: "solid",
    circleRadius: 10,
    inheritColor: false,
    targetPadding: 4,
  };

  // We map over annotations to add defaults.
  const annotationsWithDefaults = annotations.map((annotation) => {
    // We check for mandatory values.
    if (!annotation.x || !annotation.y || !annotation.text) {
      throw new Error(
        "Missing x, y, or text for at least one annotation.",
      );
    }

    // We extract the connectorLine from the rest
    const { connectorLine, ...rest } = annotation;

    // We create the nested object required for the DW API. We pass the defaults first, then we overwrite them with any value passed by the user.
    return {
      ...defaultsWithoutConnectorLine,
      ...rest,
      connectorLine: { ...defaultConnectorLine, ...connectorLine },
    };
  });

  const response = await fetch(
    `https://api.datawrapper.de/v3/charts/${chartId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: {
          visualize: {
            "text-annotations": annotationsWithDefaults,
          },
        },
      }),
    },
  );
  await response.json();

  // if returning a response, do it before the response.status checks
  if (options.returnResponse === true) {
    return response;
  }

  if (response.status !== 200) {
    throw new Error(
      `updateAnnotationsDW ${chartId}: Upstream HTTP ${response.status} - ${response.statusText}`,
    );
  }
}
