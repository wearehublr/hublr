import type { Opportunity } from "@/types/opportunity";
import type { Application } from "@/types/application";
import type { HublrEvent } from "@/types/event";
import type { Profile } from "@/types/profile";

let counter = 0;
function nextId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

export function makeOpportunity(overrides: Partial<Opportunity> = {}): Opportunity {
  return {
    id: nextId("opp"),
    company: "Acme Corp",
    role_title: "Summer Analyst",
    category: "summer_internship",
    region: "uk",
    logo_url: null,
    country: "United Kingdom",
    city: "London",
    industry: null,
    cycle_year: 2027,
    status: "open",
    open_date: null,
    deadline: null,
    start_date: null,
    posted_date: null,
    apply_url: "https://example.com/apply",
    notes: null,
    full_description: null,
    visa_sponsorship: "unknown",
    company_sponsor_licence: null,
    source_url: null,
    discovered_via: "manual",
    is_published: true,
    link_checked_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

export function makeApplication(overrides: Partial<Application> = {}): Application {
  return {
    id: nextId("app"),
    user_id: "user-1",
    opportunity_id: null,
    company: "Acme Corp",
    role_title: "Summer Analyst",
    apply_url: null,
    cycle_year: 2027,
    stage: "saved",
    applied_date: null,
    deadline: null,
    notes: null,
    cv_document_id: null,
    cover_letter_document_id: null,
    reminder_sent_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

export function makeEvent(overrides: Partial<HublrEvent> = {}): HublrEvent {
  return {
    id: nextId("event"),
    title: "Spring Insight Evening",
    company: "Acme Corp",
    logo_url: null,
    description: null,
    full_description: null,
    event_type: "networking",
    event_date: new Date().toISOString(),
    deadline: null,
    location_type: "virtual",
    location: null,
    registration_url: null,
    source_url: null,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

export function makeProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "user-1",
    preferred_name: "Alex",
    university: null,
    degree: null,
    study_year: null,
    goal: null,
    summary: null,
    student_status: null,
    interested_industries: [],
    email_notifications_enabled: true,
    citizenship: null,
    visa_status: null,
    visa_expiry: null,
    graduation_year: null,
    preferred_categories: [],
    preferred_regions: [],
    requires_sponsorship: null,
    onboarding_completed_at: new Date().toISOString(),
    last_match_digest_sent_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}
