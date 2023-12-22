import puppeteer from "puppeteer"
import { Plot } from "@observablehq/plot"

export default async function savePlotChart(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [key: string]: any },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makeChart: (data: any) => (SVGSVGElement | HTMLElement) & Plot,
    path: string
) {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    // We inject the d3 and plot code.
    await page.addScriptTag({
        path: "node_modules/d3/dist/d3.js",
    })
    await page.addScriptTag({
        path: "node_modules/@observablehq/plot/dist/plot.umd.js",
    })
    // We create an empty div.
    await page.setContent("<div id='dataviz'></div>")
    // We generate the chart and append it to our div.
    await page.evaluate(`
        const data = ${JSON.stringify(data)}
        const makeChart = ${makeChart.toString()}
        const plot = makeChart(data)
        const div = document.querySelector("#dataviz")
        if (!div) {
            throw new Error("No div with id dataviz")
        }
        div.append(plot)`)
    // We select the div and save a screenshot of it.
    const dataviz = await page.$("#dataviz")
    if (!dataviz) {
        throw new Error("No dataviz element.")
    }
    await dataviz.screenshot({ path })
    await browser.close()
}
