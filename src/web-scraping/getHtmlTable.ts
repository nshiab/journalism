import { load } from "cheerio"
import { csvFormatRow, csvParse } from "d3-dsv"

export default async function getHtmlTable(
    url: string,
    options: {
        selector?: string
        index?: number
    } = {}
) {
    const response = await fetch(url)
    const html = await response.text()

    const $ = load(html)

    let table
    if (typeof options.selector === "string") {
        table = $(options.selector).filter(
            (i) => i === (typeof options.index === "number" ? options.index : 0)
        )
    } else {
        table = $("table").filter(
            (i) => i === (typeof options.index === "number" ? options.index : 0)
        )
    }

    let csv = ""
    table.find("tr").each((i, tr) => {
        const row: string[] = []

        $(tr)
            .find("th, td")
            .each((j, th) => {
                row.push($(th).text().trim())
            })

        csv += `${csvFormatRow(row)}\n`
    })

    const data = csvParse(csv)
    delete data["columns" as unknown as number]

    return data
}
