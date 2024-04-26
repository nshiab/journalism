/**
 * Updates annotations in on a chart.
 *
 * ```js
 * import { updateAnnotationsDW } from "journalism"
 *
 * const apiKey = "myApiKey"
 * const chartID = "myChartId"
 * const annotations = [{
    "x": "2024/09/29",
    "y": "15035128.6500",
    "text": "This is some text"
},
{
    "x": "2024/06/29",
    "y": "15035128.6500",
    "text": "This is some text also",
    "color": "#C42127"
  }
]
 *
 * await updateAnnotationsDW(annotations, apiKey, chartID)
 * ```
 *
 * @category Dataviz
 */
export default async function updateAnnotationsDW(
    annotations: {
        "x": string,
        "y": string,
        "bg"?: boolean,
        "dx"?: number,
        "dy"?: number,
        "bold"?: boolean,
        "size"?: number,
        "text": string,
        "align"?:
            | "tl"
            | "tc"
            | "tr"
            | "ml"
            | "mc"
            | "mr"
            | "bl"
            | "bc"
            | "br",
        "color"?: string,
        "width"?: number,
        "italic"?: boolean,
        "underline"?: boolean,
        "showMobile"?: boolean,
        "showDesktop"?: boolean,
        "connectorLine"?: {
            "type"?:
                | "lines"
                | "triangle"
                | false
            "circle"?: boolean,
            "stroke"?: 
                | 1
                | 2
                | 3
            "enabled"?: boolean,
            "arrowHead"?: 
                | "straight"
                | "curveRight"
                | "curveLeft"
            "circleStyle"?: string,
            "circleRadius"?: number,
            "inheritColor"?: boolean,
            "targetPadding"?: number
        },
        "mobileFallback"?: boolean
    }[],
    chartId: string,
    apiKey: string
) {
    // Handling default values for each annotation object
    const annotationsWithProps = annotations.map(annotation => ({
        ...annotation,
        bg: annotation.bg ?? false,
        dx: annotation.dx ?? 0,
        dy: annotation.dy ?? 0,
        bold: annotation.bold ?? false,
        size: annotation.size ?? 12,
        align: annotation.align ?? "mr",
        color: annotation.color ?? "#8C8C8C",
        width: annotation.width ?? 20,
        italic: annotation.italic ?? false,
        underline: annotation.underline ?? false,
        showMobile: annotation.showMobile ?? true,
        showDesktop: annotation.showDesktop ?? true,
        connectorLine: {
            ...annotation.connectorLine,
            type: annotation.connectorLine?.type ?? "straight",
            circle: annotation.connectorLine?.circle ?? false,
            stroke: annotation.connectorLine?.stroke ?? 1,
            enabled: annotation.connectorLine?.enabled ?? false,
            arrowHead: annotation.connectorLine?.arrowHead ?? "lines",
            circleStyle: annotation.connectorLine?.circleStyle ?? "solid",
            circleRadius: annotation.connectorLine?.circleRadius ?? 10,
            inheritColor: annotation.connectorLine?.inheritColor ?? false,
            targetPadding: annotation.connectorLine?.targetPadding ?? 4
        },
        mobileFallback: annotation.mobileFallback ?? false
    }));

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
                                    "text-annotations": annotationsWithProps,
                                },
                            },
                        }),
                    }
                )
            
                if (response.status !== 200) {
                    throw new Error(JSON.stringify(response, null, 1))
                } else {
                    console.log(`Note for ${chartId} has been updated.`)
                }
            console.log(response)
}