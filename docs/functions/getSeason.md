[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / getSeason

# Function: getSeason()

> **getSeason**(`options?`): `"winter"` \| `"spring"` \| `"summer"` \| `"fall"`

Determines the current season based on a given date, hemisphere, and season type. This function provides flexibility by allowing you to specify the exact date, the hemisphere (Northern or Southern), and the method of season calculation (astronomical or meteorological). By default, it uses the current date, the Northern Hemisphere, and astronomical seasons.

Astronomical seasons are based on the Earth's position in its orbit around the sun, marked by equinoxes and solstices. Meteorological seasons are based on the annual temperature cycle and are typically defined by calendar months, making them consistent for statistical purposes.

## Parameters

### options?

An object containing options for determining the season.

#### date?

`Date`

Optional. The date for which to determine the season. Defaults to the current date if not provided.

#### hemisphere?

`"northern"` \| `"southern"`

Optional. The hemisphere for which to determine the season. Can be 'northern' or 'southern'. Defaults to 'northern'.

#### type?

`"meteorological"` \| `"astronomical"`

Optional. The type of season calculation to use. Can be 'meteorological' or 'astronomical'. Defaults to 'astronomical'.

## Returns

`"winter"` \| `"spring"` \| `"summer"` \| `"fall"`

The name of the season ('winter', 'spring', 'summer', or 'fall').

## Examples

```ts
// Get the current season in the northern hemisphere using astronomical seasons.
const season = getSeason();
console.log(season); // e.g., "summer" (if current date is July 7, 2025)
```

```ts
// Get the season for a specific date in the southern hemisphere using meteorological seasons.
const specificDate = new Date('2023-06-15');
const seasonSouthernMeteorological = getSeason({
  date: specificDate,
  hemisphere: 'southern',
  type: 'meteorological'
});
console.log(seasonSouthernMeteorological); // Output: "winter"
```

```ts
// Compare astronomical and meteorological seasons for a specific date in the Northern Hemisphere.
const march21 = new Date('2024-03-21');
const astronomicalSeason = getSeason({ date: march21, type: 'astronomical' });
console.log(`Astronomical season on March 21: ${astronomicalSeason}`); // Output: "spring"

const meteorologicalSeason = getSeason({ date: march21, type: 'meteorological' });
console.log(`Meteorological season on March 21: ${meteorologicalSeason}`); // Output: "spring"

const december1 = new Date('2024-12-01');
const astronomicalSeasonDec = getSeason({ date: december1, type: 'astronomical' });
console.log(`Astronomical season on December 1: ${astronomicalSeasonDec}`); // Output: "fall"

const meteorologicalSeasonDec = getSeason({ date: december1, type: 'meteorological' });
console.log(`Meteorological season on December 1: ${meteorologicalSeasonDec}`); // Output: "winter"
```
