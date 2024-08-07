import assert from "assert"
import formatDate from "../../src/format/formatDate.js"

process.env.TZ = "America/Toronto"

describe("formatDate", () => {
    const unix = 1672531200000
    const date = new Date("2023-01-01T01:35:00.000Z")
    const datePM = new Date("2023-01-01T15:35:00.000Z")
    const dateNoMinutes = new Date("2023-01-01T01:00:00.000Z")
    const dateWithSeconds = new Date("2023-01-01T01:35:05.000Z")

    it("should accept a Date constructed from a unix timestamp and a return a date formatted as a string with local time", () => {
        const formattedDate = formatDate(new Date(unix), "YYYY-MM-DD")
        assert.strictEqual(formattedDate, "2022-12-31")
    })
    it("should accept a Date constructed from a unix timestamp and a return a date formatted as a string with utc time", () => {
        const formattedDate = formatDate(new Date(unix), "YYYY-MM-DD", {
            utc: true,
        })
        assert.strictEqual(formattedDate, "2023-01-01")
    })
    it("should accept a Date a return it formatted as a string with local time", () => {
        const formattedDate = formatDate(date, "YYYY-MM-DD")
        assert.strictEqual(formattedDate, "2022-12-31")
    })
    it("should accept a Date a return it formatted as a string with UTC time", () => {
        const formattedDate = formatDate(date, "YYYY-MM-DD", { utc: true })
        assert.strictEqual(formattedDate, "2023-01-01")
    })
    it("should return a Date in the format YYYY-MM-DD HH:MM:SS TZ", () => {
        const formattedDate = formatDate(
            dateWithSeconds,
            "YYYY-MM-DD HH:MM:SS TZ",
            {
                utc: true,
            }
        )
        assert.strictEqual(formattedDate, "2023-01-01 01:35:05 UTC")
    })
    it("should return a Date in the format YYYY-MM-DD HH:MM:SS TZ with a specific time zone", () => {
        const formattedDate = formatDate(
            dateWithSeconds,
            "YYYY-MM-DD HH:MM:SS TZ",
            { timeZone: "Canada/Eastern" }
        )
        assert.strictEqual(formattedDate, "2022-12-31 20:35:05 ET")
    })
    it("should return a Date in the format Month DD, YYYY", () => {
        const formattedDate = formatDate(date, "Month DD, YYYY", { utc: true })
        assert.strictEqual(formattedDate, "January 1, 2023")
    })
    it("should return a Date in the format Month DD, YYYY with an abbreviated month", () => {
        const formattedDate = formatDate(date, "Month DD, YYYY", {
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "Jan. 1, 2023")
    })
    it("should return a Date in the format Month DD, YYYY, at HH:MM period with an abbreviated month", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period",
            {
                abbreviations: true,
                utc: true,
            }
        )
        assert.strictEqual(formattedDate, "Jan. 1, 2023, at 1:35 a.m.")
    })
    it("should return a Date in the format Month DD, YYYY, at HH:MM period (morning)", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period",
            { utc: true }
        )
        assert.strictEqual(formattedDate, "January 1, 2023, at 1:35 a.m.")
    })
    it("should return a Date in the format Month DD, YYYY, at HH:MM period (afternoon)", () => {
        const formattedDate = formatDate(
            datePM,
            "Month DD, YYYY, at HH:MM period",
            { utc: true }
        )
        assert.strictEqual(formattedDate, "January 1, 2023, at 3:35 p.m.")
    })
    it("should return a Date in the format Month DD, YYYY, at HH:MM without ':00' for the minutes", () => {
        const formattedDate = formatDate(
            dateNoMinutes,
            "Month DD, YYYY, at HH:MM period",
            { utc: true }
        )
        assert.strictEqual(formattedDate, "January 1, 2023, at 1 a.m.")
    })
    it("should return the full day name", () => {
        const formattedDate = formatDate(dateNoMinutes, "DayOfWeek", {
            utc: true,
        })
        assert.strictEqual(formattedDate, "Sunday")
    })
    it("should return the abbreviated day name", () => {
        const formattedDate = formatDate(dateNoMinutes, "DayOfWeek", {
            utc: true,
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Sun.")
    })
    it("should return the full month name", () => {
        const formattedDate = formatDate(date, "Month", { utc: true })
        assert.strictEqual(formattedDate, "January")
    })
    it("should return the abbreviated month name", () => {
        const formattedDate = formatDate(date, "Month", {
            utc: true,
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Jan.")
    })
    it("should return the day name, followed by the month and the day", () => {
        const formattedDate = formatDate(date, "DayOfWeek, Month Day", {
            utc: true,
        })
        assert.strictEqual(formattedDate, "Sunday, January 1")
    })
    it("should return the day name, followed by the month and the day, abbreviated", () => {
        const formattedDate = formatDate(date, "DayOfWeek, Month Day", {
            utc: true,
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Sun., Jan. 1")
    })
    it("should return the month and the day", () => {
        const formattedDate = formatDate(date, "Month DD", { utc: true })
        assert.strictEqual(formattedDate, "January 1")
    })
    it("should return the month and the day", () => {
        const formattedDate = formatDate(date, "Month DD", {
            utc: true,
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Jan. 1")
    })
    it("should return the month", () => {
        const formattedDate = formatDate(date, "Month", { utc: true })
        assert.strictEqual(formattedDate, "January")
    })
    it("should return the month abbreviated", () => {
        const formattedDate = formatDate(date, "Month", {
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "Jan.")
    })
    it("should return the zero-padded day", () => {
        const formattedDate = formatDate(date, "DD", { utc: true })
        assert.strictEqual(formattedDate, "01")
    })
    it("should return the zero-padded day and abbreviations shouldn't change a thing", () => {
        const formattedDate = formatDate(date, "DD", {
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "01")
    })
    it("should return the day without 0 padding", () => {
        const formattedDate = formatDate(date, "DD", {
            noZeroPadding: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "1")
    })
    it("should return the zero-padded month", () => {
        const formattedDate = formatDate(date, "DD", { utc: true })
        assert.strictEqual(formattedDate, "01")
    })
    it("should return the month without zero padding", () => {
        const formattedDate = formatDate(date, "DD", {
            noZeroPadding: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "1")
    })
    it("should return the zero-padded month and abbreviations shouldn't change a thing", () => {
        const formattedDate = formatDate(date, "DD", {
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "01")
    })
    it("should return the year", () => {
        const formattedDate = formatDate(date, "YYYY", { utc: true })
        assert.strictEqual(formattedDate, "2023")
    })
    it("should return the year and abbreviations shouldn't change a thing", () => {
        const formattedDate = formatDate(date, "YYYY", {
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "2023")
    })
    it("should return the 'Month DD, YYYY, at HH:MM period' for local time zone", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period"
        )
        assert.strictEqual(formattedDate, "December 31, 2022, at 8:35 p.m.")
    })
    it("should return the 'Month DD, YYYY, at HH:MM period' for a specific time zone", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period",
            { timeZone: "Canada/Atlantic" }
        )
        assert.strictEqual(formattedDate, "December 31, 2022, at 9:35 p.m.")
    })
    it("should return the date for UTC time zone with the time zone in the string", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period TZ",
            { utc: true }
        )
        assert.strictEqual(formattedDate, "January 1, 2023, at 1:35 a.m. UTC")
    })
    it("should return the date for a specific time zone with the time zone in the string", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period TZ",
            { timeZone: "Canada/Atlantic" }
        )
        assert.strictEqual(formattedDate, "December 31, 2022, at 9:35 p.m. AT")
    })
    it("should return the date in the format Month DD, HH:MM period", () => {
        const formattedDate = formatDate(date, "Month DD, HH:MM period")
        assert.strictEqual(formattedDate, "December 31, 8:35 p.m.")
    })
    it("should return the date in the format Month DD, HH:MM period with abbreviated month", () => {
        const formattedDate = formatDate(date, "Month DD, HH:MM period", {
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Dec. 31, 8:35 p.m.")
    })
    it("should return the date in the format Month DD, HH:MM period TZ", () => {
        const formattedDate = formatDate(date, "Month DD, HH:MM period TZ")
        assert.strictEqual(formattedDate, "December 31, 8:35 p.m. ET")
    })
    it("should return the date in the format Month DD, HH:MM period TZ with abbreviated month", () => {
        const formattedDate = formatDate(date, "Month DD, HH:MM period TZ", {
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Dec. 31, 8:35 p.m. ET")
    })
    it("should return the date in the format DayOfWeek, HH:MM period", () => {
        const formattedDate = formatDate(date, "DayOfWeek, HH:MM period")
        assert.strictEqual(formattedDate, "Saturday, 8:35 p.m.")
    })
    it("should return the date in the format DayOfWeek, HH:MM period with abbreviated month", () => {
        const formattedDate = formatDate(date, "DayOfWeek, HH:MM period", {
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Sat., 8:35 p.m.")
    })
    it("should return the date in the format DayOfWeek, HH:MM period TZ", () => {
        const formattedDate = formatDate(date, "DayOfWeek, HH:MM period TZ")
        assert.strictEqual(formattedDate, "Saturday, 8:35 p.m. ET")
    })
    it("should return the date in the format DayOfWeek, HH:MM period TZ with abbreviated month", () => {
        const formattedDate = formatDate(date, "DayOfWeek, HH:MM period TZ", {
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Sat., 8:35 p.m. ET")
    })
    it("should return the date in the format HH:MM period", () => {
        const formattedDate = formatDate(date, "HH:MM period")
        assert.strictEqual(formattedDate, "8:35 p.m.")
    })
    it("should return the date in the format HH:MM period TZ", () => {
        const formattedDate = formatDate(date, "HH:MM period TZ", {
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "8:35 p.m. ET")
    })

    // Radio-Canada style

    it("should return a Date in the format Month DD, YYYY, with RC style", () => {
        const formattedDate = formatDate(date, "Month DD, YYYY", {
            style: "rc",
            utc: true,
        })
        assert.strictEqual(formattedDate, "1 janvier 2023")
    })
    it("should return a Date in the format Month DD, YYYY with an abbreviated month with RC style", () => {
        const formattedDate = formatDate(date, "Month DD, YYYY", {
            abbreviations: true,
            style: "rc",
            utc: true,
        })
        assert.strictEqual(formattedDate, "1 janv. 2023")
    })
    it("should return a Date in the format Month DD, YYYY, at HH:MM period (morning) with RC style", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period",
            {
                utc: true,
                style: "rc",
            }
        )
        assert.strictEqual(formattedDate, "1 janvier 2023 à 1 h 35")
    })
    it("should return a Date in the format Month DD, YYYY, at HH:MM period (afternoon) with RC style", () => {
        const formattedDate = formatDate(
            datePM,
            "Month DD, YYYY, at HH:MM period",
            { utc: true, style: "rc" }
        )
        assert.strictEqual(formattedDate, "1 janvier 2023 à 15 h 35")
    })
    it("should return a Date in the format Month DD, YYYY, at HH:MM with RC style without ' h 00' for the minutes ", () => {
        const formattedDate = formatDate(
            dateNoMinutes,
            "Month DD, YYYY, at HH:MM period",
            { style: "rc", utc: true }
        )
        assert.strictEqual(formattedDate, "1 janvier 2023 à 1 h")
    })
    it("should return the full day name with RC style", () => {
        const formattedDate = formatDate(dateNoMinutes, "DayOfWeek", {
            style: "rc",
            utc: true,
        })
        assert.strictEqual(formattedDate, "Dimanche")
    })
    it("should return the abbreviated day name with RC style", () => {
        const formattedDate = formatDate(dateNoMinutes, "DayOfWeek", {
            style: "rc",
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "Dim.")
    })
    it("should return the full month name with RC style", () => {
        const formattedDate = formatDate(date, "Month", {
            style: "rc",
            utc: true,
        })
        assert.strictEqual(formattedDate, "janvier")
    })
    it("should return the abbreviated month name with RC style", () => {
        const formattedDate = formatDate(dateNoMinutes, "Month", {
            style: "rc",
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "janv.")
    })
    it("should return the day name, followed by the month and the day with RC style", () => {
        const formattedDate = formatDate(date, "DayOfWeek, Month Day", {
            utc: true,
            style: "rc",
        })
        assert.strictEqual(formattedDate, "Dimanche 1 janvier")
    })
    it("should return the day name, followed by the month and the day, abbreviated with RC style", () => {
        const formattedDate = formatDate(date, "DayOfWeek, Month Day", {
            utc: true,
            style: "rc",
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "Dim. 1 janv.")
    })
    it("should return the month and the day with RC style", () => {
        const formattedDate = formatDate(date, "Month DD", {
            style: "rc",
            utc: true,
        })
        assert.strictEqual(formattedDate, "1 janvier")
    })
    it("should return the month and the day with RC style abbreviated", () => {
        const formattedDate = formatDate(date, "Month DD", {
            utc: true,
            style: "rc",
            abbreviations: true,
        })
        assert.strictEqual(formattedDate, "1 janv.")
    })
    it("should return the month with RC style", () => {
        const formattedDate = formatDate(date, "Month", {
            style: "rc",
            utc: true,
        })
        assert.strictEqual(formattedDate, "janvier")
    })
    it("should return the month abbreviated with RC style", () => {
        const formattedDate = formatDate(date, "Month", {
            style: "rc",
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "janv.")
    })
    it("should return the zero-padded day with RC style", () => {
        const formattedDate = formatDate(date, "DD", { style: "rc", utc: true })
        assert.strictEqual(formattedDate, "01")
    })
    it("should return the zero-padded day with RC style and without zero padding", () => {
        const formattedDate = formatDate(date, "DD", {
            style: "rc",
            noZeroPadding: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "1")
    })
    it("should return the zero-padded day and abbreviations shouldn't change a thing with RC style", () => {
        const formattedDate = formatDate(date, "DD", {
            style: "rc",
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "01")
    })
    it("should return the zero-padded month with RC style", () => {
        const formattedDate = formatDate(date, "DD", { style: "rc", utc: true })
        assert.strictEqual(formattedDate, "01")
    })
    it("should return the zero-padded month with RC style but without zero padding", () => {
        const formattedDate = formatDate(date, "DD", {
            style: "rc",
            noZeroPadding: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "1")
    })
    it("should return the zero-padded month and abbreviations shouldn't change a thing with RC style", () => {
        const formattedDate = formatDate(date, "DD", {
            style: "rc",
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "01")
    })
    it("should return the year with RC style", () => {
        const formattedDate = formatDate(date, "YYYY", {
            style: "rc",
            utc: true,
        })
        assert.strictEqual(formattedDate, "2023")
    })
    it("should return the year and abbreviations shouldn't change a thing with RC style", () => {
        const formattedDate = formatDate(date, "YYYY", {
            style: "rc",
            abbreviations: true,
            utc: true,
        })
        assert.strictEqual(formattedDate, "2023")
    })
    it("should return the 'Month DD, YYYY, at HH:MM period' for local time zone with RC style", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period",
            {
                style: "rc",
            }
        )
        assert.strictEqual(formattedDate, "31 décembre 2022 à 20 h 35")
    })
    it("should return the 'Month DD, YYYY, at HH:MM period' for a specific time zone with RC style", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period",
            { timeZone: "Canada/Atlantic", style: "rc" }
        )
        assert.strictEqual(formattedDate, "31 décembre 2022 à 21 h 35")
    })
    it("should return the date for a specific time zone with the time zone in the string with RC style", () => {
        const formattedDate = formatDate(
            date,
            "Month DD, YYYY, at HH:MM period TZ",
            { timeZone: "Canada/Atlantic", style: "rc" }
        )
        assert.strictEqual(formattedDate, "31 décembre 2022 à 21 h 35 HNA")
    })
    it("should return the date in the format Month DD, HH:MM period with RC style", () => {
        const formattedDate = formatDate(date, "Month DD, HH:MM period", {
            style: "rc",
        })
        assert.strictEqual(formattedDate, "31 décembre, 20 h 35")
    })
    it("should return the date in the format Month DD, HH:MM period with abbreviated month with RC style", () => {
        const formattedDate = formatDate(date, "Month DD, HH:MM period", {
            abbreviations: true,
            style: "rc",
        })
        assert.strictEqual(formattedDate, "31 déc., 20 h 35")
    })
    it("should return the date in the format Month DD, HH:MM period TZ with RC style", () => {
        const formattedDate = formatDate(date, "Month DD, HH:MM period TZ", {
            style: "rc",
        })
        assert.strictEqual(formattedDate, "31 décembre, 20 h 35 HNE")
    })
    it("should return the date in the format Month DD, HH:MM period TZ with abbreviated month with RC style", () => {
        const formattedDate = formatDate(date, "Month DD, HH:MM period TZ", {
            abbreviations: true,
            style: "rc",
        })
        assert.strictEqual(formattedDate, "31 déc., 20 h 35 HNE")
    })
    it("should return the date in the format DayOfWeek, HH:MM period with RC style", () => {
        const formattedDate = formatDate(date, "DayOfWeek, HH:MM period", {
            style: "rc",
        })
        assert.strictEqual(formattedDate, "Samedi, 20 h 35")
    })
    it("should return the date in the format DayOfWeek, HH:MM period with abbreviated month with RC style", () => {
        const formattedDate = formatDate(date, "DayOfWeek, HH:MM period", {
            abbreviations: true,
            style: "rc",
        })
        assert.strictEqual(formattedDate, "Sam., 20 h 35")
    })
    it("should return the date in the format DayOfWeek, HH:MM period TZ with RC style", () => {
        const formattedDate = formatDate(date, "DayOfWeek, HH:MM period TZ", {
            style: "rc",
        })
        assert.strictEqual(formattedDate, "Samedi, 20 h 35 HNE")
    })
    it("should return the date in the format DayOfWeek, HH:MM period TZ with abbreviated month with RC style", () => {
        const formattedDate = formatDate(date, "DayOfWeek, HH:MM period TZ", {
            abbreviations: true,
            style: "rc",
        })
        assert.strictEqual(formattedDate, "Sam., 20 h 35 HNE")
    })
    it("should return the date in the format HH:MM period with RC style", () => {
        const formattedDate = formatDate(date, "HH:MM period", { style: "rc" })
        assert.strictEqual(formattedDate, "20 h 35")
    })
    it("should return the date in the format HH:MM period TZ with RC style", () => {
        const formattedDate = formatDate(date, "HH:MM period TZ", {
            abbreviations: true,
            style: "rc",
        })
        assert.strictEqual(formattedDate, "20 h 35 HNE")
    })
})
