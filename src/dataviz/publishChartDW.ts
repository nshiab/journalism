/**
 * Publishes specified Datawrapper chart, table or map.
 *
 * ```js
 * const apiKey = "myApiKey"
 * const chartID = "myChartId"
 *
 * await publishChartDW(apiKey, chartID)
 * ```
 *
 * @category Dataviz
 */
export default async function publishChartDW(apiKey: string, chartId: string) {
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
        console.log(response)
        throw new Error("publishChartDW error")
    } else {
        console.log(`Chart ${chartId} has been published.`)
    }
}
