import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMetricsSummary, getStudentStats } from "@/lib/metrics";
import AdminSubNav from "../AdminSubNav";

export const dynamic = "force-dynamic";

export default async function AdminMetricsPage() {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();
  const [metrics, studentStats] = await Promise.all([
    getMetricsSummary(supabase),
    getStudentStats(adminSupabase),
  ]);

  const statusKnownCount = studentStats.homeCount + studentStats.internationalCount;
  const homePercent = statusKnownCount
    ? Math.round((studentStats.homeCount / statusKnownCount) * 100)
    : null;
  const internationalPercent = statusKnownCount
    ? Math.round((studentStats.internationalCount / statusKnownCount) * 100)
    : null;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Admin: Metrics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">{metrics.totalClicks}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Apply link clicks
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">{metrics.totalTracked}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Opportunities tracked
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <p className="text-2xl font-bold">{metrics.totalApplied}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Confirmed applications
          </p>
        </div>
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
