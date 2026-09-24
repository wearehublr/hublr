import type { SupabaseClient } from "@supabase/supabase-js";

export type AccountRow = {
  id: string;
  email: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  preferredName: string | null;
  university: string | null;
  studentStatus: string | null;
  isExcluded: boolean;
};

export async function getAllAccounts(
  adminSupabase: SupabaseClient,
  excludedUserIds: Set<string>,
): Promise<AccountRow[]> {
  const users: {
    id: string;
    email: string | null;
    createdAt: string;
    lastSignInAt: string | null;
  }[] = [];
  let page = 1;
  const perPage = 1000;
  while (true) {
    const { data, error } = await adminSupabase.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error || !data) break;
    for (const u of data.users) {
      users.push({
        id: u.id,
        email: u.email ?? null,
        createdAt: u.created_at,
        lastSignInAt: u.last_sign_in_at ?? null,
      });
    }
    if (data.users.length < perPage) break;
    page += 1;
  }

  const { data: profilesRaw } = await adminSupabase
    .from("profiles")
    .select("id, preferred_name, university, student_status");

  const profileMap = new Map(
    (profilesRaw ?? []).map((p) => [p.id as string, p]),
  );

  return users
    .map((u) => {
      const profile = profileMap.get(u.id);
      return {
        id: u.id,
        email: u.email,
        createdAt: u.createdAt,
        lastSignInAt: u.lastSignInAt,
        preferredName: profile?.preferred_name ?? null,
        university: profile?.university ?? null,
        studentStatus: profile?.student_status ?? null,
        isExcluded: excludedUserIds.has(u.id),
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
