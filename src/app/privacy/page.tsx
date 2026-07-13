import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Hublr",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Last updated: 13 July 2026
      </p>

      <p className="mt-6 text-neutral-700 dark:text-neutral-200">
        Hublr (&quot;Hublr&quot;, &quot;we&quot;, &quot;us&quot;) is operated
        by Hublr Ltd, a company registered in England and Wales (company
        number 17076401). This policy explains what personal data we
        collect through wearehublr.com, why we collect it, who we share it
        with, and the rights you have over it. If anything here isn&apos;t
        clear, email{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>{" "}
        and we&apos;ll explain it properly.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        1. What we collect
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We only collect data you give us directly, or that&apos;s generated
        by you using the site:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          <strong>Account data</strong> — the email address and password you
          sign up with (handled by our authentication provider, Supabase; we
          never see your password in plain text).
        </li>
        <li>
          <strong>Profile data</strong> — anything you add on your profile
          page: preferred name, university, degree, study year, career goal
          and summary, home/international student status, and industries
          you&apos;re interested in.
        </li>
        <li>
          <strong>Application tracking data</strong> — the opportunities you
          choose to track, their stage (e.g. applied, interviewing,
          offer), deadlines, and any notes you add.
        </li>
        <li>
          <strong>Uploaded documents</strong> — CVs and cover letters you
          upload to your documents page.
        </li>
        <li>
          <strong>Job alerts</strong> — the search filters you save (region,
          category, visa sponsorship, industry, keyword) so we can email you
          when a matching opportunity is posted.
        </li>
        <li>
          <strong>Apply-click data</strong> — when you click &quot;Apply&quot;
          on an opportunity, we log that the click happened (and your
          account, if you&apos;re logged in) so we can report honest,
          aggregate referral numbers to the sponsors and employers who fund
          the opportunities we list. We do not see or store anything about
          what happens after you leave our site.
        </li>
        <li>
          <strong>Contact form submissions</strong> — if you use the
          &quot;Work with us&quot; form, we collect the name, email, and
          message you provide.
        </li>
        <li>
          <strong>Usage data</strong> — standard analytics (pages visited,
          approximate location, device/browser type) via Google Analytics
          and Vercel Analytics. See &quot;Cookies and analytics&quot; below.
        </li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Testimonials published on the site are only ever added by us, and
        only after the person featured has separately agreed to have their
        story shared — we don&apos;t publish anyone&apos;s content without
        asking first.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        2. Why we collect it
      </h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>To create and secure your account, and let you log in.</li>
        <li>
          To show you relevant opportunities, events, and resources, and let
          you track your own applications.
        </li>
        <li>
          To send you transactional emails you&apos;ve asked for: deadline
          reminders, job alerts matching your saved searches, and
          confirmation that we&apos;ve received something you submitted. You
          can turn these off anytime from your profile, or via the
          unsubscribe link in any email.
        </li>
        <li>
          To report honest, aggregated statistics to sponsors and partners
          (e.g. &quot;120 students clicked apply this month&quot;) — sponsors
          never receive your individual identity or contact details.
        </li>
        <li>
          To understand how the site is used and improve it, using
          analytics.
        </li>
        <li>To respond to messages sent through our contact form.</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We do not sell your personal data, and we do not share your
        individual profile, applications, or documents with employers or
        sponsors without your action (for example, clicking through to
        apply directly on an employer&apos;s own site).
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        3. Who we share data with
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We use a small number of trusted service providers to run Hublr.
        Each only processes the data needed to provide their service to us:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          <strong>Supabase</strong> — hosts our database, authentication,
          and file storage (your uploaded documents).
        </li>
        <li>
          <strong>Vercel</strong> — hosts the website, and provides
          cookieless, privacy-friendly usage analytics.
        </li>
        <li>
          <strong>Resend</strong> — delivers the transactional emails we
          send (reminders, alerts, confirmations).
        </li>
        <li>
          <strong>Google Analytics</strong> — provides usage analytics using
          cookies (see below).
        </li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We don&apos;t share your data with anyone else, except where
        required by law.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        4. Cookies and analytics
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We use Google Analytics, which sets cookies to recognise repeat
        visits and measure site usage. You can opt out at any time using
        your browser&apos;s cookie settings, or Google&apos;s{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Analytics opt-out browser add-on
        </a>
        . Vercel Analytics, which we also use, is cookieless and
        doesn&apos;t track you individually across visits.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        5. How long we keep it
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We keep your data for as long as your account is active. If you
        delete your account, your profile, tracked applications, uploaded
        documents, and saved job alerts are permanently deleted immediately.
        Apply-click records are anonymised (disconnected from your account)
        rather than deleted, so sponsor reporting stays accurate; contact
        form submissions are kept for our own records unless you ask us to
        remove them.
      </p>

      <h2 className="mt-10 text-lg font-semibold">6. Your rights</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Under UK GDPR, you have the right to:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>Access the personal data we hold about you.</li>
        <li>Correct inaccurate data — most of this you can edit yourself on your profile page.</li>
        <li>
          Erase your data — you can permanently delete your own account and
          all associated data anytime from the &quot;Danger zone&quot;
          section of your{" "}
          <Link href="/profile" className="underline">
            profile page
          </Link>
          , with no need to contact us.
        </li>
        <li>Object to or restrict certain processing (e.g. analytics, marketing emails).</li>
        <li>Request a copy of your data in a portable format.</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        To exercise any right that isn&apos;t self-serve, email{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>
        . You also have the right to complain to the UK Information
        Commissioner&apos;s Office (ICO) at{" "}
        <a
          href="https://ico.org.uk/make-a-complaint/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ico.org.uk
        </a>{" "}
        if you think we&apos;ve mishandled your data.
      </p>

      <h2 className="mt-10 text-lg font-semibold">7. Security</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We use industry-standard providers (Supabase, Vercel) with
        encryption in transit and access controls restricting your data to
        you and, where necessary, our admin team. No system is completely
        secure, but we take reasonable technical steps to protect your
        information.
      </p>

      <h2 className="mt-10 text-lg font-semibold">8. Age</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Hublr is intended for students from Year 12 / Sixth Form upward
        (typically age 16+). We do not knowingly collect data from children
        under 13.
      </p>

      <h2 className="mt-10 text-lg font-semibold">9. Changes to this policy</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        If we make material changes to this policy, we&apos;ll update the
        &quot;Last updated&quot; date above. Continued use of Hublr after a
        change means you accept the updated policy.
      </p>

      <h2 className="mt-10 text-lg font-semibold">10. Contact</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Questions about this policy or your data? Email{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>
        . See also our{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>
        .
      </p>
    </main>
  );
}
