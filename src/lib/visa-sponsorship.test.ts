import { describe, it, expect } from "vitest";
import { getSponsorshipDisplay } from "./visa-sponsorship";

describe("getSponsorshipDisplay", () => {
  it("prefers an explicit role-level 'yes'", () => {
    expect(
      getSponsorshipDisplay({
        region: "uk",
        visa_sponsorship: "yes",
        company_sponsor_licence: false,
      }),
    ).toBe("yes");
  });

  it("prefers an explicit role-level 'no' even if the company holds a licence", () => {
    expect(
      getSponsorshipDisplay({
        region: "uk",
        visa_sponsorship: "no",
        company_sponsor_licence: true,
      }),
    ).toBe("no");
  });

  it("falls back to 'no' when the role is silent and the company has no licence", () => {
    expect(
      getSponsorshipDisplay({
        region: "uk",
        visa_sponsorship: "unknown",
        company_sponsor_licence: false,
      }),
    ).toBe("no");
  });

  it("is 'unconfirmed' when the role is silent and the company's licence status is unknown", () => {
    expect(
      getSponsorshipDisplay({
        region: "uk",
        visa_sponsorship: "unknown",
        company_sponsor_licence: null,
      }),
    ).toBe("unconfirmed");
  });

  it("is 'unconfirmed' when the role is silent even if the company holds a licence", () => {
    expect(
      getSponsorshipDisplay({
        region: "uk",
        visa_sponsorship: "unknown",
        company_sponsor_licence: true,
      }),
    ).toBe("unconfirmed");
  });

  it("is 'not_tracked' for non-UK roles regardless of visa_sponsorship or licence", () => {
    expect(
      getSponsorshipDisplay({
        region: "us",
        visa_sponsorship: "yes",
        company_sponsor_licence: true,
      }),
    ).toBe("not_tracked");
    expect(
      getSponsorshipDisplay({
        region: "eu",
        visa_sponsorship: "unknown",
        company_sponsor_licence: null,
      }),
    ).toBe("not_tracked");
  });
});
