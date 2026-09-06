import { describe, it, expect } from "vitest";
import { getCompanyOpportunityMatches } from "./company-opportunity-matches";
import { makeApplication, makeOpportunity } from "@/test/fixtures";

describe("getCompanyOpportunityMatches", () => {
  it("matches a new opportunity from a company the user is actively tracking", () => {
    const applications = [makeApplication({ company: "BlackRock", stage: "applied" })];
    const opportunities = [makeOpportunity({ company: "BlackRock" })];

    const matches = getCompanyOpportunityMatches(applications, opportunities);

    expect(matches).toHaveLength(1);
    expect(matches[0].company).toBe("BlackRock");
  });

  it("excludes an opportunity the user already applied to", () => {
    const opportunity = makeOpportunity({ company: "BlackRock" });
    const applications = [
      makeApplication({ company: "BlackRock", stage: "applied", opportunity_id: opportunity.id }),
    ];

    expect(getCompanyOpportunityMatches(applications, [opportunity])).toHaveLength(0);
  });

  it("excludes closed opportunities", () => {
    const applications = [makeApplication({ company: "BlackRock", stage: "applied" })];
    const opportunities = [makeOpportunity({ company: "BlackRock", status: "closed" })];

    expect(getCompanyOpportunityMatches(applications, opportunities)).toHaveLength(0);
  });

  it("ignores companies with no active-stage application", () => {
    const applications = [makeApplication({ company: "BlackRock", stage: "withdrawn" })];
    const opportunities = [makeOpportunity({ company: "BlackRock" })];

    expect(getCompanyOpportunityMatches(applications, opportunities)).toHaveLength(0);
  });

  it("returns only one match per company", () => {
    const applications = [makeApplication({ company: "BlackRock", stage: "applied" })];
    const opportunities = [
      makeOpportunity({ id: "first", company: "BlackRock" }),
      makeOpportunity({ id: "second", company: "BlackRock" }),
    ];

    expect(getCompanyOpportunityMatches(applications, opportunities)).toHaveLength(1);
  });
});
