import { describe, expect, it } from "vitest";
import { canonicalUrl, looksEarlyCareer } from "./discover-new-opportunities";

describe("canonicalUrl", () => {
  it("treats every Workday link shape for one posting as the same", () => {
    const a = "https://mufgub.wd3.myworkdayjobs.com/job/London/XMLNAME-2027-Summer-Analyst_10079834-WD";
    const b = "https://mufgub.wd3.myworkdayjobs.com/en-US/MUFG-Careers/job/London/XMLNAME-2027-Summer-Analyst_10079834-WD";
    const c = "https://MUFGUB.wd3.myworkdayjobs.com/MUFG-Careers/job/London/XMLNAME-2027-Summer-Analyst_10079834-WD/";
    expect(canonicalUrl(a)).toBe(canonicalUrl(b));
    expect(canonicalUrl(b)).toBe(canonicalUrl(c));
  });

  it("keeps different postings apart", () => {
    expect(
      canonicalUrl("https://x.wd3.myworkdayjobs.com/en-US/S/job/London/A_1"),
    ).not.toBe(canonicalUrl("https://x.wd3.myworkdayjobs.com/en-US/S/job/London/A_2"));
  });

  it("keeps the query string for other hosts, where it can identify the job", () => {
    expect(canonicalUrl("https://jobs.example.com/apply?id=1")).not.toBe(
      canonicalUrl("https://jobs.example.com/apply?id=2"),
    );
    expect(canonicalUrl("https://jobs.example.com/apply/")).toBe(
      canonicalUrl("https://jobs.example.com/apply#top"),
    );
  });
});

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
