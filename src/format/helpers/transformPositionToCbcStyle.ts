// Utility to transform a number position to CBC-style string (e.g., 1 -> 'first', 2 -> 'second', 11 -> '11th')
export function transformPositionToCbcStyle(position: number): string {
  if (position < 1 || !Number.isInteger(position)) {
    throw new Error("Input must be a positive integer.");
  }

  const singleDigitOrdinals: { [key: number]: string } = {
    1: "first",
    2: "second",
    3: "third",
    4: "fourth",
    5: "fifth",
    6: "sixth",
    7: "seventh",
    8: "eighth",
    9: "ninth",
  };

  if (position >= 1 && position <= 9) {
    return singleDigitOrdinals[position];
  } else {
    let suffix = "th";
    if (position % 10 === 1 && position % 100 !== 11) {
      suffix = "st";
    } else if (position % 10 === 2 && position % 100 !== 12) {
      suffix = "nd";
    } else if (position % 10 === 3 && position % 100 !== 13) {
      suffix = "rd";
    }
    return `${position}${suffix}`;
  }
}
