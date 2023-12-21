import AdmZip from "adm-zip"
import { csvParse } from "d3-dsv"

export default async function getStatCanTable(
    pid: string,
    options: {
        lang?: "en" | "fr"
        skipFirstCharacter?: boolean
        returnRawCSV?: boolean
        debug?: boolean
    } = {}
) {
    const lang = options.lang ?? "en"

    if (pid.length > 8) {
        options.debug &&
            console.log(
                `pid ${pid} is too long (max 8 characters). Using ${pid.slice(
                    0,
                    8
                )} instead.`
            )
        pid = pid.slice(0, 8)
    }

    const getCSVResponse = await fetch(
        `https://www150.statcan.gc.ca/t1/wds/rest/getFullTableDownloadCSV/${pid}/${lang}`
    )
    const zippedCsvUrl = await getCSVResponse.json()
    options.debug && console.log(`Fetching ${zippedCsvUrl.object}`)

    const response = await fetch(zippedCsvUrl.object)
    const zipBuffer = Buffer.from(await response.arrayBuffer())
    const zip = new AdmZip(zipBuffer)
    const zipEntries = zip.getEntries()
    const csvEntry = zipEntries.find((d) => d.entryName === `${pid}.csv`)
    if (csvEntry === undefined) {
        throw new Error(`No ${pid}.csv in the zipped file.`)
    }
    const csv = csvEntry.getData().toString()

    if (options.returnRawCSV) {
        return csv
    }

    const data = options.skipFirstCharacter
        ? csvParse(csv.slice(1))
        : csvParse(csv)
    delete data["columns" as unknown as number]

    options.debug &&
        console.log("colums:", JSON.stringify(Object.keys(data[0])))

    options.debug && console.table(data)

    return data
}
