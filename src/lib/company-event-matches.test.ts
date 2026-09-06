import { describe, it, expect } from "vitest";
import { getCompanyEventMatches } from "./company-event-matches";
import { makeApplication, makeEvent } from "@/test/fixtures";

describe("getCompanyEventMatches", () => {
  it("matches events by company name, case- and whitespace-insensitively", () => {
    const applications = [makeApplication({ company: " Goldman Sachs ", stage: "applied" })];
    const events = [makeEvent({ company: "goldman sachs" })];

    const matches = getCompanyEventMatches(applications, events);

    expect(matches).toHaveLength(1);
    expect(matches[0].company).toBe("goldman sachs");
  });

  it("ignores companies from inactive-stage applications", () => {
    const applications = [makeApplication({ company: "Goldman Sachs", stage: "rejected" })];
    const events = [makeEvent({ company: "Goldman Sachs" })];

    expect(getCompanyEventMatches(applications, events)).toHaveLength(0);
  });

  it("skips events with no company", () => {
    const applications = [makeApplication({ company: "Goldman Sachs", stage: "saved" })];
    const events = [makeEvent({ company: null })];

    expect(getCompanyEventMatches(applications, events)).toHaveLength(0);
  });

  it("returns only the first (soonest) event per tracked company", () => {
    const applications = [makeApplication({ company: "Goldman Sachs", stage: "saved" })];
    const events = [
      makeEvent({ id: "soonest", company: "Goldman Sachs" }),
      makeEvent({ id: "later", company: "Goldman Sachs" }),
    ];

    const matches = getCompanyEventMatches(applications, events);

    expect(matches).toHaveLength(1);
    expect(matches[0].event.id).toBe("soonest");
  });
});
