import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import overwriteSheetData from "../../src/google/overwriteSheetData.ts";
import getSheetData from "../../src/google/getSheetData.ts";

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1Ar19cP8oGYEzacfrkLWnSH7ZqImILMUrosBwnZ43EQM/edit#gid=0";

const originalData = [
  { first: "Nael", last: "Shiab" },
  { first: "Andrew", last: "Ryan" },
  { first: "Graeme", last: "Bruce" },
  { first: "Dexter", last: "McMillan" },
];

// Commented tests because too many requests on API.

const email = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
const key = Deno.env.get("GOOGLE_PRIVATE_KEY");

if (
  typeof email === "string" &&
  email !== "" &&
  typeof key === "string" &&
  key !== ""
) {
  // Deno.test("should return the data from a sheet as an array of object", async () => {
  //     await overwriteSheetData(originalData, sheetUrl)

  //     const data = await getSheetData(sheetUrl)

  //     assertEquals(data, originalData)
  // })
  // Deno.test("should return the data from a sheet as a csv", async () => {
  //     const data = await getSheetData(sheetUrl, { csv: true })

  //     assertEquals(
  //         data,
  //         "first,last\r\nNael,Shiab\r\nAndrew,Ryan\r\nGraeme,Bruce\r\nDexter,McMillan"
  //     )
  // })
  // Deno.test("should return the data as a csv after skipping the first row", async () => {
  //     const data = await getSheetData(sheetUrl, { skip: 1, csv: true })

  //     assertEquals(
  //         data,
  //         "first,last\r\nNael,Shiab\r\nAndrew,Ryan\r\nGraeme,Bruce\r\nDexter,McMillan"
  //     )
  // })

  Deno.test("should return the data as an array of objects after skipping the first row", async () => {
    await overwriteSheetData(originalData, sheetUrl, {
      prepend: "Contact me for more info",
    });

    const data = await getSheetData(sheetUrl, { skip: 1 });

    assertEquals(data, originalData);
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
//     Deno.test("should return the data as an array of objects after skipping the first row, with a specific apiEmail and apiKey", async () => {
//         await overwriteSheetData(originalData, sheetUrl, {
//             prepend: "Contact me for more info",
//             apiEmail: "GG_EMAIL",
//             apiKey: "GG_KEY",
//         })
//         const data = await getSheetData(sheetUrl, {
//             skip: 1,
//             apiEmail: "GG_EMAIL",
//             apiKey: "GG_KEY",
//         })

//         assertEquals(data, originalData)
//     })
// } else {
//     console.log("No GG_EMAIL or GG_KEY in process.env")
// }
