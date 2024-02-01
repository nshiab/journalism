import assert from "assert"
import styledLayerDescriptor from "../../src/geo/styledLayerDescriptor.js"

describe("styledLayerDescriptor", () => {
    it("should return the SLD for a given layer and color scale", () => {
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
        ])

        assert.deepStrictEqual(
            sld,
            "%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3CStyledLayerDescriptor%20version%3D%221.0.0%22%20xmlns%3D%22http%3A%2F%2Fwww.opengis.net%2Fsld%22%20xmlns%3Aogc%3D%22http%3A%2F%2Fwww.opengis.net%2Fogc%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xsi%3AschemaLocation%3D%22http%3A%2F%2Fwww.opengis.net%2Fsld%20http%3A%2F%2Fschemas.opengis.net%2Fsld%2F1.0.0%2FStyledLayerDescriptor.xsd%22%3E%3CNamedLayer%3E%3Cse%3AName%3EGDPS.ETA_TT%3C%2Fse%3AName%3E%3CUserStyle%3E%3CTitle%3ECustom%20style%3C%2FTitle%3E%3Cse%3AFeatureTypeStyle%3E%3Cse%3ARule%3E%3Cse%3ARasterSymbolizer%3E%3Cse%3AOpacity%3E1.0%3C%2Fse%3AOpacity%3E%3CColorMap%3E%3CColorMapEntry%20color%3D%22%2321353f%22%20quantity%3D%22-100%22%2F%3E%3CColorMapEntry%20color%3D%22%23334f60%22%20quantity%3D%22-30%22%2F%3E%3CColorMapEntry%20color%3D%22%235881a1%22%20quantity%3D%22-20%22%2F%3E%3CColorMapEntry%20color%3D%22%2397b4cd%22%20quantity%3D%22-10%22%2F%3E%3CColorMapEntry%20color%3D%22%23e0e9f0%22%20quantity%3D%220%22%2F%3E%3CColorMapEntry%20color%3D%22%23bdbb7a%22%20quantity%3D%2210%22%2F%3E%3CColorMapEntry%20color%3D%22%23c26847%22%20quantity%3D%2220%22%2F%3E%3CColorMapEntry%20color%3D%22%237f2e34%22%20quantity%3D%2230%22%2F%3E%3CColorMapEntry%20color%3D%22%23550c24%22%20quantity%3D%22100%22%2F%3E%3C%2FColorMap%3E%3C%2Fse%3ARasterSymbolizer%3E%3C%2Fse%3ARule%3E%3C%2Fse%3AFeatureTypeStyle%3E%3C%2FUserStyle%3E%3C%2FNamedLayer%3E%3C%2FStyledLayerDescriptor%3E"
        )
    })
})
