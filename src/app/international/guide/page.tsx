import Link from "next/link";

export const metadata = {
  title: "International Students: The Full Guide | Hublr",
};

function VisaCard({
  name,
  tagline,
  points,
}: {
  name: string;
  tagline: string;
  points: string[];
}) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-3 bg-white dark:bg-neutral-900">
      <div>
        <p className="font-semibold leading-tight">{name}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-tight mt-0.5">
          {tagline}
        </p>
      </div>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-200">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function RouteCard({
  name,
  when,
  description,
}: {
  name: string;
  when: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <p className="font-semibold leading-tight">{name}</p>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
          {when}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-neutral-700 dark:text-neutral-200">
        {description}
      </p>
    </div>
  );
}

export default function InternationalGuidePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm">
        <Link href="/international" className="underline">
          ← Back to International Students
        </Link>
      </p>

      <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
        International Students: The Full Guide
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Last updated: 19 July 2026
      </p>

      <p className="mt-6 text-neutral-700 dark:text-neutral-200">
        UK visa rules, salary thresholds, and fees change fairly often. The
        figures below are accurate as of the date above, based on official
        UK government guidance. Treat this as a practical map of how the
        pieces fit together, not legal advice — for anything that affects
        your own status, confirm the current position with your
        university&apos;s international student advisers before you act on
        it.
      </p>

      {/* Section 1: Visa basics */}
      <h2 className="mt-12 text-lg font-semibold">
        The three visas you&apos;ll actually deal with
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Most international students move through these in order: Student
        visa while you study, Graduate visa once you finish, then (if you
        find a sponsoring employer) a Skilled Worker visa.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VisaCard
          name="Student visa"
          tagline="What you're on right now"
          points={[
            "Lets you work up to 20 hours a week in term time (10 hours for below-degree courses), and full-time in official vacations.",
            "The 20-hour limit is a hard weekly cap, not an average — you can't bank hours from a quiet week.",
            "Term-time is defined by your university's calendar, not your personal timetable (finishing exams early doesn't count as a vacation).",
            "£558 to apply, extend, or switch to this visa from inside the UK, plus the healthcare surcharge.",
          ]}
        />
        <VisaCard
          name="Graduate visa"
          tagline="The bridge after you finish"
          points={[
            "No employer or sponsor needed — you can work in almost any job, full-time, for anyone.",
            "Lasts 2 years if you apply on or before 31 December 2026 (18 months if you apply from 1 January 2027); 3 years for a PhD.",
            "£937 application fee, plus the healthcare surcharge (£2,070 for 2 years / £3,105 for 3 years / £1,152.50 for 18 months).",
            "Cannot be extended. You must switch to another visa (usually Skilled Worker) before it runs out — there's no grace period.",
          ]}
        />
        <VisaCard
          name="Skilled Worker visa"
          tagline="The one that needs sponsorship"
          points={[
            "Your employer must hold a Home Office sponsor licence and issue you a Certificate of Sponsorship.",
            "Minimum salary is £41,700/year, or the specific ‘going rate’ for your job code, whichever is higher.",
            "Under 26, a recent graduate, or still on a Student/Graduate visa? You may qualify to be paid as little as £33,400/year (70% of the going rate) — ask recruiters directly, many don't volunteer this.",
            "That discounted rate is capped at 4 years total UK stay, counting any time already spent on a Graduate visa.",
          ]}
        />
      </div>

      {/* Section 2: Right to work */}
      <h2 className="mt-12 text-lg font-semibold">
        Right to work, explained (so you can explain it to employers too)
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Every UK employer has to run a right to work check on every hire.
        If you have a digital immigration status (Student visa, Graduate
        visa, Skilled Worker visa), you generate a share code through your
        UKVI account and give it to the employer, who checks it against
        the live Home Office record. The code is valid for 90 days, and
        you can generate a new one as often as you need.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        The mistake worth avoiding: <strong>a passed right to work check
        is not the same thing as sponsorship.</strong> A company can happily
        confirm you&apos;re allowed to work today, on your current Graduate
        visa, while having no ability to keep you on once that visa expires
        if they don&apos;t hold a sponsor licence. When an application form
        asks &quot;do you require visa sponsorship, now or in the
        future?&quot;, answer precisely — if your Graduate visa still has
        18 months left, you don&apos;t need sponsorship <em>now</em>, but
        say clearly that you will eventually. Vague or evasive answers here
        tend to cost people interviews later, not save them.
      </p>

      {/* Section 3: Which companies sponsor */}
      <h2 className="mt-12 text-lg font-semibold">
        Which companies actually sponsor
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We tag opportunities on Hublr where sponsorship is known, and you
        can browse those directly on the{" "}
        <Link href="/international" className="underline">
          International Students
        </Link>{" "}
        page. For anything not tagged, the Home Office keeps a public
        register of every employer currently approved to sponsor Skilled
        Worker visas — check the{" "}
        <Link href="/international" className="underline">
          Resources &amp; guidance
        </Link>{" "}
        section below the sponsor list for the link.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        As a general pattern (never a guarantee): large employers with big
        graduate schemes — Big 4 accountancy firms, bulge-bracket banks,
        large consultancies, and big tech — are more likely to hold a
        sponsor licence than small firms and startups, because holding one
        carries ongoing compliance costs that only make sense at scale.
        Sponsorship can also vary by programme within the same company —
        a firm might sponsor its graduate scheme but not a single insight
        day. Always check the register or ask HR directly before investing
        hours in an application, rather than assuming from company size or
        reputation alone.
      </p>

      {/* Section 4: Route types */}
      <h2 className="mt-12 text-lg font-semibold">
        Spring week, placement year, internship, full-time: what they
        actually mean
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        UK early-career recruitment uses a specific set of terms that
        don&apos;t always translate directly from other countries&apos;
        systems. Here&apos;s what each one actually involves, and where
        visa status comes into play.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3">
        <RouteCard
          name="Spring Week / Insight Programme"
          when="2–5 days, usually Easter"
          description="Aimed at first-year students only (or second year of a four-year degree). No job offer at the end, but strong performers are often fast-tracked straight to Summer Internship interviews, skipping the usual application stage. Usually unpaid or a small stipend, so visa sponsorship isn't relevant here — your existing Student visa work rights cover it."
        />
        <RouteCard
          name="Placement Year / Industrial Placement"
          when="9–12 months, penultimate year of a sandwich degree"
          description="A paid, full academic year placement built into some degree courses. Because you're still enrolled as a student throughout, this normally runs under your Student visa, not a Skilled Worker visa — but confirm the hours and status with your university's immigration team before you start, since a full-time placement changes your usual term-time work pattern."
        />
        <RouteCard
          name="Summer Internship"
          when="6–10 weeks, penultimate-year students"
          description="The main pipeline into graduate schemes at most large employers — strong performance often converts directly into a graduate offer without a second full application. This is where it's worth asking about sponsorship early, since the same employer relationship usually carries through to the full-time role."
        />
        <RouteCard
          name="Off-cycle Internship"
          when="Similar length, different start month (often January)"
          description="Common at banks and asset managers to backfill smaller, specific team needs outside the main summer cohort. Smaller intake, sometimes less publicised, so it's worth checking employer websites directly rather than relying only on aggregator listings."
        />
        <RouteCard
          name="Full-time Graduate Programme"
          when="The actual job"
          description="This is where the Skilled Worker visa question becomes real and immediate. Get a clear, specific answer on sponsorship before you accept an offer, not after — 'we sponsor for the right candidates' is not a clear answer, ask what that means for you by name."
        />
      </div>

      {/* Section 5: Timelines */}
      <h2 className="mt-12 text-lg font-semibold">Timelines that matter</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Two clocks run at once, and it&apos;s easy to let one slip while
        you&apos;re focused on the other:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          <strong>Recruitment clock:</strong> Spring weeks open roughly
          January&#8211;March. Summer internship applications open
          September&#8211;December the year before, with many employers
          running rolling deadlines that close early once enough strong
          applications come in. Graduate scheme applications generally run
          September&#8211;January. Applying in the first few weeks a
          cycle opens meaningfully improves your odds versus applying near
          the deadline.
        </li>
        <li>
          <strong>Visa clock:</strong> You can apply for your Graduate
          visa as soon as your university confirms course completion to
          the Home Office — you don&apos;t need to wait for your graduation
          ceremony or certificate. Start conversations about sponsorship
          with employers months before your Graduate visa expires, not in
          the final weeks — switching visas takes time, and a Certificate
          of Sponsorship has to be issued before you can apply.
        </li>
      </ul>

      {/* Section 6: Common mistakes */}
      <h2 className="mt-12 text-lg font-semibold">Common mistakes</h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          Applying broadly before checking sponsorship, then finding out
          weeks later the employer doesn&apos;t hold a sponsor licence.
        </li>
        <li>
          Assuming a passed right to work check means sponsorship is
          sorted — they&apos;re legally different things (see above).
        </li>
        <li>
          Letting the Graduate visa deadline creep up. It can&apos;t be
          extended, and there&apos;s no grace period once it expires.
        </li>
        <li>
          Not mentioning the under-26/recent-graduate salary discount when
          a recruiter says a role &quot;doesn&apos;t meet the salary
          threshold&quot; — some recruiters aren&apos;t aware of it either.
        </li>
        <li>
          Treating &quot;does this role need sponsorship&quot; as assumed
          rather than confirmed. Always get it confirmed explicitly at
          offer stage, in writing.
        </li>
      </ul>

      {/* Section 7: Culture and interviews */}
      <h2 className="mt-12 text-lg font-semibold">
        Interview and workplace culture notes
      </h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          <strong>Competency-based interviews are standard.</strong> Most
          UK graduate recruitment uses the STAR method (Situation, Task,
          Action, Result). Prepare specific stories from your own
          experience, not general statements about your strengths.
        </li>
        <li>
          <strong>Assessment centres are common</strong> for banking,
          consulting, and Big 4 recruitment: group exercises, case studies,
          numerical and verbal reasoning tests, and sometimes a recorded
          video interview before you speak to a person at all.
        </li>
        <li>
          <strong>Understated confidence lands better than overt
          self-promotion.</strong> UK interview culture tends to reward
          letting specific, detailed examples make the case for you,
          rather than broad claims about being &quot;the best&quot; at
          something.
        </li>
        <li>
          <strong>Dress code varies more than you&apos;d expect.</strong>{" "}
          Some tech firms and startups genuinely mean &quot;smart
          casual&quot;; most banks, law firms, and Big 4 firms mean
          business formal even when the invite says otherwise. When
          unsure, dress slightly smarter than what&apos;s stated.
        </li>
      </ul>

      {/* Section 8: Where to go next, on Hublr */}
      <h2 className="mt-12 text-lg font-semibold">Where to go next</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Salary thresholds and fees in particular change more often than
        you&apos;d think, so double-check anything time-sensitive before
        you make a decision that depends on it.
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          Browse companies with known visa sponsorship, plus curated
          guides, on the{" "}
          <Link href="/international" className="underline">
            International Students
          </Link>{" "}
          page.
        </li>
        <li>
          Track everything you apply to, with deadlines, on your{" "}
          <Link href="/dashboard" className="underline">
            Applications dashboard
          </Link>
          .
        </li>
        <li>
          Browse current{" "}
          <Link href="/opportunities" className="underline">
            opportunities
          </Link>{" "}
          and filter by visa sponsorship.
        </li>
      </ul>
    </main>
  );
}
