export default function getHumidex(
    temperature: number,
    humidity: number
): number {
    if (humidity < 0 || humidity > 100) {
        throw new Error("humidity must be between 0 and 100")
    }

    const temperatureInKelvin = temperature + 273
    const eTs = Math.pow(
        10,
        -2937.4 / temperatureInKelvin -
            (4.9283 * Math.log(temperatureInKelvin)) / Math.LN10 +
            23.5471
    )
    const eTd = (eTs * humidity) / 100
    const humidex = Math.round(temperature + ((eTd - 10) * 5) / 9)

    if (humidex < temperature) return temperature // possible?
    return humidex
}
