/**
 * Updates notes field for a specified Datawrapper chart, table or map.
 *
 * ```js
 * import { updateNotesDW, formatDate } from "journalism"
 *
 * const apiKey = "myApiKey"
 * const chartID = "myChartId"
 * const dateString = formatDate(new Date(), "Month Day, YYYY, at HH:MM period", { abbreviations: true })
 * const note = `This chart was last updated on ${dateString}`
 *
 * await updateNotesDW(note, apiKey, chartID)
 * ```
 *
 * @category Dataviz
 */
export default async function updateNotesDW(
    note: string,
    apiKey: string,
    chartId: string
): Promise<void> {
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
                    annotate: {
                        notes: note,
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
}
