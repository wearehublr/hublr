import { createAdminClient } from "@/lib/supabase/admin";
import { getExcludedUserIds } from "@/lib/metrics";
import { getAllAccounts } from "@/lib/accounts";
import AdminSubNav from "../AdminSubNav";

export const dynamic = "force-dynamic";

export default async function AdminAccountsPage() {
  const adminSupabase = createAdminClient();
  const excludedUserIds = await getExcludedUserIds(adminSupabase);
  const accounts = await getAllAccounts(adminSupabase, excludedUserIds);
  const genuineCount = accounts.filter((a) => !a.isExcluded).length;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
        Admin: Accounts
      </h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
        {accounts.length} total &middot; {genuineCount} not flagged as team/test
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-neutral-200 dark:border-neutral-800">
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">University</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Created</th>
              <th className="py-2 pr-4">Last logged in</th>
              <th className="py-2 pr-4">Flagged</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr
                key={a.id}
                className={`border-b border-neutral-100 dark:border-neutral-900 last:border-0 ${
                  a.isExcluded ? "opacity-50" : ""
                }`}
              >
                <td className="py-2 pr-4 font-mono text-xs">{a.email ?? "-"}</td>
                <td className="py-2 pr-4">{a.preferredName ?? "-"}</td>
                <td className="py-2 pr-4">{a.university ?? "-"}</td>
                <td className="py-2 pr-4">{a.studentStatus ?? "-"}</td>
                <td className="py-2 pr-4">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 pr-4">
                  {a.lastSignInAt
                    ? new Date(a.lastSignInAt).toLocaleDateString()
                    : "Never"}
                </td>
                <td className="py-2 pr-4">{a.isExcluded ? "Team/test" : ""}</td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 text-neutral-500 dark:text-neutral-400">
                  No accounts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
