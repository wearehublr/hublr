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
        Visa rules change fairly often, so the figures below are accurate
        as of the date above. This isn&apos;t legal advice, just a plain
        explanation of how the pieces fit together. If something here
        affects your own status, check with your university&apos;s
        international student advisers before you act on it.
      </p>

      {/* Section 1: Visa basics */}
      <h2 className="mt-12 text-lg font-semibold">
        The three visas you&apos;ll actually deal with
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Most people move through these in order. You&apos;re probably on a
        Student visa now, you&apos;ll likely switch to a Graduate visa once
        you finish, and if you find an employer willing to sponsor you,
        you&apos;ll move onto a Skilled Worker visa after that.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VisaCard
          name="Student visa"
          tagline="What you're on right now"
          points={[
            "You can work up to 20 hours a week in term time (10 for below-degree courses), and full-time during official vacations.",
            "That 20 hours is a hard cap each week, not an average, so you can't work 30 one week to make up for a quiet one.",
            "Term-time follows your university's calendar, not your own. Finishing your exams early doesn't count as a vacation.",
            "Costs £558 to apply, extend, or switch to from inside the UK, on top of the healthcare surcharge.",
          ]}
        />
        <VisaCard
          name="Graduate visa"
          tagline="The bridge after you finish"
          points={[
            "No employer needed. You can work pretty much any job, full-time, for anyone.",
            "Lasts 2 years if you apply on or before 31 December 2026, and 18 months after that. PhD graduates get 3 years.",
            "Costs £937 to apply, plus a healthcare surcharge (£2,070 for 2 years, £3,105 for 3, £1,152.50 for 18 months).",
            "You can't extend it. Once it's close to running out you need to have already switched to something else, usually Skilled Worker.",
          ]}
        />
        <VisaCard
          name="Skilled Worker visa"
          tagline="The one that needs sponsorship"
          points={[
            "Your employer needs a Home Office sponsor licence and has to issue you a Certificate of Sponsorship.",
            "The minimum salary is £41,700 a year, or whatever the 'going rate' is for your specific job code, whichever is higher.",
            "If you're under 26, a recent graduate, or still on a Student or Graduate visa, you might only need to be paid £33,400. A lot of recruiters won't bring this up unprompted, so ask.",
            "That lower rate has a catch: your total time in the UK on it can't go past 4 years, and that includes any time you already spent on a Graduate visa.",
          ]}
        />
      </div>

      {/* Section 2: Right to work */}
      <h2 className="mt-12 text-lg font-semibold">
        Right to work, explained (so you can explain it to employers too)
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Every UK employer has to check that you&apos;re allowed to work
        before they hire you. If your immigration status is digital, which
        covers Student, Graduate, and Skilled Worker visas, you generate a
        share code through your UKVI account and hand it over. The
        employer checks it against the live Home Office record. It&apos;s
        valid for 90 days, and you can generate a new one whenever you
        need to.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Here&apos;s where people trip up: passing a right to work check is
        not the same thing as being sponsored. An employer can confirm
        today, truthfully, that you&apos;re allowed to work, because your
        current Graduate visa is valid. That says nothing about whether
        they can keep employing you once it expires, unless they hold a
        sponsor licence. So when an application form asks whether you
        need sponsorship now or in future, answer both parts. If your
        visa has eighteen months left, say you don&apos;t need it yet,
        but that you will.
        Being vague here tends to cost people interviews later, not save
        them.
      </p>

      {/* Section 3: Which companies sponsor */}
      <h2 className="mt-12 text-lg font-semibold">
        Which companies actually sponsor
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We tag opportunities on Hublr where sponsorship is known. You can
        browse those on the{" "}
        <Link href="/international" className="underline">
          International Students
        </Link>{" "}
        page. For anything we haven&apos;t tagged yet, the Home Office
        keeps a public register of every employer currently licensed to
        sponsor Skilled Worker visas, you&apos;ll find the link in the
        Resources section on that same page.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        As a rough pattern, not a guarantee: bigger employers with large
        graduate schemes, think Big 4 accountancy firms, the bigger banks,
        large consultancies, and big tech, are more likely to hold a
        sponsor licence than a small firm or startup, simply because the
        ongoing compliance cost only really pays off at scale. It can also
        vary within the same company. A firm might sponsor its graduate
        scheme but not a one-off insight day. Worth checking the register
        or just asking HR directly rather than assuming based on how well
        known the company is.
      </p>

      {/* Section 4: Route types */}
      <h2 className="mt-12 text-lg font-semibold">
        Spring week, placement year, internship, full-time: what they
        actually mean
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        UK recruitment has its own vocabulary that doesn&apos;t always map
        onto how other countries describe the same kind of programme.
        Here&apos;s what each one actually involves, and where visa
        status matters.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3">
        <RouteCard
          name="Spring Week / Insight Programme"
          when="2–5 days, usually Easter"
          description="Open to first-year students only, or second-years on a four-year degree. There's no job at the end of it, but if you do well you're often fast-tracked straight to Summer Internship interviews without applying again. Usually unpaid or a small stipend, so sponsorship doesn't come into it; your existing Student visa work rights cover it."
        />
        <RouteCard
          name="Placement Year / Industrial Placement"
          when="9–12 months, penultimate year of a sandwich degree"
          description="A paid placement built into some degree courses, running a full academic year. You're still enrolled as a student the whole time, so it normally sits under your Student visa rather than needing a Skilled Worker visa, but check the hours with your university's immigration team before you start, since full-time work changes your usual term-time pattern."
        />
        <RouteCard
          name="Summer Internship"
          when="6–10 weeks, penultimate-year students"
          description="The main route into graduate schemes at most large employers. A strong summer often converts straight into a graduate offer, no second application needed. Worth asking about sponsorship early here, since the same employer relationship usually carries through."
        />
        <RouteCard
          name="Off-cycle Internship"
          when="Similar length, different start month (often January)"
          description="Banks and asset managers use these to backfill smaller team needs outside the main summer intake. Smaller cohort, sometimes less publicised, so it's worth checking employer websites directly rather than relying only on aggregator listings."
        />
        <RouteCard
          name="Full-time Graduate Programme"
          when="The actual job"
          description="This is where the Skilled Worker question gets real. Get a specific answer on sponsorship before you accept, not after. 'We sponsor for the right candidates' isn't an answer, ask what that means for you by name."
        />
      </div>

      {/* Section 5: Timelines */}
      <h2 className="mt-12 text-lg font-semibold">Timelines that matter</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        There are two clocks running at once, and it&apos;s easy to be
        watching one while the other quietly runs down. Recruitment cycles move on
        their own schedule: spring weeks open roughly January to March,
        summer internship applications open the September before and
        often close early once enough strong applications come in, and
        graduate schemes generally run September to January. Applying in
        the first few weeks a cycle opens makes a real difference to your
        odds compared to applying near the deadline.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Your visa runs on a separate clock. You can apply for your
        Graduate visa as soon as your university tells the Home Office
        you&apos;ve completed your course, you don&apos;t need to wait
        for the ceremony or the certificate. Start talking to employers about
        sponsorship months before your Graduate visa is due to expire, not
        in the final few weeks. Switching visas takes time, and a
        Certificate of Sponsorship has to exist before you can even apply.
      </p>

      {/* Section 6: Common mistakes */}
      <h2 className="mt-12 text-lg font-semibold">Common mistakes</h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          Applying broadly first and checking sponsorship later, then
          finding out weeks in that the employer doesn&apos;t hold a
          licence at all.
        </li>
        <li>
          Assuming a passed right to work check means sponsorship is
          sorted. They&apos;re different things, as above.
        </li>
        <li>
          Letting the Graduate visa deadline creep up on you. It
          can&apos;t be extended, and there&apos;s no grace period once
          it&apos;s gone.
        </li>
        <li>
          Not mentioning the under-26 or recent-graduate salary discount
          when a recruiter says a role doesn&apos;t meet the threshold.
          Some of them don&apos;t know about it either.
        </li>
        <li>
          Treating sponsorship as assumed rather than confirmed. Get it in
          writing at offer stage, every time.
        </li>
      </ul>

      {/* Section 7: Culture and interviews */}
      <h2 className="mt-12 text-lg font-semibold">
        Interview and workplace culture notes
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Most UK graduate recruitment runs on competency-based interviews,
        built around the STAR method (Situation, Task, Action, Result).
        Come with specific stories from your own experience rather than
        general statements about your strengths, since that&apos;s what
        interviewers are actually listening for.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Assessment centres are common for banking, consulting, and Big 4
        recruitment: group exercises, case studies, numerical and verbal
        reasoning tests, and often a recorded video interview before
        you&apos;ve spoken to an actual person. Interview style also
        tends to reward understatement over self-promotion. Specific,
        detailed examples land better than broad claims about being the
        best at something. And dress codes vary more than you&apos;d
        expect: some tech firms and startups genuinely mean smart casual,
        while most banks, law firms, and Big 4 firms mean business formal
        even when the invite says otherwise. When you&apos;re not sure,
        dress slightly smarter than what&apos;s stated.
      </p>

      {/* Section 8: Where to go next, on Hublr */}
      <h2 className="mt-12 text-lg font-semibold">Where to go next</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Salary thresholds and fees change more often than you&apos;d
        think, so double-check anything time-sensitive before you make a
        decision that depends on it.
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
