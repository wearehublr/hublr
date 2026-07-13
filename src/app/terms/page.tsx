import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Hublr",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Last updated: 13 July 2026
      </p>

      <p className="mt-6 text-neutral-700 dark:text-neutral-200">
        These terms govern your use of wearehublr.com (&quot;Hublr&quot;),
        operated by Hublr Ltd, a company registered in England and Wales
        (company number 17076401). By creating an account or using the
        site, you agree to them. If you don&apos;t agree, please
        don&apos;t use Hublr.
      </p>

      <h2 className="mt-10 text-lg font-semibold">1. What Hublr is</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Hublr is a free platform that curates and lists early-career
        opportunities, events, and resources (internships, placements,
        insight programmes, graduate schemes, and similar), and gives
        students tools to track their own applications and job search.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Hublr is not an employer, recruiter, or staffing agency. We
        don&apos;t run any employer&apos;s application process, and we
        don&apos;t guarantee that any opportunity we list will remain open,
        accurate, or lead to an interview or offer. Applications happen
        directly on the employer&apos;s own site or portal once you click
        through.
      </p>

      <h2 className="mt-10 text-lg font-semibold">2. Your account</h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>You must provide accurate information when you sign up.</li>
        <li>
          You&apos;re responsible for keeping your login details secure and
          for activity that happens under your account.
        </li>
        <li>One account per person, please.</li>
        <li>
          You can permanently delete your account and data anytime from
          your{" "}
          <Link href="/profile" className="underline">
            profile page
          </Link>
          .
        </li>
      </ul>

      <h2 className="mt-10 text-lg font-semibold">3. Acceptable use</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        When using Hublr, you agree not to:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>Scrape, bulk-extract, or resell the content we&apos;ve curated;</li>
        <li>Misrepresent your identity or impersonate someone else;</li>
        <li>
          Submit false, misleading, or harmful content through the contact
          form or any other input on the site;
        </li>
        <li>
          Attempt to interfere with, disrupt, or gain unauthorised access
          to the site or its underlying systems.
        </li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We may suspend or terminate accounts that misuse the platform.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        4. Third-party links and content
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Opportunities, events, and resources listed on Hublr link out to
        third-party websites (employer career pages, application portals,
        external guides). We aren&apos;t responsible for the content,
        accuracy, availability, or privacy practices of those third-party
        sites, and linking to them isn&apos;t an endorsement of everything
        on them.
      </p>

      <h2 className="mt-10 text-lg font-semibold">5. Your content</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        You retain ownership of the profile information, application notes,
        and documents (CVs, cover letters) you upload. You give us
        permission to store and process that content solely to provide the
        service to you — for example, displaying it back to you, or
        generating the aggregate, anonymised statistics described in our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        . We don&apos;t share your individual documents or profile with
        employers or sponsors.
      </p>

      <h2 className="mt-10 text-lg font-semibold">6. No guarantee of outcomes</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Hublr is a tool to help organise and support your job search. We
        don&apos;t guarantee that using it will result in an interview,
        offer, or job, and nothing on the site constitutes professional,
        legal, or careers-advisory guarantee.
      </p>

      <h2 className="mt-10 text-lg font-semibold">7. Availability and liability</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Hublr is provided &quot;as is&quot;. We do our best to keep it
        accurate and available, but we don&apos;t warrant it will be
        uninterrupted or error-free, and we&apos;re not liable for losses
        arising from your use of the site or from third-party opportunities,
        events, or resources listed on it, to the fullest extent permitted
        by law.
      </p>

      <h2 className="mt-10 text-lg font-semibold">8. Changes to these terms</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We may update these terms from time to time; we&apos;ll update the
        &quot;Last updated&quot; date above when we do. Continued use of
        Hublr after a change means you accept the updated terms.
      </p>

      <h2 className="mt-10 text-lg font-semibold">9. Governing law</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        These terms are governed by the laws of England and Wales.
      </p>

      <h2 className="mt-10 text-lg font-semibold">10. Contact</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Questions about these terms? Email{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>
        . See also our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </main>
  );
}
