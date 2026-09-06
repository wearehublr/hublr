import { describe, it, expect } from "vitest";
import { getSponsorshipDisplay } from "./visa-sponsorship";

describe("getSponsorshipDisplay", () => {
  it("prefers an explicit role-level 'yes'", () => {
    expect(
      getSponsorshipDisplay({ visa_sponsorship: "yes", company_sponsor_licence: false }),
    ).toBe("yes");
  });

  it("prefers an explicit role-level 'no' even if the company holds a licence", () => {
    expect(
      getSponsorshipDisplay({ visa_sponsorship: "no", company_sponsor_licence: true }),
    ).toBe("no");
  });

  it("falls back to 'no' when the role is silent and the company has no licence", () => {
    expect(
      getSponsorshipDisplay({ visa_sponsorship: "unknown", company_sponsor_licence: false }),
    ).toBe("no");
  });

  it("is 'unconfirmed' when the role is silent and the company's licence status is unknown", () => {
    expect(
      getSponsorshipDisplay({ visa_sponsorship: "unknown", company_sponsor_licence: null }),
    ).toBe("unconfirmed");
  });

  it("is 'unconfirmed' when the role is silent even if the company holds a licence", () => {
    expect(
      getSponsorshipDisplay({ visa_sponsorship: "unknown", company_sponsor_licence: true }),
    ).toBe("unconfirmed");
  });
});
