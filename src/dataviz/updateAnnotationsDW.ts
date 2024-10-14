import process from "node:process";

/**
 * Updates annotations on a chart. By default, this function looks for the API key in process.env.DATAWRAPPER_KEY.
 *
 * @example
 * Basic usage
 * ```ts
 * import { updateAnnotationsDW } from "journalism"
 *
 * const chartID = "myChartId"
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
 * ]
 *
 * await updateAnnotationsDW(chartID, myAnnotations)
 *
 * // If your API key is stored under a different name in process.env, use the options.
 * await updateAnnotationsDW(chartID, myAnnotations, { apiKey: "DW_KEY" })
 * ```
 *
 * @param chartId - The ID of the chart to update.
 * @param annotations - An array of annotation objects.
 * @param options - Additional options.
 * @param options.apiKey - The process.env API key name to use for authentication. If not provided, it defaults to process.env.DATAWRAPPER_KEY.
 * @param options.returnResponse - Whether to return the response object.
 *
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
