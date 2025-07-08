import { assertEquals } from "jsr:@std/assert";
import { getStatCanTable } from "../../src/index.ts";

Deno.test("should return an array of objects from a table id", async function () {
  const data = await getStatCanTable("9810000101");

  assertEquals(data, [
    {
      REF_DATE: "2021",
      GEO: "Canada",
      DGUID: "2021A000011124",
      Coordinate: "1",
      "Population and dwelling counts (11): Population, 2021 [1]": "36991981",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "35151728",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "5.2",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "16284235",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "15412443",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "5.7",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "14978941",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "14072079",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "6.4",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "8788702.80",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "4.2",
    },
    {
      REF_DATE: "2021",
      GEO: "Newfoundland and Labrador",
      DGUID: "2021A000210",
      Coordinate: "2",
      "Population and dwelling counts (11): Population, 2021 [1]": "510550",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "519716",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "-1.8",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "269184",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "265739",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "1.3",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "223253",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "218673",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "2.1",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "358170.37",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "1.4",
    },
    {
      REF_DATE: "2021",
      GEO: "Prince Edward Island",
      DGUID: "2021A000211",
      Coordinate: "3",
      "Population and dwelling counts (11): Population, 2021 [1]": "154331",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "142907",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "8.0",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "74934",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "71119",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "5.4",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "64570",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "59472",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "8.6",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "5681.18",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "27.2",
    },
    {
      REF_DATE: "2021",
      GEO: "Nova Scotia",
      DGUID: "2021A000212",
      Coordinate: "4",
      "Population and dwelling counts (11): Population, 2021 [1]": "969383",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "923598",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "5.0",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "476007",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "458568",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "3.8",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "428228",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "401990",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "6.5",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "52824.71",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "18.4",
    },
    {
      REF_DATE: "2021",
      GEO: "New Brunswick",
      DGUID: "2021A000213",
      Coordinate: "5",
      "Population and dwelling counts (11): Population, 2021 [1]": "775610",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "747101",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "3.8",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "366146",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "359721",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "1.8",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "337651",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "319773",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "5.6",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "71248.50",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "10.9",
    },
    {
      REF_DATE: "2021",
      GEO: "Quebec",
      DGUID: "2021A000224",
      Coordinate: "6",
      "Population and dwelling counts (11): Population, 2021 [1]": "8501833",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "8164361",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "4.1",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "4050164",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "3858943",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "5.0",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "3749035",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "3531663",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "6.2",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "1298599.75",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "6.5",
    },
    {
      REF_DATE: "2021",
      GEO: "Ontario",
      DGUID: "2021A000235",
      Coordinate: "7",
      "Population and dwelling counts (11): Population, 2021 [1]": "14223942",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "13448494",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "5.8",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "5929250",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "5598391",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "5.9",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "5491201",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "5169174",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "6.2",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "892411.76",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "15.9",
    },
    {
      REF_DATE: "2021",
      GEO: "Manitoba",
      DGUID: "2021A000246",
      Coordinate: "8",
      "Population and dwelling counts (11): Population, 2021 [1]": "1342153",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "1278365",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "5.0",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "571528",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "539748",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "5.9",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "518054",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "489050",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "5.9",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "540310.19",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "2.5",
    },
    {
      REF_DATE: "2021",
      GEO: "Saskatchewan",
      DGUID: "2021A000247",
      Coordinate: "9",
      "Population and dwelling counts (11): Population, 2021 [1]": "1132505",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "1098352",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "3.1",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "513725",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "495582",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "3.7",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "449581",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "432622",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "3.9",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "577060.40",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "2.0",
    },
    {
      REF_DATE: "2021",
      GEO: "Alberta",
      DGUID: "2021A000248",
      Coordinate: "10",
      "Population and dwelling counts (11): Population, 2021 [1]": "4262635",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "4067175",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "4.8",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "1772670",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "1654129",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "7.2",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "1633220",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "1527678",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "6.9",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "634658.27",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "6.7",
    },
    {
      REF_DATE: "2021",
      GEO: "British Columbia",
      DGUID: "2021A000259",
      Coordinate: "11",
      "Population and dwelling counts (11): Population, 2021 [1]": "5000879",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "4648055",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "7.6",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "2211694",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "2063417",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "7.2",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "2041834",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "1881969",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "8.5",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "920686.55",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "5.4",
    },
    {
      REF_DATE: "2021",
      GEO: "Yukon",
      DGUID: "2021A000260",
      Coordinate: "12",
      "Population and dwelling counts (11): Population, 2021 [1]": "40232",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "35874",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "12.1",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "19610",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "17987",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "9.0",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "17181",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "15215",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "12.9",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "472345.44",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "0.1",
    },
    {
      REF_DATE: "2021",
      GEO: "Northwest Territories",
      DGUID: "2021A000261",
      Coordinate: "13",
      "Population and dwelling counts (11): Population, 2021 [1]": "41070",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "41786",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "-1.7",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "17603",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "17666",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "-0.4",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "15207",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "14981",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "1.5",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "1127711.92",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "0.0",
    },
    {
      REF_DATE: "2021",
      GEO: "Nunavut",
      DGUID: "2021A000262",
      Coordinate: "14",
      "Population and dwelling counts (11): Population, 2021 [1]": "36858",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "35944",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "2.5",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "11720",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "11433",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "2.5",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "9926",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "9819",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "1.1",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "1836993.78",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "0.0",
    },
    {
      REF_DATE: "",
      GEO: "",
      DGUID: "",
      Coordinate: "",
      "Population and dwelling counts (11): Population, 2021 [1]": "",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "",
    },
    {
      REF_DATE: "",
      GEO: "",
      DGUID: "",
      Coordinate: "",
      "Population and dwelling counts (11): Population, 2021 [1]": "",
      Symbols: "",
      "Population and dwelling counts (11): Population, 2016 [2]": "",
      "Population and dwelling counts (11): Population percentage change, 2016 to 2021 [3]":
        "",
      "Population and dwelling counts (11): Total private dwellings, 2021 [4]":
        "",
      "Population and dwelling counts (11): Total private dwellings, 2016 [5]":
        "",
      "Population and dwelling counts (11): Total private dwellings percentage change, 2016 to 2021 [6]":
        "",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2021 [7]":
        "",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents, 2016 [8]":
        "",
      "Population and dwelling counts (11): Private dwellings occupied by usual residents percentage change, 2016 to 2021 [9]":
        "",
      "Population and dwelling counts (11): Land area in square kilometres, 2021 [10]":
        "",
      "Population and dwelling counts (11): Population density per square kilometre, 2021 [11]":
        "",
    },
  ]);
});
Deno.test("should return an array of objects from a table id in French", async function () {
  const data = await getStatCanTable("9810000101", {
    lang: "fr",
  });

  assertEquals(data, [
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Canada",
      DGUID: "2021A000011124",
      "Coordonnée": "1",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "36991981",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Terre-Neuve-et-Labrador",
      DGUID: "2021A000210",
      "Coordonnée": "2",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "510550",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Île-du-Prince-Édouard",
      DGUID: "2021A000211",
      "Coordonnée": "3",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "154331",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Nouvelle-Écosse",
      DGUID: "2021A000212",
      "Coordonnée": "4",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "969383",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Nouveau-Brunswick",
      DGUID: "2021A000213",
      "Coordonnée": "5",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "775610",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Québec",
      DGUID: "2021A000224",
      "Coordonnée": "6",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "8501833",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Ontario",
      DGUID: "2021A000235",
      "Coordonnée": "7",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "14223942",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Manitoba",
      DGUID: "2021A000246",
      "Coordonnée": "8",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "1342153",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Saskatchewan",
      DGUID: "2021A000247",
      "Coordonnée": "9",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "1132505",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Alberta",
      DGUID: "2021A000248",
      "Coordonnée": "10",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "4262635",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Colombie-Britannique",
      DGUID: "2021A000259",
      "Coordonnée": "11",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "5000879",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Yukon",
      DGUID: "2021A000260",
      "Coordonnée": "12",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "40232",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Territoires du Nord-Ouest",
      DGUID: "2021A000261",
      "Coordonnée": "13",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "41070",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "2021",
      "GÉO": "Nunavut",
      DGUID: "2021A000262",
      "Coordonnée": "14",
      "Chiffres de population et des logements (11): Population, 2021 [1]":
        "36858",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "",
      "GÉO": "",
      DGUID: "",
      "Coordonnée": "",
      "Chiffres de population et des logements (11): Population, 2021 [1]": "",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
    {
      "PÉRIODE DE RÉFÉRENCE": "",
      "GÉO": "",
      DGUID: "",
      "Coordonnée": "",
      "Chiffres de population et des logements (11): Population, 2021 [1]": "",
      Symboles: "",
      "Chiffres de population et des logements (11): Population, 2016 [2]": "",
      "Chiffres de population et des logements (11): Variation en pourcentage de la population, 2016 à 2021 [3]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2021 [4]":
        "",
      "Chiffres de population et des logements (11): Total des logements privés, 2016 [5]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage du total des logements privés, 2016 à 2021 [6]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2021 [7]":
        "",
      "Chiffres de population et des logements (11): Logements privés occupés par des résidents habituels, 2016 [8]":
        "",
      "Chiffres de population et des logements (11): Variation en pourcentage des logements privés occupés par des résidents habituels, 2016 à 2021 [9]":
        "",
      "Chiffres de population et des logements (11): Superficie des terres en kilomètres carrés, 2021 [10]":
        "",
      "Chiffres de population et des logements (11): Densité de population au kilomètre carré, 2021 [11]":
        "",
    },
  ]);
});
