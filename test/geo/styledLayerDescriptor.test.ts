import { assertEquals } from "jsr:@std/assert";
import styledLayerDescriptor from "../../src/geo/styledLayerDescriptor.ts";

Deno.test("should return the SLD for a given layer and color scale", () => {
  const sld = styledLayerDescriptor("GDPS.ETA_TT", [
    { color: "#550c24", value: 100 },
    { color: "#7f2e34", value: 30 },
    { color: "#c26847", value: 20 },
    { color: "#bdbb7a", value: 10 },
    { color: "#e0e9f0", value: 0 },
    { color: "#97b4cd", value: -10 },
    { color: "#5881a1", value: -20 },
    { color: "#334f60", value: -30 },
    { color: "#21353f", value: -100 },
  ]);

  assertEquals(
    sld,
    "%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3CStyledLayerDescriptor%20version%3D%221.0.0%22%20xmlns%3D%22http%3A%2F%2Fwww.opengis.net%2Fsld%22%20xmlns%3Aogc%3D%22http%3A%2F%2Fwww.opengis.net%2Fogc%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xsi%3AschemaLocation%3D%22http%3A%2F%2Fwww.opengis.net%2Fsld%20http%3A%2F%2Fschemas.opengis.net%2Fsld%2F1.0.0%2FStyledLayerDescriptor.xsd%22%3E%3CNamedLayer%3E%3Cse%3AName%3EGDPS.ETA_TT%3C%2Fse%3AName%3E%3CUserStyle%3E%3CTitle%3ECustom%20style%3C%2FTitle%3E%3Cse%3AFeatureTypeStyle%3E%3Cse%3ARule%3E%3Cse%3ARasterSymbolizer%3E%3Cse%3AOpacity%3E1.0%3C%2Fse%3AOpacity%3E%3CColorMap%3E%3CColorMapEntry%20color%3D%22%2321353f%22%20quantity%3D%22-100%22%2F%3E%3CColorMapEntry%20color%3D%22%23334f60%22%20quantity%3D%22-30%22%2F%3E%3CColorMapEntry%20color%3D%22%235881a1%22%20quantity%3D%22-20%22%2F%3E%3CColorMapEntry%20color%3D%22%2397b4cd%22%20quantity%3D%22-10%22%2F%3E%3CColorMapEntry%20color%3D%22%23e0e9f0%22%20quantity%3D%220%22%2F%3E%3CColorMapEntry%20color%3D%22%23bdbb7a%22%20quantity%3D%2210%22%2F%3E%3CColorMapEntry%20color%3D%22%23c26847%22%20quantity%3D%2220%22%2F%3E%3CColorMapEntry%20color%3D%22%237f2e34%22%20quantity%3D%2230%22%2F%3E%3CColorMapEntry%20color%3D%22%23550c24%22%20quantity%3D%22100%22%2F%3E%3C%2FColorMap%3E%3C%2Fse%3ARasterSymbolizer%3E%3C%2Fse%3ARule%3E%3C%2Fse%3AFeatureTypeStyle%3E%3C%2FUserStyle%3E%3C%2FNamedLayer%3E%3C%2FStyledLayerDescriptor%3E",
  );
});
Deno.test("should return the SLD for a given layer and color scale with very small values (not converting them to scientific notation)", () => {
  const sld = styledLayerDescriptor("RAQDPS-FW.SFC_PM2.5-DIFF", [
    { color: "#D6D5D6", value: 0 },
    { color: "#D6D5D6", value: 0.000000005 },
    { color: "#C7C3C5", value: 0.00000001 },
    { color: "#B8B1B4", value: 0.00000002 },
    { color: "#AA9EA4", value: 0.00000004 },
    { color: "#9C8B92", value: 0.00000006 },
    { color: "#8F7781", value: 0.00000008 },
    { color: "#83636F", value: 0.0000001 },
    { color: "#764E5D", value: 0.00000015 },
    { color: "#6B384B", value: 0.0000002 },
    { color: "#602338", value: 0.00000025 },
    { color: "#550C24", value: 0.00001 },
  ]);

  assertEquals(
    sld,
    "%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3CStyledLayerDescriptor%20version%3D%221.0.0%22%20xmlns%3D%22http%3A%2F%2Fwww.opengis.net%2Fsld%22%20xmlns%3Aogc%3D%22http%3A%2F%2Fwww.opengis.net%2Fogc%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xsi%3AschemaLocation%3D%22http%3A%2F%2Fwww.opengis.net%2Fsld%20http%3A%2F%2Fschemas.opengis.net%2Fsld%2F1.0.0%2FStyledLayerDescriptor.xsd%22%3E%3CNamedLayer%3E%3Cse%3AName%3ERAQDPS-FW.SFC_PM2.5-DIFF%3C%2Fse%3AName%3E%3CUserStyle%3E%3CTitle%3ECustom%20style%3C%2FTitle%3E%3Cse%3AFeatureTypeStyle%3E%3Cse%3ARule%3E%3Cse%3ARasterSymbolizer%3E%3Cse%3AOpacity%3E1.0%3C%2Fse%3AOpacity%3E%3CColorMap%3E%3CColorMapEntry%20color%3D%22%23D6D5D6%22%20quantity%3D%220%22%2F%3E%3CColorMapEntry%20color%3D%22%23D6D5D6%22%20quantity%3D%220.000000005%22%2F%3E%3CColorMapEntry%20color%3D%22%23C7C3C5%22%20quantity%3D%220.00000001%22%2F%3E%3CColorMapEntry%20color%3D%22%23B8B1B4%22%20quantity%3D%220.00000002%22%2F%3E%3CColorMapEntry%20color%3D%22%23AA9EA4%22%20quantity%3D%220.00000004%22%2F%3E%3CColorMapEntry%20color%3D%22%239C8B92%22%20quantity%3D%220.00000006%22%2F%3E%3CColorMapEntry%20color%3D%22%238F7781%22%20quantity%3D%220.00000008%22%2F%3E%3CColorMapEntry%20color%3D%22%2383636F%22%20quantity%3D%220.0000001%22%2F%3E%3CColorMapEntry%20color%3D%22%23764E5D%22%20quantity%3D%220.00000015%22%2F%3E%3CColorMapEntry%20color%3D%22%236B384B%22%20quantity%3D%220.0000002%22%2F%3E%3CColorMapEntry%20color%3D%22%23602338%22%20quantity%3D%220.00000025%22%2F%3E%3CColorMapEntry%20color%3D%22%23550C24%22%20quantity%3D%220.00001%22%2F%3E%3C%2FColorMap%3E%3C%2Fse%3ARasterSymbolizer%3E%3C%2Fse%3ARule%3E%3C%2Fse%3AFeatureTypeStyle%3E%3C%2FUserStyle%3E%3C%2FNamedLayer%3E%3C%2FStyledLayerDescriptor%3E",
  );
});
