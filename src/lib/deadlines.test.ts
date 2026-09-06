import { describe, it, expect } from "vitest";
import { countSavedAndInProgress, filterUpcomingDeadlines } from "./deadlines";
import { makeApplication } from "@/test/fixtures";

describe("countSavedAndInProgress", () => {
  it("counts saved and active-stage applications separately, excluding rejected/withdrawn", () => {
    const applications = [
      makeApplication({ stage: "saved" }),
      makeApplication({ stage: "saved" }),
      makeApplication({ stage: "applied" }),
      makeApplication({ stage: "interview" }),
      makeApplication({ stage: "offer" }),
      makeApplication({ stage: "rejected" }),
      makeApplication({ stage: "withdrawn" }),
    ];

    expect(countSavedAndInProgress(applications)).toEqual({ saved: 2, inProgress: 3 });
  });

  it("returns zeros for an empty list", () => {
    expect(countSavedAndInProgress([])).toEqual({ saved: 0, inProgress: 0 });
  });
});

describe("filterUpcomingDeadlines", () => {
  const inDays = (days: number) => new Date(Date.now() + days * 86400000).toISOString();

  it("only includes active-stage applications with a deadline inside the window", () => {
    const applications = [
      makeApplication({ stage: "applied", deadline: inDays(3) }),
      makeApplication({ stage: "applied", deadline: inDays(20) }),
      makeApplication({ stage: "applied", deadline: null }),
      makeApplication({ stage: "rejected", deadline: inDays(3) }),
      makeApplication({ stage: "applied", deadline: inDays(-1) }),
    ];

    const result = filterUpcomingDeadlines(applications, 14);

    expect(result).toHaveLength(1);
    expect(result[0].deadline).toBe(applications[0].deadline);
  });

  it("sorts soonest deadline first", () => {
    const applications = [
      makeApplication({ stage: "applied", deadline: inDays(10) }),
      makeApplication({ stage: "applied", deadline: inDays(2) }),
    ];

    const result = filterUpcomingDeadlines(applications, 14);

    expect(result.map((a) => a.deadline)).toEqual([applications[1].deadline, applications[0].deadline]);
  });
});
