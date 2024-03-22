/** 
 * Updates annotation for a specified Datawrapper chart, table or map.
 * ```js
 * import { formatDate } from "journalism"

 * const api = "myApi"
 * const chartID = "myChartId"
 * const date = new Date()
 * const dateString = formatDate(date, "Month Day, YYYY, at HH:MM period", { abbreviations: true })
 * const annotation = `This chart was last updated on ${dateString}`
 * 
 * await updateAnnotationDW(annotation,api,chartID)
 * ```
 * @category Dataviz
 */
export default async function updateAnnotationDW(
	annotationText: string,
    apiKey: string,
    chartId: string
): Promise<void> {
	const response = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			metadata: {
				annotate: {
					notes: annotationText
				}
			}
		})
	});

	if (response.status !== 200) {
        console.log(response)
		throw new Error('datawrapper_update_annotation_error');
	} else {
		console.log(`Annotation for ${chartId} has been updated.`)
	}
};

