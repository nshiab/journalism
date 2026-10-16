[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / getHumidex

# Function: getHumidex()

> **getHumidex**(`temperature`, `humidity`): `number`

Calculates the humidex factor in Celsius based on the given temperature in Celsius and humidity percentage.

If the calculated humidex is less than the provided temperature, the temperature itself is returned.

This calculation uses the formula provided by the Canadian Centre for Climate Services.

## Parameters

### temperature

`number`

The ambient temperature in Celsius.

### humidity

`number`

The relative humidity as a percentage (0-100).

## Returns

`number`

The calculated humidex value in Celsius, rounded to the nearest whole number. Returns the original temperature if the calculated humidex is lower.

## Examples

```ts
// Calculate humidex for a warm and humid day.
const humidex = getHumidex(30, 70); // returns 41
console.log(`Humidex: ${humidex}`);
```

```ts
// In cases where the calculated humidex is less than the temperature, the temperature is returned.
const humidexLowHumidity = getHumidex(20, 30); // returns 20 (since calculated humidex would be lower)
console.log(`Humidex: ${humidexLowHumidity}`);
```

## Throws

If the humidity value is not within the valid range of 0 to 100.
