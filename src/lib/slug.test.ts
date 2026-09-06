import { describe, it, expect } from "vitest";
import {
  slugify,
  buildOpportunitySlug,
  opportunityIdFromSlug,
  buildEventSlug,
  eventIdFromSlug,
} from "./slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("UBS Global Markets")).toBe("ubs-global-markets");
  });

  it("collapses non-alphanumeric runs into a single hyphen", () => {
    expect(slugify("A&O Shearman -- Winter Scheme!")).toBe("a-o-shearman-winter-scheme");
  });

  it("trims leading/trailing hyphens", () => {
    expect(slugify("--Acme--")).toBe("acme");
  });
});

describe("opportunity slugs", () => {
  it("round-trips the id through build and extract", () => {
    const opportunity = { id: "abc-123", company: "Acme Corp", role_title: "Summer Analyst" };
    const slug = buildOpportunitySlug(opportunity);

    expect(slug).toBe("acme-corp-summer-analyst--abc-123");
    expect(opportunityIdFromSlug(slug)).toBe("abc-123");
  });
});

describe("event slugs", () => {
  it("handles a null company", () => {
    const event = { id: "xyz-9", company: null, title: "Careers Fair" };
    const slug = buildEventSlug(event);

    expect(slug).toBe("careers-fair--xyz-9");
    expect(eventIdFromSlug(slug)).toBe("xyz-9");
  });
});
