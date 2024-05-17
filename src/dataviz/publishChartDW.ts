/**
 * Publishes the specified Datawrapper chart, table, or map. This function requires the API key in process.env.DATAWRAPPER_KEY.
 *
 * ```js
 * const chartID = "myChartId"
 *
 * await publishChartDW(chartID)
 * ```
 *
 * @category Dataviz
 */
export default async function publishChartDW(chartId: string) {
    const apiKey = process.env.DATAWRAPPER_KEY
    if (apiKey === undefined) {
        throw new Error("process.env.DATAWRAPPER_KEY is undefined.")
    }

    const response = await fetch(
        `https://api.datawrapper.de/v3/charts/${chartId}/publish`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        }
    )

    if (response.status !== 200) {
        console.log("There is a problem with publishChartDW!")
        console.log({ chartId, apiKey: "*".repeat(apiKey.length) })
        throw new Error(JSON.stringify(response, null, 1))
    }
}
