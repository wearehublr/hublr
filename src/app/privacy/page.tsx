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
        We take protecting your personal data seriously at Hublr. Please
        read this Privacy Policy alongside our{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>
        . By using wearehublr.com (the &quot;Website&quot;), you agree to
        both.
      </p>

      <h2 className="mt-10 text-lg font-semibold">What does this policy cover?</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        This policy explains what personal data we collect when you use
        Hublr, why we collect it, who (if anyone) we share it with, how we
        keep it secure, and the rights you have over it. We&apos;ve tried
        to write it in plain language rather than dense legal text. If
        anything is still unclear, email{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>{" "}
        and we&apos;ll explain it properly.
      </p>

      <h2 className="mt-10 text-lg font-semibold">Who is Hublr?</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Hublr helps students find early-career opportunities, events, and
        resources, and gives them tools to organise their own applications
        and job search. Hublr is operated by Hublr Ltd, a company
        registered in England and Wales (company number 17076401), with a
        registered office at 167-169 Great Portland Street, 5th Floor,
        London, W1W 5PF. Throughout this policy, &quot;we&quot; and
        &quot;us&quot; means Hublr Ltd.
      </p>

      <h2 className="mt-10 text-lg font-semibold">What is personal data?</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Personal data is any information that can identify you as a living
        person: things like your name, email address, or university. Some
        categories of personal data are treated as more sensitive under UK
        law (for example, health information, ethnicity, or sexual
        orientation). To be clear: <strong>we don&apos;t ask for or
        knowingly collect any of these sensitive categories</strong>, and
        we don&apos;t need them to run Hublr.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        Who does Hublr collect personal data from?
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        To run Hublr, we collect data from:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>Students who register for an account (&quot;Members&quot;);</li>
        <li>
          People who submit our &quot;Work with us&quot; form, whether as a
          prospective student volunteer or a prospective sponsor/partner;
          and
        </li>
        <li>General visitors to the Website, through analytics.</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We don&apos;t hold employer or &quot;client&quot; accounts on
        Hublr: sponsors and employers don&apos;t have logins or direct
        access to Member data (see &quot;Who do we share your personal
        data with&quot; below).
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        Why does Hublr collect personal data?
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        For Members, we use your data to:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>create and secure your account, and let you log in;</li>
        <li>show you opportunities, events, and resources relevant to you, and let you track your own applications;</li>
        <li>
          send you emails you&apos;ve asked for by using the service:
          deadline reminders, job alerts matching searches you&apos;ve
          saved, and confirmation that we&apos;ve received something
          you&apos;ve submitted (you can turn these off anytime; see
          &quot;Your rights&quot; below);
        </li>
        <li>
          report honest, aggregated statistics to the sponsors and
          employers who fund the opportunities we list (for example,
          &quot;120 students clicked apply this month&quot;); this never
          includes your individual identity or contact details; and
        </li>
        <li>understand how the Website is used, and improve it, using analytics.</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        For people who submit our &quot;Work with us&quot; form, we use
        your data only to read and respond to your message.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        If you choose not to share certain data with us (for example,
        leaving profile fields blank), we may not be able to personalise
        some parts of the service for you, but you can still use the core
        Website.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        What personal data does Hublr collect?
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        For Members, we may collect and process:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>Your email address and password (password handling is managed by our authentication provider, Supabase; we never see it in plain text);</li>
        <li>Preferred name;</li>
        <li>University and degree subject;</li>
        <li>Study year (e.g. Year 12, Sixth Form, 1st–4th year, postgraduate, recent graduate);</li>
        <li>Career goal and a short summary you write about yourself;</li>
        <li>Whether you&apos;re a home or international student;</li>
        <li>Industries you&apos;re interested in;</li>
        <li>The opportunities you track, their stage (e.g. applied, interviewing, offer), deadlines, and any notes you add;</li>
        <li>CVs and cover letters you upload;</li>
        <li>Saved search / job alert criteria (region, category, visa sponsorship, industry, keyword);</li>
        <li>A record of when you click &quot;Apply&quot; on a listing; and</li>
        <li>If you contact us, a record of that correspondence.</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        For &quot;Work with us&quot; form submissions, we collect the name,
        email address, and message you provide.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        For all visitors, our analytics tools may collect IP address
        (used to approximate location), device/browser type, and pages
        visited.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Testimonials published on the Website (real student stories) are
        only ever added by us, and only after the person featured has
        separately given their explicit consent to have their name, story,
        and photo shared; we never publish this from a Member&apos;s
        account data without asking first.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        How does Hublr collect personal data?
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Directly from you, when you:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>register for an account;</li>
        <li>fill in or update your profile;</li>
        <li>track an opportunity or upload a document;</li>
        <li>save a job alert;</li>
        <li>submit the &quot;Work with us&quot; form; or</li>
        <li>email us directly.</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        We also collect data automatically through cookies and analytics
        tools when you use the Website (see &quot;Cookies and
        analytics&quot; below). We don&apos;t buy personal data from third
        parties or data brokers, and we don&apos;t source information
        about you from social media or other public sources.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        What legal basis do we rely on to process your personal data?
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        UK data protection law requires us to have a valid reason for
        processing your data. We rely on:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>
          <strong>Legitimate interest</strong>, to run the core service:
          creating your account, showing you relevant opportunities,
          sending you the transactional emails the service depends on
          (deadline reminders, job alerts, confirmations), and reporting
          aggregated, anonymised statistics to sponsors;
        </li>
        <li>
          <strong>Consent</strong>, for non-essential cookies used for
          analytics (see below), and you can withdraw this at any time; and
        </li>
        <li>
          <strong>Legal compliance</strong>, where we&apos;re required by
          law to process or disclose data, for example in response to a
          valid request from a regulator or law enforcement.
        </li>
      </ul>

      <h2 className="mt-10 text-lg font-semibold">
        Who do we share your personal data with?
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We use a small number of trusted service providers to run Hublr.
        Each only processes the data needed to provide their service to
        us, and we require them to handle it securely:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li><strong>Supabase</strong>: hosts our database, authentication, and file storage (your uploaded documents);</li>
        <li><strong>Vercel</strong>: hosts the Website, and provides cookieless usage analytics;</li>
        <li><strong>Resend</strong>: delivers the transactional emails we send; and</li>
        <li><strong>Google Analytics</strong>: provides usage analytics using cookies (see below).</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        Sponsors and employers only ever receive aggregated, anonymised
        statistics (e.g. total click counts), never your individual
        identity, contact details, profile, or documents. Beyond the
        providers listed above, we won&apos;t disclose your personal data
        to anyone else unless we&apos;re legally required to.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        Where we store your personal data
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Our service providers (Supabase, Vercel, Resend, Google) may store
        and process data in the UK, the EEA, or other countries in which
        they operate, including the US. Where data is transferred outside
        the UK/EEA, reputable providers of this kind maintain appropriate
        legal safeguards (such as the UK International Data Transfer
        Addendum or equivalent standard contractual clauses) to protect it
        to a comparable standard.
      </p>

      <h2 className="mt-10 text-lg font-semibold">Cookies and analytics</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We use Google Analytics, which sets cookies to recognise repeat
        visits and measure site usage. It only loads if you accept it in
        the cookie banner shown on your first visit; if you decline, no
        Google Analytics cookies are set. You can change your mind at any
        time by clearing your browser&apos;s cookies for this site, which
        brings the banner back, or using your browser&apos;s cookie
        settings, or Google&apos;s{" "}
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

      <h2 className="mt-10 text-lg font-semibold">Security</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We rely on industry-standard providers (Supabase, Vercel) with
        encryption in transit, and we restrict access to your data to you
        and, where necessary, our own admin team. No system is completely
        secure, but we take reasonable technical steps to protect your
        information.
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        How long do we keep your personal data for?
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        We keep your data for as long as your account is active. If you
        delete your account, your profile, tracked applications, uploaded
        documents, and saved job alerts are permanently deleted
        immediately. Apply-click records are anonymised (disconnected
        from your account) rather than deleted, so sponsor reporting
        stays accurate. &quot;Work with us&quot; submissions are kept for
        our own records unless you ask us to remove them.
      </p>

      <h2 className="mt-10 text-lg font-semibold">Your rights</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Under UK data protection law, you have the right to:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li><strong>Be informed</strong>, which is what this policy is for.</li>
        <li><strong>Access</strong> the personal data we hold about you.</li>
        <li><strong>Rectification</strong>: correct inaccurate or incomplete data; most of this you can edit yourself on your profile page.</li>
        <li>
          <strong>Erasure</strong>: permanently delete your own account
          and all associated data anytime from the &quot;Danger zone&quot;
          section of your{" "}
          <Link href="/profile" className="underline">
            profile page
          </Link>
          , with no need to contact us.
        </li>
        <li><strong>Restrict or object to processing</strong>, for example, opting out of analytics, or turning off email notifications from your profile.</li>
        <li><strong>Data portability</strong>: request a copy of your data in a portable format.</li>
        <li><strong>Withdraw consent</strong> at any time, where consent is the basis for processing (this doesn&apos;t affect anything already done lawfully before you withdraw it).</li>
      </ul>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        To exercise any right that isn&apos;t self-serve, email{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>{" "}
        and let us know who you are. We may need to verify your identity
        before acting on a request. We aim to respond within one month.
        We don&apos;t charge a fee for reasonable requests, but may charge
        a reasonable fee, or decline, if a request is manifestly
        unfounded, excessive, or repetitive.
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-200">
        You also have the right to lodge a complaint with the UK
        Information Commissioner&apos;s Office (ICO) if you think
        we&apos;ve mishandled your data. Further information, including
        contact details, is available at{" "}
        <a
          href="https://ico.org.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ico.org.uk
        </a>
        .
      </p>

      <h2 className="mt-10 text-lg font-semibold">
        Third-party privacy policies
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Opportunities, events, and resources on the Website link out to
        third-party employer sites, application portals, and other
        external services. If you follow one of these links, note that
        the destination site has its own privacy policy, and we
        aren&apos;t responsible for its practices or for any data you
        submit there. Please check a site&apos;s own policy before
        submitting personal data to it.
      </p>

      <h2 className="mt-10 text-lg font-semibold">Changes to this policy</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Any changes we make to this policy will be posted on this page,
        and we&apos;ll update the &quot;Last updated&quot; date above. It
        is important that the personal data we hold about you stays
        accurate. Please keep your profile up to date.
      </p>

      <h2 className="mt-10 text-lg font-semibold">Contact</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        The data controller responsible for your information is Hublr
        Ltd. Questions, comments, or requests regarding this policy or our
        use of your personal data can be sent to{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>
        .
      </p>

      <h2 className="mt-10 text-lg font-semibold">Unauthorised access</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        If you think someone unauthorised has become aware of your Hublr
        password, please contact us immediately at{" "}
        <a href="mailto:wearehublr@gmail.com" className="underline">
          wearehublr@gmail.com
        </a>
        . We can&apos;t be responsible for unauthorised use of your
        account resulting from a password you&apos;ve shared or that
        was compromised outside our systems.
      </p>

      <h2 className="mt-10 text-lg font-semibold">Transfer of ownership</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        If we sell or transfer Hublr to another company, we may transfer
        our rights and obligations, and the information we hold about
        Members, to that company without further consent. This won&apos;t
        change the rights you have over how that information is used.
      </p>
    </main>
  );
}
