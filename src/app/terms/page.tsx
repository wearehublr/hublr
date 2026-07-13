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

      <h2 className="mt-10 text-lg font-semibold">1. Information about us</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        wearehublr.com (the &quot;Website&quot;) is operated by Hublr Ltd
        (&quot;we&quot;, &quot;us&quot;, &quot;Hublr&quot;).
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We are registered in England and Wales under company number
        17076401, with a registered office at 167-169 Great Portland
        Street, 5th Floor, London, W1W 5PF.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Hublr provides career-related information, curated early-career
        opportunities, events and resources, and tools for students to
        track their own applications and job search.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        The Website is hosted in the UK/EU, with data stored with
        third-party providers as described in our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        2. Acceptance of these terms
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        The following applies to every page on the Website, whether or not
        that page individually repeats it. All disclaimers, terms and
        conditions set out on the Website form part of these terms
        (&quot;Terms&quot;).
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        By creating an account or otherwise using the Website, you accept
        these Terms, which creates a binding agreement between you and us.
        If you don&apos;t accept these Terms, you must not use the Website.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We reserve the right to refuse or close a registration, without
        limitation, for any reason we see fit.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We may change these Terms from time to time. Your continued use of
        the Website after a change means you agree to be bound by the
        current version.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        3. Eligibility to use the Website
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        By using the Website, you represent and warrant that:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>all information you submit is truthful, accurate and up to date; and</li>
        <li>your use of the Website does not violate any applicable law or regulation.</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We may suspend or delete your account if we believe any information
        you&apos;ve provided is incorrect, or if we receive a complaint
        about your use of the Website.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        4. Fair usage — what you&apos;re allowed to do
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        The Website is made available for your own use in connection with
        your job search. As a result:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          you may make transient or cached copies of parts of the Website,
          or print a page, for your own research and job-search purposes;
        </li>
        <li>
          we set up a Hublr profile to record the information, applications,
          and preferences you choose to add; and
        </li>
        <li>
          you control how much information you share with us through your
          profile, subject to our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </li>
      </ul>

      <h2 className="mt-10 text-lg font-semibold">
        5. Keeping the Website safe — what you&apos;re not allowed to do
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We use reasonable endeavours to keep the Website safe for everyone
        who uses it. To help with that, you must not:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>copy any part of the Website except as set out in section 4 above;</li>
        <li>
          use the Website or its content to generate income of any kind,
          other than income from a role or opportunity you secure through
          it;
        </li>
        <li>
          use any data or content from the Website in connection with any
          business or commercial undertaking, whether or not for profit;
        </li>
        <li>send unauthorised commercial or spam communications through the Website;</li>
        <li>upload viruses or other malicious code;</li>
        <li>
          post content that is hateful, threatening, pornographic, contains
          nudity or gratuitous violence, or is defamatory, untruthful, or
          breaches someone else&apos;s privacy;
        </li>
        <li>run any contest, giveaway, or sweepstake on the Website without our prior written consent;</li>
        <li>use the Website to do anything unlawful, misleading, malicious, or discriminatory;</li>
        <li>do anything that could disable, overburden, or impair the Website, such as a denial-of-service attack; or</li>
        <li>facilitate or encourage anyone else to do any of the above.</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        If you breach this section in a way that threatens the Website or
        other users, you&apos;ll be responsible for any resulting losses,
        including losses incurred by Hublr, its partners, or other users.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        6. Personal data / privacy policy
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We only ever share your individual, identifiable information with
        sponsors, partners, or other third parties where you&apos;ve taken
        an action that involves that (for example, clicking through to
        apply directly on an employer&apos;s site). Aggregate,
        anonymised statistics may be shared with sponsors and partners so
        they can see how their opportunities perform, but these never
        identify you individually.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Use of your personal data is governed by our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        , which forms part of these Terms. Please read it carefully — by
        using the Website, you agree to be bound by it.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        7. No warranty and reliance on information
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We don&apos;t make any representations, warranties, or guarantees
        about the Website or its contents, other than those required by
        law. All information on the Website is provided for guidance only,
        and your use of it is at your own risk.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Opportunities and events listed on the Website are subject to
        availability and to the selection criteria of the organisations
        offering them. Where an opportunity or event is supplied by a
        third-party organisation, our role is that of an intermediary
        curating and listing it, not an agent of that organisation. We do
        what we reasonably can to keep listings accurate, but we accept no
        liability for the standard, quality, or availability of any
        opportunity, event, or service supplied by a third-party
        organisation, or for that organisation failing to honour it.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        The Website also links to external websites and services owned by
        third parties. These are provided for your convenience; we accept
        no liability for and make no warranties about them, and we
        aren&apos;t responsible for their content or your use of them
        (except to the extent required by law).
      </p>

      <h2 className="mt-10 text-lg font-semibold">8. Limitation of liability</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        This section sets out our entire liability to you in connection
        with the Website and these Terms.
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>Our liability for death or injury caused by our negligence is not limited.</li>
        <li>
          Our total aggregate liability to you for any event of default
          will not exceed £100 in any calendar year.
        </li>
        <li>
          We are not liable for loss of opportunity, income, or goodwill,
          or for any indirect or consequential loss, even if it was
          reasonably foreseeable.
        </li>
        <li>
          We are not liable for any failure or delay caused by something
          beyond our reasonable control, including system or network
          breakdowns.
        </li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Nothing here affects any statutory rights that can&apos;t legally
        be excluded. To the fullest extent permitted by law, we exclude all
        other liability of Hublr Ltd, its directors, employees, or other
        representatives arising from your use of the Website.
      </p>

      <h2 className="mt-10 text-lg font-semibold">9. Intellectual property rights</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        The design, text, graphics, and other material on the Website, and
        the way it&apos;s arranged, belongs to us and/or our licensors.
        Except as expressly permitted in section 4, you may not copy,
        download, store, publish, or adapt any content from the Website
        for any purpose without our prior written permission.
      </p>

      <h2 className="mt-10 text-lg font-semibold">10. Risk of transmission</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        The internet is not a completely secure or reliable medium, and use
        of it can carry a risk of manipulation or attempted fraud. We
        accept no liability for data transmission errors, including data
        loss, damage, or alteration, or for the confidentiality or security
        of email communications.
      </p>

      <h2 className="mt-10 text-lg font-semibold">11. Access to the Website</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Given the nature of the internet, we can&apos;t promise the Website
        will always be available or error-free.
      </p>

      <h2 className="mt-10 text-lg font-semibold">12. Enquiries or complaints</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        You can contact us by email at{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>{" "}
        or by writing to our registered office address above.
      </p>

      <h2 className="mt-10 text-lg font-semibold">13. Variation</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We may revise these Terms at any time by updating this page. You
        should check back from time to time, as changes are binding on you
        — we&apos;ll give as much notice as we reasonably can.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We may also suspend or discontinue Hublr at any time, giving as
        much notice as we reasonably can. If we sell or transfer Hublr to
        another company, we may transfer our rights and obligations under
        these Terms, and any information we hold about you, to that
        company without further consent — this won&apos;t change your
        rights over how that information can be used.
      </p>

      <h2 className="mt-10 text-lg font-semibold">14. Termination</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We may deny you access to the Website and close your account at
        any time if you breach these Terms, or are abusive or offensive to
        our team or other users.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        You can close your own account at any time from the &quot;Danger
        zone&quot; section of your{" "}
        <Link href="/profile" className="underline">
          profile page
        </Link>
        , which permanently deletes your profile, tracked applications,
        uploaded documents, and job alerts.
      </p>

      <h2 className="mt-10 text-lg font-semibold">15. Law and jurisdiction</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        These Terms and your use of the Website are governed by the laws of
        England and Wales. Any dispute arising out of or relating to these
        Terms or the Website is subject to the exclusive jurisdiction of
        the English courts.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        You&apos;re responsible for complying with any laws that apply in
        the country from which you access the Website.
      </p>
    </main>
  );
}
