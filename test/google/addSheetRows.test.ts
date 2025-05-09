import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import addSheetRows from "../../src/google/addSheetRows.ts";
import getSheetData from "../../src/google/getSheetData.ts";
import overwriteSheetData from "../../src/google/overwriteSheetData.ts";

const data = [
  { first: "Nael", last: "Shiab" },
  { first: "Andrew", last: "Ryan" },
];

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1Ar19cP8oGYEzacfrkLWnSH7ZqImILMUrosBwnZ43EQM/edit#gid=0";

// Commented tests because too many requests on API.

const email = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
const key = Deno.env.get("GOOGLE_PRIVATE_KEY");

if (
  typeof email === "string" &&
  email !== "" &&
  typeof key === "string" &&
  key !== ""
) {
  // Deno.test("should add a row to a sheet", async () => {
  //     await overwriteSheetData(data, sheetUrl)

  //     await addSheetRows(
  //         [{ first: "Dexter", last: "McMillan" }],
  //         sheetUrl
  //     )

  //     const testData = await getSheetData(sheetUrl)

  //     assertEquals(testData, [
  //         ...data,
  //         { first: "Dexter", last: "McMillan" },
  //     ])
  // })
  Deno.test("should add a row to a sheet with a specific headerIndex", async () => {
    await overwriteSheetData(data, sheetUrl, {
      prepend: "Hi",
      lastUpdate: true,
      timeZone: "Canada/Eastern",
    });

    await addSheetRows(
      [{ first: "Dexter", last: "McMillan" }],
      sheetUrl,
      {
        headerIndex: 2,
      },
    );

    const testData = await getSheetData(sheetUrl, { skip: 2 });

    assertEquals(testData, [
      ...data,
      { first: "Dexter", last: "McMillan" },
    ]);
  });
} else {
  console.log(
    "No GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY in process.env",
  );
}

// const differentEmail = process.env.GG_EMAIL
// const differentKey = process.env.GG_KEY

// if (
//     typeof differentEmail === "string" &&
//     differentEmail !== "" &&
//     typeof differentKey === "string" &&
//     differentKey !== ""
// ) {
//     Deno.test("should add rows with a specific apiEmail and apiKey", async () => {
//         await overwriteSheetData(data, sheetUrl)

//         await addSheetRows(
//             [{ first: "Dexter", last: "McMillan" }],
//             sheetUrl,
//             {
//                 apiEmail: "GG_EMAIL",
//                 apiKey: "GG_KEY",
//             }
//         )

//         const testData = await getSheetData(sheetUrl)

//         assertEquals(testData, [
//             ...data,
//             { first: "Dexter", last: "McMillan" },
//         ])
//     })
// } else {
//     console.log("No GG_EMAIL or GG_KEY in process.env")
// }
