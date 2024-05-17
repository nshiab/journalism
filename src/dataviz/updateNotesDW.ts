/**
 * Updates notes field for a specified Datawrapper chart, table or map. This function requires the API key in process.env.DATAWRAPPER_KEY.
 *
 * ```js
 * import { updateNotesDW, formatDate } from "journalism"
 *
 * const chartID = "myChartId"
 * const dateString = formatDate(new Date(), "Month DD, YYYY, at HH:MM period", { abbreviations: true })
 * const note = `This chart was last updated on ${dateString}`
 *
 * await updateNotesDW(chartID, note)
 * ```
 *
 * @category Dataviz
 */
export default async function updateNotesDW(
    chartId: string,
    note: string
): Promise<void> {
    const apiKey = process.env.DATAWRAPPER_KEY
    if (apiKey === undefined) {
        throw new Error("process.env.DATAWRAPPER_KEY is undefined.")
    }

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
        console.log("There is a problem with updateNotesDW!")
        console.log({ chartId, apiKey: "*".repeat(apiKey.length), note })
        throw new Error(JSON.stringify(response, null, 1))
    }
}
