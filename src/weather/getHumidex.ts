/**
 * Calculates the humidex factor in Celsius based on the given temperature in Celsius and humidity percentage.
 *
 * If the calculated humidex is less than the provided temperature, the temperature itself is returned.
 *
 * This calculation uses the formula provided by the Canadian Centre for Climate Services.
 *
 * @param temperature - The ambient temperature in Celsius.
 * @param humidity - The relative humidity as a percentage (0-100).
 * @returns The calculated humidex value in Celsius, rounded to the nearest whole number. Returns the original temperature if the calculated humidex is lower.
 * @throws {Error} If the humidity value is not within the valid range of 0 to 100.
 *
 * @example
 * ```ts
 * // Calculate humidex for a warm and humid day.
 * const humidex = getHumidex(30, 70); // returns 41
 * console.log(`Humidex: ${humidex}`);
 * ```
 * @example
 * ```ts
 * // In cases where the calculated humidex is less than the temperature, the temperature is returned.
 * const humidexLowHumidity = getHumidex(20, 30); // returns 20 (since calculated humidex would be lower)
 * console.log(`Humidex: ${humidexLowHumidity}`);
 * ```
 * @category Weather and climate
 */

export default function getHumidex(
  temperature: number,
  humidity: number,
): number {
  if (humidity < 0 || humidity > 100) {
    throw new Error("humidity must be between 0 and 100");
  }

  const p = (6.112 *
    Math.pow(10, (7.5 * temperature) / (237.7 + temperature)) *
    humidity) /
    100;

  const humidex = temperature + (5 / 9) * (p - 10);

  const humidexRounded = Math.round(humidex);

  if (humidexRounded < temperature) return temperature;
  return humidexRounded;
}
