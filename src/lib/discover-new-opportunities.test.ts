import { describe, expect, it } from "vitest";
import { looksEarlyCareer } from "./discover-new-opportunities";

describe("looksEarlyCareer", () => {
  it("matches early-career titles", () => {
    for (const title of [
      "2027 MUFG UK Summer Analyst Programme: Global Client Sales",
      "Internship, Credit Analysis Department 1",
      "Global Corporate Banking Intern",
      "Summer Internship Programme 2027 - Global Markets",
      "2027 MUFG UK Apprenticeship Programme: Treasury Services",
      "Apprentice Global Operations",
      "Graduate Programme 2027",
      "2027 Insight Event - Discover MUFG",
      "Industrial Placement Programme",
      "Off-Cycle Internship",
      "Entry Level Analyst",
    ]) {
      expect(looksEarlyCareer(title), title).toBe(true);
    }
  });

  it("does not match senior roles that merely contain 'intern' or 'graduate'", () => {
    for (const title of [
      "VP - Internal Audit IT Issue Management",
      "AVP - Internal Audit - Risk & Legal",
      "Internal Communications and PA to CFO and COO",
      "Head of International Markets",
      "Postgraduate Research Lead",
      "Analyst, Expense Management and Internal Reporting Function",
    ]) {
      expect(looksEarlyCareer(title), title).toBe(false);
    }
  });
});
