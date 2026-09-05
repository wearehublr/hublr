"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveEvent(eventId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("saved_events").insert({
    user_id: user.id,
    event_id: eventId,
    status: "interested",
  });

  // 23505 = unique_violation, already saved, nothing to do.
  if (error && error.code !== "23505") {
    throw new Error(error.message);
  }

  revalidatePath("/events");
  revalidatePath("/");
}

export async function markEventRegistered(eventId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from("saved_events")
    .upsert(
      { user_id: user.id, event_id: eventId, status: "registered" },
      { onConflict: "user_id,event_id" },
    );

  if (error) throw new Error(error.message);

  revalidatePath("/events");
  revalidatePath("/");
}
