import { describe, expect, it } from "vitest"

import {
  addDaysToIsoDate,
  formatDatePtBr,
  getTodayIsoDate,
} from "./date-utils"

describe("date utilities", () => {
  it("uses the business timezone when determining today", () => {
    expect(getTodayIsoDate(new Date("2026-09-26T02:30:00.000Z"))).toBe(
      "2026-09-25"
    )
  })

  it("adds days across month and leap-year boundaries", () => {
    expect(addDaysToIsoDate("2024-02-28", 1)).toBe("2024-02-29")
    expect(addDaysToIsoDate("2026-09-30", 1)).toBe("2026-10-01")
  })

  it("formats ISO dates for Brazilian users", () => {
    expect(formatDatePtBr("2026-09-25")).toBe("25/09/2026")
  })
})