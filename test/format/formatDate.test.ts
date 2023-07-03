import assert from "assert"
import formatDateLocal from "../../src/format/formatDateLocal.js"

// Same tests than formatDateLocal, but takes into account the user's time zone.

process.env.TZ = "UTC"

describe("formatDateLocal", () => {
    const unix = 1672531200000
    const date = new Date("2023-01-01T01:35:00.000Z")
    const datePM = new Date("2023-01-01T15:35:00.000Z")
    const dateNoMinutes = new Date("2023-01-01T01:00:00.000Z")

    it("should accept a number a return a date formatted as a string", () => {
        const formattedDate = formatDateLocal(unix, "YYYY-MM-DD")
        assert.strictEqual(formattedDate, "2023-01-01")
    })
    it("should accept a Date a return it formatted as a string", () => {
        const formattedDate = formatDateLocal(date, "YYYY-MM-DD")
        assert.strictEqual(formattedDate, "2023-01-01")
    })
    it("should return a Date in the format Month Day, YYYY", () => {
        const formattedDate = formatDateLocal(date, "Month Day, YYYY")
        assert.strictEqual(formattedDate, "January 1, 2023")
    })
    it("should return a Date in the format Month Day, YYYY with an abbreviated month", () => {
        const formattedDate = formatDateLocal(date, "Month Day, YYYY", {
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Jan. 1, 2023")
    })
    it("should return a Date in the format Month Day, YYYY, at HH:MM period (morning)", () => {
        const formattedDate = formatDateLocal(
            date,
            "Month Day, YYYY, at HH:MM period"
        )
        assert.strictEqual(formattedDate, "January 1, 2023, at 1:35 a.m.")
    })
    it("should return a Date in the format Month Day, YYYY, at HH:MM period (afternoon)", () => {
        const formattedDate = formatDateLocal(
            datePM,
            "Month Day, YYYY, at HH:MM period"
        )
        assert.strictEqual(formattedDate, "January 1, 2023, at 3:35 p.m.")
    })
    it("should return a Date in the format Month Day, YYYY, at HH:MM period (afternoon) with an abbreviated month", () => {
        const formattedDate = formatDateLocal(
            datePM,
            "Month Day, YYYY, at HH:MM period",
            { abbreviations: true }
        )
        assert.strictEqual(formattedDate, "Jan. 1, 2023, at 3:35 p.m.")
    })
    it("should return a Date in the format Month Day, YYYY, at HH:MM without ':00' for the minutes", () => {
        const formattedDate = formatDateLocal(
            dateNoMinutes,
            "Month Day, YYYY, at HH:MM period"
        )
        assert.strictEqual(formattedDate, "January 1, 2023, at 1 a.m.")
    })
    it("should return the full day name", () => {
        const formattedDate = formatDateLocal(dateNoMinutes, "DayName")
        assert.strictEqual(formattedDate, "Sunday")
    })
    it("should return the abbreviated day name", () => {
        const formattedDate = formatDateLocal(dateNoMinutes, "DayName", {
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Sun.")
    })

    // Radio-Canada style

    it("should return a Date in the format Month Day, YYYY, with RC style", () => {
        const formattedDate = formatDateLocal(date, "Month Day, YYYY", {
            style: "rc",
        })
        assert.strictEqual(formattedDate, "1 janvier 2023")
    })
    it("should return a Date in the format Month Day, YYYY with an abbreviated month with RC style", () => {
        const formattedDate = formatDateLocal(date, "Month Day, YYYY", {
            abbreviations: true,
            style: "rc",
        })
        assert.strictEqual(formattedDate, "1 janv. 2023")
    })
    it("should return a Date in the format Month Day, YYYY, at HH:MM period (morning) with RC style", () => {
        const formattedDate = formatDateLocal(
            date,
            "Month Day, YYYY, at HH:MM period",
            {
                style: "rc",
            }
        )
        assert.strictEqual(formattedDate, "1 janvier 2023 à 1 h 35")
    })
    it("should return a Date in the format Month Day, YYYY, at HH:MM period (afternoon) with RC style", () => {
        const formattedDate = formatDateLocal(
            datePM,
            "Month Day, YYYY, at HH:MM period",
            { style: "rc" }
        )
        assert.strictEqual(formattedDate, "1 janvier 2023 à 15 h 35")
    })
    it("should return a Date in the format Month Day, YYYY, at HH:MM period (afternoon) with an abbreviated month with RC style", () => {
        const formattedDate = formatDateLocal(
            datePM,
            "Month Day, YYYY, at HH:MM period",
            { abbreviations: true, style: "rc" }
        )
        assert.strictEqual(formattedDate, "1 janv. 2023 à 15 h 35")
    })
    it("should return a Date in the format Month Day, YYYY, at HH:MM with RC style without ' h 00' for the minutes ", () => {
        const formattedDate = formatDateLocal(
            dateNoMinutes,
            "Month Day, YYYY, at HH:MM period",
            { style: "rc" }
        )
        assert.strictEqual(formattedDate, "1 janvier 2023 à 1 h")
    })
    it("should return the full day name with RC style", () => {
        const formattedDate = formatDateLocal(dateNoMinutes, "DayName", {
            style: "rc",
        })
        assert.strictEqual(formattedDate, "Dimanche")
    })
    it("should return the abbreviated day name with RC style", () => {
        const formattedDate = formatDateLocal(dateNoMinutes, "DayName", {
            style: "rc",
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Dim.")
    })
})
