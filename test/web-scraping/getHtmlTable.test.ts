import { assertEquals } from "jsr:@std/assert";
import { getHtmlTable } from "../../src/index.ts";

Deno.test("should return an array of objects from an HTML table with a selector option", async function () {
  const data = await getHtmlTable(
    "https://www.ourcommons.ca/proactivedisclosure/en/members/2024/1",
    { selector: "#data-table" },
  );

  assertEquals(
    data.slice(0, 5).map((d: { Name: string }) => ({
      ...d,
      Name: d.Name.replace("  ", " "),
    })),
    [
      {
        Name: "Aboultaif, Ziad",
        Constituency: "Edmonton Manning",
        Caucus: "Conservative",
        Salaries: "$53,042.45",
        Travel: "$17,000.89",
        Hospitality: "$324.13",
        Contracts: "$20,418.95",
      },
      {
        Name: "Aitchison, Scott",
        Constituency: "Parry Sound—Muskoka",
        Caucus: "Conservative",
        Salaries: "$48,851.38",
        Travel: "$25,974.00",
        Hospitality: "$0.00",
        Contracts: "$32,293.64",
      },
      {
        Name: "Albas, Dan",
        Constituency: "Central Okanagan—Similkameen—Nicola",
        Caucus: "Conservative",
        Salaries: "$65,109.19",
        Travel: "$11,249.47",
        Hospitality: "$618.09",
        Contracts: "$22,460.56",
      },
      {
        Name: "Aldag, John",
        Constituency: "Cloverdale—Langley City",
        Caucus: "Liberal",
        Salaries: "$58,440.80",
        Travel: "$30,079.67",
        Hospitality: "$1,002.71",
        Contracts: "$33,324.94",
      },
      {
        Name: "Alghabra, Hon. Omar",
        Constituency: "Mississauga Centre",
        Caucus: "Liberal",
        Salaries: "$61,894.45",
        Travel: "$13,627.07",
        Hospitality: "$1,928.11",
        Contracts: "$27,562.45",
      },
    ],
  );
});
Deno.test("should return an array of objects from an HTML table with an index option", async function () {
  const data = await getHtmlTable(
    "https://en.wikipedia.org/wiki/Medieval_demography",
    { index: 0 },
  );

  assertEquals(data, [
    {
      Year: "1000",
      "Total European population,millions": "56.4",
      "Absolute growth per period,millions": "—",
      "Average growth per year,thousands": "—",
      "Absolute growth per century,%": "—",
      "Average growth per year,%": "—",
    },
    {
      Year: "1100",
      "Total European population,millions": "62.1",
      "Absolute growth per period,millions": "5.7",
      "Average growth per year,thousands": "57",
      "Absolute growth per century,%": "10.1",
      "Average growth per year,%": "0.10",
    },
    {
      Year: "1200",
      "Total European population,millions": "68.0",
      "Absolute growth per period,millions": "5.9",
      "Average growth per year,thousands": "59",
      "Absolute growth per century,%": "9.5",
      "Average growth per year,%": "0.09",
    },
    {
      Year: "1250",
      "Total European population,millions": "72.9",
      "Absolute growth per period,millions": "4.9",
      "Average growth per year,thousands": "98",
      "Absolute growth per century,%": "15.7",
      "Average growth per year,%": "0.14",
    },
    {
      Year: "1300",
      "Total European population,millions": "78.7",
      "Absolute growth per period,millions": "5.8",
      "Average growth per year,thousands": "116",
      "Absolute growth per century,%": "0.15",
      "Average growth per year,%": "",
    },
    {
      Year: "1350",
      "Total European population,millions": "70.7",
      "Absolute growth per period,millions": "−8.0",
      "Average growth per year,thousands": "−160",
      "Absolute growth per century,%": "−0.8",
      "Average growth per year,%": "−0.21",
    },
    {
      Year: "1400",
      "Total European population,millions": "78.1",
      "Absolute growth per period,millions": "7.4",
      "Average growth per year,thousands": "148",
      "Absolute growth per century,%": "0.20",
      "Average growth per year,%": "",
    },
    {
      Year: "1450",
      "Total European population,millions": "83.0",
      "Absolute growth per period,millions": "4.9",
      "Average growth per year,thousands": "98",
      "Absolute growth per century,%": "16.1",
      "Average growth per year,%": "0.12",
    },
    {
      Year: "1500",
      "Total European population,millions": "90.7",
      "Absolute growth per period,millions": "7.7",
      "Average growth per year,thousands": "154",
      "Absolute growth per century,%": "0.18",
      "Average growth per year,%": "",
    },
  ]);
});
Deno.test("should return data from a website that is loading javascript", async () => {
  const data = await getHtmlTable(
    "https://tracreports.org/immigration/detentionstats/facilities.html",
    { selector: ".table" },
  );
  assertEquals(data.length >= 10, true);
});
