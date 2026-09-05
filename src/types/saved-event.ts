import type { HublrEvent } from "@/types/event";

export const SAVED_EVENT_STATUSES = ["interested", "registered"] as const;

export type SavedEventStatus = (typeof SAVED_EVENT_STATUSES)[number];

export const SAVED_EVENT_STATUS_LABELS: Record<SavedEventStatus, string> = {
  interested: "Interested",
  registered: "Registered ✓",
};

export interface SavedEvent {
  id: string;
  user_id: string;
  event_id: string;
  status: SavedEventStatus;
  created_at: string;
  updated_at: string;
}

export interface SavedEventWithDetails extends SavedEvent {
  events: HublrEvent;
}
