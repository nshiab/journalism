export default function noScientificNotation(value: number) {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  if (absValue < 0.000001) {
    let valueString = absValue.toFixed(20);
    while (
      valueString.length > 1 &&
      (valueString.at(-1) === "0" || valueString.at(-1) === ".")
    ) {
      valueString = valueString.slice(0, valueString.length - 1);
    }
    return isNegative ? `-${valueString}` : valueString;
  } else {
    return `${value}`;
  }
}
