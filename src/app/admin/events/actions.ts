"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import {
  EVENT_TYPES,
  LOCATION_TYPES,
  type EventType,
  type LocationType,
} from "@/types/event";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string" || v.trim() === "") return null;
  return v.trim();
}

export type FormState = { error: string | null };

export async function addEvent(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireAdmin();

  const title = str(formData, "title");
  const event_type = str(formData, "event_type") as EventType | null;
  const location_type = str(formData, "location_type") as LocationType | null;
  const event_date = str(formData, "event_date");

  if (!title || !event_type || !location_type || !event_date) {
    return {
      error: "Title, event type, location type, and date are required.",
    };
  }
  if (!EVENT_TYPES.includes(event_type)) return { error: "Invalid event type." };
  if (!LOCATION_TYPES.includes(location_type))
    return { error: "Invalid location type." };

  const { error } = await supabase.from("events").insert({
    title,
    company: str(formData, "company"),
    logo_url: str(formData, "logo_url"),
    event_type,
    location_type,
    event_date: new Date(event_date).toISOString(),
    deadline: str(formData, "deadline"),
    location: str(formData, "location"),
    description: str(formData, "description"),
    full_description: str(formData, "full_description"),
    registration_url: str(formData, "registration_url"),
    source_url: str(formData, "source_url"),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { error: null };
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const event_type = str(formData, "event_type") as EventType | null;
  const location_type = str(formData, "location_type") as LocationType | null;
  const event_date = str(formData, "event_date");

  if (event_type && !EVENT_TYPES.includes(event_type))
    throw new Error("Invalid event type");
  if (location_type && !LOCATION_TYPES.includes(location_type))
    throw new Error("Invalid location type");

  const { error } = await supabase
    .from("events")
    .update({
      title: str(formData, "title"),
      company: str(formData, "company"),
      logo_url: str(formData, "logo_url"),
      event_type,
      location_type,
      event_date: event_date ? new Date(event_date).toISOString() : undefined,
      deadline: str(formData, "deadline"),
      location: str(formData, "location"),
      description: str(formData, "description"),
      full_description: str(formData, "full_description"),
      registration_url: str(formData, "registration_url"),
      source_url: str(formData, "source_url"),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function toggleEventPublish(id: string, isPublished: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("events")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function deleteEvent(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/events");
  revalidatePath("/events");
}
