/**
 * Sends data to a specified Datawrapper chart, table or map.
 *  ```js
 * import {dataAsCsv} from "journalism"
 * 
 * const api = "myApi"
 * const chartID = "myChartId"
 * const mapID = "myMapId"
 * //Data upload for chart
 * const data = [
 *     { salary: 75000, hireDate: new Date("2022-12-15") },
 *     { salary: 82000, hireDate: new Date("2022-11-20") },
 *    { salary: 60000, hireDate: new Date("2022-10-25") },
 *     { salary: 90000, hireDate: new Date("2022-09-30") },
 *     { salary: 72000, hireDate: new Date("2022-08-15") },
 *     { salary: 55000, hireDate: new Date("2022-07-20") },
 *     { salary: 68000, hireDate: new Date("2022-06-25") },
 *     { salary: 48000, hireDate: new Date("2022-05-30") },
 *     { salary: 77000, hireDate: new Date("2022-04-15") },
 *     { salary: 88000, hireDate: new Date("2022-03-20") },
 * ]

 * const dataForChart = dataAsCsv(data)
 * await updateDataDW(dataForChart,api,chartID)

 * //Data upload for locator map
 * const geojson = {
 *    "type": "FeatureCollection",
 *     "features": [
 *       {
 *         "type": "Feature",
 *         "properties": {},
 *         "geometry": {
 *           "coordinates": [
 *             [
 *               [
 *                 11.127454320325711,
 *                 20.34856592751224
 *               ],
 *               [
 *                 11.127454320325711,
 *                 -13.781306861158996
 *               ],
 *               [
 *                 55.68071875381875,
 *                 -13.781306861158996
 *               ],
 *               [
 *                 55.68071875381875,
 *                 20.34856592751224
 *               ],
 *               [
 *                 11.127454320325711,
 *                 20.34856592751224
 *               ]
 *             ]
 *           ],
 *           "type": "Polygon"
 *         }
 *       }
 *     ]
 *   }
 *   const dataForMap = `{
 *     "markers": [
 *       {
 *         "id": "m1",
 *         "type": "area",
 *         "visible": true,
 *         "exactShape": true,
 *         "fill": true,
 *         "stroke": true,
 *         "properties": {
 *           "fill": "#15607a",
 *           "fill-opacity": 0.2,
 *           "stroke": "#15607a",
 *           "stroke-width": 1,
 *           "stroke-opacity": 1,
 *           "stroke-dasharray": "100000",
 *           "pattern": "solid",
 *           "pattern-line-width": 2,
 *           "pattern-line-gap": 2
 *         },
 *         "feature": ${JSON.stringify(geojson)}
 *       }
 *     ]
 *   }`
 *  await updateDataDW(dataForMap,api,chartID)
 * ```
 * @category Dataviz
 */

export default async function updateDataDW(
	data: string,
	apiKey: string,
	chartId: string
) {
	const response = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}/data`, {
		method: 'PUT',
		body: data,
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'text/csv'
		}
	});

	if (response.status !== 204) {
		console.log(response)
		throw new Error('datawrapper_update_data_error');
	} else {
		console.log(`Data for chart ${chartId} has been updated.`)
	}
};