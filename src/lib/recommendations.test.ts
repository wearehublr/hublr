import { describe, it, expect } from "vitest";
import {
  getRecommendedOpportunities,
  summarizeRecommendations,
  isClosingWithinDays,
  countClosingWithinDays,
} from "./recommendations";
import { makeOpportunity, makeProfile } from "@/test/fixtures";

describe("getRecommendedOpportunities", () => {
  it("ranks opportunities with more matching reasons higher", () => {
    const profile = makeProfile({
      interested_industries: ["Investment Banking"],
      preferred_regions: ["uk"],
    });
    const weakMatch = makeOpportunity({ industry: "Investment Banking", region: "eu" });
    const strongMatch = makeOpportunity({ industry: "Investment Banking", region: "uk" });

    const result = getRecommendedOpportunities([weakMatch, strongMatch], profile, 2);

    expect(result[0].opportunity.id).toBe(strongMatch.id);
    expect(result[0].reasons.length).toBeGreaterThan(result[1].reasons.length);
  });

  it("excludes closed opportunities", () => {
    const profile = makeProfile({ interested_industries: ["Investment Banking"] });
    const closed = makeOpportunity({ industry: "Investment Banking", status: "closed" });

    const result = getRecommendedOpportunities([closed], profile, 3);

    expect(result.find((r) => r.opportunity.id === closed.id)).toBeUndefined();
  });

  it("falls back to newest opportunities when nothing matches the profile", () => {
    const profile = makeProfile({ interested_industries: ["Law"] });
    const older = makeOpportunity({
      industry: "Technology",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    });
    const newer = makeOpportunity({ industry: "Technology", created_at: new Date().toISOString() });

    const result = getRecommendedOpportunities([older, newer], profile, 1);

    expect(result[0].opportunity.id).toBe(newer.id);
    expect(result[0].reasons).toEqual([]);
  });

  it("returns no-reason results when there is no profile", () => {
    const result = getRecommendedOpportunities([makeOpportunity()], null, 1);

    expect(result[0].reasons).toEqual([]);
  });
});

describe("summarizeRecommendations", () => {
  // Regression test for the bug where the dashboard's match count was
  // capped at the top-3 slice fetched for the recommended list, so it
  // could never report more than 3 matches even with far more real ones.
  it("counts every matching opportunity, not just a fixed-size slice", () => {
    const profile = makeProfile({ interested_industries: ["Investment Banking"] });
    const opportunities = Array.from({ length: 12 }, () =>
      makeOpportunity({ industry: "Investment Banking" }),
    );

    const summary = summarizeRecommendations(opportunities, profile);

    expect(summary.totalMatches).toBe(12);
  });

  it("counts closing-this-week and sponsorship matches within the matched set only", () => {
    const profile = makeProfile({ interested_industries: ["Investment Banking"] });
    const soon = new Date(Date.now() + 3 * 86400000).toISOString();
    const opportunities = [
      makeOpportunity({ industry: "Investment Banking", deadline: soon, visa_sponsorship: "yes" }),
      makeOpportunity({ industry: "Investment Banking", deadline: null, visa_sponsorship: "no" }),
      // Doesn't match the profile at all - shouldn't count toward anything.
      makeOpportunity({ industry: "Law", deadline: soon, visa_sponsorship: "yes" }),
    ];

    const summary = summarizeRecommendations(opportunities, profile);

    expect(summary.totalMatches).toBe(2);
    expect(summary.closingThisWeek).toBe(1);
    expect(summary.sponsorshipMatches).toBe(1);
  });

  it("counts strongly-relevant matches as those matching 2+ criteria", () => {
    const profile = makeProfile({
      interested_industries: ["Investment Banking"],
      preferred_regions: ["uk"],
    });
    const opportunities = [
      makeOpportunity({ industry: "Investment Banking", region: "uk" }), // 2 reasons
      makeOpportunity({ industry: "Investment Banking", region: "eu" }), // 1 reason
    ];

    const summary = summarizeRecommendations(opportunities, profile);

    expect(summary.totalMatches).toBe(2);
    expect(summary.stronglyRelevant).toBe(1);
  });
});

describe("isClosingWithinDays / countClosingWithinDays", () => {
  it("treats a closed opportunity as never closing soon", () => {
    const opportunity = makeOpportunity({
      status: "closed",
      deadline: new Date(Date.now() + 86400000).toISOString(),
    });

    expect(isClosingWithinDays(opportunity, 7)).toBe(false);
  });

  it("counts opportunities across the whole list, unaffected by any slicing elsewhere", () => {
    const soon = new Date(Date.now() + 2 * 86400000).toISOString();
    const opportunities = Array.from({ length: 5 }, () => makeOpportunity({ deadline: soon }));

    expect(countClosingWithinDays(opportunities, 7)).toBe(5);
  });
});
