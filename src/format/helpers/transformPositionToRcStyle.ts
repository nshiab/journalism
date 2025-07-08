// Returns the French ordinal for a given positive integer position.
// Returns the French ordinal for a given positive integer position.
export function transformPositionToRcStyle(position: number): string {
  if (!Number.isInteger(position) || position < 1) {
    throw new Error("Input must be a positive integer.");
  }
  const singleDigitOrdinals: { [key: number]: string } = {
    1: "premier",
    2: "deuxième",
    3: "troisième",
    4: "quatrième",
    5: "cinquième",
    6: "sixième",
    7: "septième",
    8: "huitième",
    9: "neuvième",
  };
  if (position >= 1 && position <= 9) {
    return singleDigitOrdinals[position];
  } else {
    return `${position}e`;
  }
}

