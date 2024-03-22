/** 
 * Publishes specified Datawrapper chart, table or map.
 * ```js
 * const api = "myApi"
 * const chartID = "myChartId"
 * await publishChartDW(api,chartID)
 * ```
 * @category Dataviz
 */
export default async function publishChartDW(
    apiKey: string,
    chartId: string
) {
	const response = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}/publish`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`
		}
	});

	if (response.status !== 200) {
        console.log(response)
		throw new Error('datawrapper_publish_error');
	} else {
		console.log(`Chart ${chartId} has been published.`)
	}
};