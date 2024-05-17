/**
 * Publishes the specified Datawrapper chart, table, or map. By default, this function looks for the API key in process.env.DATAWRAPPER_KEY.
 *
 * ```js
 * const chartID = "myChartId"
 * await publishChartDW(chartID)
 *
 * // If your API key is stored under a different name in process.env, use the options.
 * await publishChartDW(chartID, { apiKey: "DW_KEY" })
 * ```
 *
 * @category Dataviz
 */
export default async function publishChartDW(
    chartId: string,
    options: { apiKey?: string } = {}
) {
    const envVar = options.apiKey ?? "DATAWRAPPER_KEY"
    const apiKey = process.env[envVar]
    if (apiKey === undefined) {
        throw new Error(`process.env.${envVar} is undefined.`)
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
