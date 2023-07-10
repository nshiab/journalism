/**
 * Calculate Humidex Factor in Celsius given the temperature in Celsius and humidity percentage.
 * In case the calculated humidex is less than the given temperature, it returns temperature itself.
 * ```js
 * const humidex = getHumidex(30, 70); // returns 41
 * ```
 * This is using the formula from the Canadian Centre for Climate Services.
 */

export default function getHumidex(
    temperature: number,
    humidity: number
): number {
    if (humidity < 0 || humidity > 100) {
        throw new Error("humidity must be between 0 and 100")
    }

    const p =
        (6.112 *
            Math.pow(10, (7.5 * temperature) / (237.7 + temperature)) *
            humidity) /
        100

    const humidex = temperature + (5 / 9) * (p - 10)

    const humidexRounded = Math.round(humidex)

    if (humidexRounded < temperature) return temperature
    return humidexRounded
}
