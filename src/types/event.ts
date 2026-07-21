export const EVENT_TYPES = [
  "networking",
  "workshop",
  "panel",
  "career_fair",
  "other",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  networking: "Networking",
  workshop: "Workshop",
  panel: "Panel",
  career_fair: "Career Fair",
  other: "Other",
};

export const LOCATION_TYPES = ["virtual", "in_person"] as const;

export type LocationType = (typeof LOCATION_TYPES)[number];

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  virtual: "Virtual",
  in_person: "In Person",
};

export interface HublrEvent {
  id: string;
  title: string;
  company: string | null;
  logo_url: string | null;
  description: string | null;
  full_description: string | null;
  event_type: EventType;
  event_date: string;
  deadline: string | null;
  location_type: LocationType;
  location: string | null;
  registration_url: string | null;
  source_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
