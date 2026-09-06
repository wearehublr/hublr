import { describe, it, expect } from "vitest";
import { compareByDate } from "./sort-by-date";

describe("compareByDate", () => {
  it("puts future dates before null dates, and null dates before past dates", () => {
    const future = new Date(Date.now() + 86400000).toISOString();
    const past = new Date(Date.now() - 86400000).toISOString();
    const dates = [past, null, future];

    const sorted = [...dates].sort(compareByDate);

    expect(sorted).toEqual([future, null, past]);
  });

  it("orders future dates soonest-first", () => {
    const soon = new Date(Date.now() + 1 * 86400000).toISOString();
    const later = new Date(Date.now() + 10 * 86400000).toISOString();

    expect([later, soon].sort(compareByDate)).toEqual([soon, later]);
  });

  it("orders past dates most-recently-passed-first", () => {
    const recent = new Date(Date.now() - 1 * 86400000).toISOString();
    const old = new Date(Date.now() - 10 * 86400000).toISOString();

    expect([old, recent].sort(compareByDate)).toEqual([recent, old]);
  });
});
