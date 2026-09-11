import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMetricsSummary, getStudentStats, getExcludedUserIds } from "@/lib/metrics";
import AdminSubNav from "../AdminSubNav";

export const dynamic = "force-dynamic";

export default async function AdminMetricsPage() {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();
  const excludedUserIds = await getExcludedUserIds(adminSupabase);
  const [metrics, studentStats] = await Promise.all([
    getMetricsSummary(supabase, adminSupabase, excludedUserIds),
    getStudentStats(adminSupabase, excludedUserIds),
  ]);

  const statusKnownCount = studentStats.homeCount + studentStats.internationalCount;
  const homePercent = statusKnownCount
    ? Math.round((studentStats.homeCount / statusKnownCount) * 100)
    : null;
  const internationalPercent = statusKnownCount
    ? Math.round((studentStats.internationalCount / statusKnownCount) * 100)
    : null;

  const pctOfUsers = (n: number) =>
    studentStats.totalUsers > 0 ? Math.round((n / studentStats.totalUsers) * 100) : null;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
        Admin: Metrics
      </h1>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-8">
        Excludes the admin account{excludedUserIds.size === 0 && " (ADMIN_EMAIL not set — no exclusion applied)"}.
        Other manual test accounts aren&apos;t flagged and are still counted.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">{metrics.uniqueClickUsers}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Students who clicked apply
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            {metrics.totalClicks} raw clicks
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">{metrics.uniqueTrackedUsers}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Students tracking ≥ 1 opportunity
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            {metrics.totalTracked} opportunities tracked
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">{metrics.uniqueAppliedUsers}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Students who applied
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            {metrics.totalApplied} marked &quot;applied&quot; · {metrics.totalRejected} rejected · {metrics.totalWithdrawn} withdrawn
          </p>
        </div>
      </div>

      <h2 className="text-sm font-semibold mb-3">Funnel (unique students, % of registered)</h2>
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 mb-8 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-neutral-200 dark:border-neutral-800">
              <th className="py-2 px-4">Stage</th>
              <th className="py-2 px-4">Students</th>
              <th className="py-2 px-4">% of registered</th>
            </tr>
          </thead>
          <tbody>
            {metrics.funnel.map((f) => {
              const pct = pctOfUsers(f.uniqueUsers);
              return (
                <tr key={f.stage} className="border-b border-neutral-100 dark:border-neutral-900 last:border-0">
                  <td className="py-2 px-4">{f.label}</td>
                  <td className="py-2 px-4 font-medium">{f.uniqueUsers}</td>
                  <td className="py-2 px-4 text-neutral-500 dark:text-neutral-400">
                    {pct !== null ? `${pct}%` : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="text-sm font-semibold mb-3">Student base</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">{studentStats.totalUsers}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Registered students
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">
            {homePercent !== null ? `${homePercent}%` : "-"}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Home (UK) students{" "}
            {statusKnownCount > 0 && `(of ${statusKnownCount} who set status)`}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">
            {internationalPercent !== null ? `${internationalPercent}%` : "-"}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            International students{" "}
            {statusKnownCount > 0 && `(of ${statusKnownCount} who set status)`}
          </p>
        </div>
      </div>

      <h2 className="text-sm font-semibold mb-3">Funnel by segment (unique students)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xs font-semibold mb-2 text-neutral-500 dark:text-neutral-400">
            Home vs. international
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-neutral-200 dark:border-neutral-800">
                  <th className="py-2 pr-4">Segment</th>
                  <th className="py-2 pr-4">Clicked</th>
                  <th className="py-2 pr-4">Tracked</th>
                  <th className="py-2 pr-4">Applied</th>
                </tr>
              </thead>
              <tbody>
                {metrics.byStudentStatus.map((s) => (
                  <tr key={s.segment} className="border-b border-neutral-100 dark:border-neutral-900 last:border-0">
                    <td className="py-2 pr-4">{s.segment}</td>
                    <td className="py-2 pr-4">{s.clickedUsers}</td>
                    <td className="py-2 pr-4">{s.trackedUsers}</td>
                    <td className="py-2 pr-4">{s.appliedUsers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold mb-2 text-neutral-500 dark:text-neutral-400">
            Visa sponsorship need
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-neutral-200 dark:border-neutral-800">
                  <th className="py-2 pr-4">Segment</th>
                  <th className="py-2 pr-4">Clicked</th>
                  <th className="py-2 pr-4">Tracked</th>
                  <th className="py-2 pr-4">Applied</th>
                </tr>
              </thead>
              <tbody>
                {metrics.bySponsorshipNeed.map((s) => (
                  <tr key={s.segment} className="border-b border-neutral-100 dark:border-neutral-900 last:border-0">
                    <td className="py-2 pr-4">{s.segment}</td>
                    <td className="py-2 pr-4">{s.clickedUsers}</td>
                    <td className="py-2 pr-4">{s.trackedUsers}</td>
                    <td className="py-2 pr-4">{s.appliedUsers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold mb-3">Top interested industries</h3>
          {studentStats.topIndustries.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No profile data yet.
            </p>
          ) : (
            <ul className="text-sm flex flex-col gap-1">
              {studentStats.topIndustries.map((i) => (
                <li key={i.industry} className="flex justify-between">
                  <span>{i.industry}</span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {i.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Top universities</h3>
          {studentStats.topUniversities.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No profile data yet.
            </p>
          ) : (
            <ul className="text-sm flex flex-col gap-1">
              {studentStats.topUniversities.map((u) => (
                <li key={u.university} className="flex justify-between">
                  <span>{u.university}</span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {u.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <h2 className="text-sm font-semibold mb-3">By opportunity</h2>
      {metrics.byOpportunity.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No clicks or applications recorded yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-2 pr-4">Company</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Clicks</th>
                <th className="py-2 pr-4">Confirmed applied</th>
              </tr>
            </thead>
            <tbody>
              {metrics.byOpportunity.map((m) => (
                <tr
                  key={m.opportunity_id}
                  className="border-b border-neutral-100 dark:border-neutral-900"
                >
                  <td className="py-2 pr-4 font-medium">{m.company}</td>
                  <td className="py-2 pr-4 text-neutral-600 dark:text-neutral-300">
                    {m.role_title}
                  </td>
                  <td className="py-2 pr-4">{m.clicks}</td>
                  <td className="py-2 pr-4">{m.applied}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
