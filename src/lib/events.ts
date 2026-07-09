import type { SupabaseClient } from "@supabase/supabase-js";
import type { HublrEvent } from "@/types/event";

export async function getPublishedEvents(
  supabase: SupabaseClient,
): Promise<HublrEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("event_date", { ascending: true });

  if (error) throw error;
  return data as HublrEvent[];
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
