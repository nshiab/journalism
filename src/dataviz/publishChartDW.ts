/**
 * Publishes specified Datawrapper chart, table or map.
 *
 * ```js
 * const chartID = "myChartId"
 * const apiKey = "myApiKey"
 *
 * await publishChartDW(chartID, apiKey)
 * ```
 *
 * @category Dataviz
 */
export default async function publishChartDW(chartId: string, apiKey: string) {
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
        console.log({ chartId, apiKey })
        throw new Error(JSON.stringify(response, null, 1))
    }
}
