import type { SupabaseClient } from "@supabase/supabase-js";
import type { HublrEvent } from "@/types/event";
import { compareByDate } from "@/lib/sort-by-date";

export async function getPublishedEvents(
  supabase: SupabaseClient,
): Promise<HublrEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true);

  if (error) throw error;

  const sorted = [...(data as HublrEvent[])].sort((a, b) =>
    (a.company ?? a.title).localeCompare(b.company ?? b.title),
  );
  sorted.sort((a, b) => compareByDate(a.event_date, b.event_date));
  return sorted;
}

export async function getUpcomingEvents(
  supabase: SupabaseClient,
  limit: number,
): Promise<HublrEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data as HublrEvent[];
}

export async function getUpcomingEventsCount(
  supabase: SupabaseClient,
): Promise<number> {
  const { count, error } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true)
    .gte("event_date", new Date().toISOString());

  if (error) throw error;
  return count ?? 0;
}

export async function getPublishedEventById(
  supabase: SupabaseClient,
  id: string,
): Promise<HublrEvent | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data as HublrEvent | null;
}

export async function getAllEvents(
  supabase: SupabaseClient,
): Promise<HublrEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as HublrEvent[];
}
