import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        About Hublr
      </h1>

      <p className="mt-4 text-lg text-neutral-800 dark:text-neutral-100">
        Hublr helps students land internships, grad roles, and more, with
        the kind of career support that&apos;s often hard to find
        elsewhere: practical, honest, and built by people who&apos;ve been
        through the process themselves.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        We started as a grassroots initiative offering free CV and cover
        letter reviews, mock interview preparation, and a weekly newsletter
        of job opportunities. Those services have since grown into a full
        toolkit, designed to close the gaps that university career support
        often leaves behind.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        Behind Hublr is a team of ten volunteers: students and recent
        graduates who bring first-hand insight, empathy, and genuine care
        to everything we do. We&apos;re building a trusted, student-centred
        space where career support is practical, honest, and inclusive.
      </p>

      <p className="mt-4 font-medium text-neutral-800 dark:text-neutral-100">
        Built with heart: for students, by students.
      </p>

      <div className="mt-8 rounded-lg border border-brand-light/40 dark:border-brand/40 bg-cream dark:bg-cream-dark p-5">
        <h2 className="font-semibold">For sponsors and partners</h2>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200">
          We also work with organisations who want to invest in the next
          generation of talent, through sponsorship, mentoring, or
          opportunities for our community. If that sounds like you,
          we&apos;d love to hear from you.
        </p>
        <Link
          href="/work-with-us"
          className="mt-3 inline-flex text-sm font-medium underline"
        >
          Partner with us
        </Link>
      </div>

      <h2 className="mt-10 text-lg font-semibold">The founder</h2>

      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Hublr is founded by Muriel Tokam, who currently works in asset
        management following her MSc in Banking &amp; Finance at
        King&apos;s College London.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        Her experience spans both finance and recruitment. During an HR
        Summer Internship at HSBC, she saw first-hand how candidates are
        assessed throughout the hiring process. Later, during a six-month
        placement with the Placements Team at Loughborough Business School,
        she reviewed hundreds of CVs and cover letters and helped over 50
        students secure year-long placements across banking, technology,
        and consulting.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        She has since taken part in selective insight programmes with
        firms including Goldman Sachs, Aon, Fidelity, Morgan Stanley, and
        Bloomberg, and completed multiple assessment centres, receiving
        offers from companies including Amazon, Schroders, HSBC, and UBS.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        A year after completing an Equity and Venture Capital Financing
        Summer School at Bocconi University in Italy, she gained exposure
        to early-stage investing as a Ventures Intern at Cambridge
        Enterprise, the University of Cambridge&apos;s commercialisation
        arm, conducting market analysis and investment evaluation.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        Drawing on this experience, she has helped 150+ students secure
        roles across finance, tech, and consulting. Her approach focuses
        on strengthening candidates&apos; positioning, sharpening their
        applications, and preparing them to perform at every stage of the
        recruitment process.
      </p>

      <div className="mt-8 rounded-lg border border-neutral-200 dark:border-neutral-800 p-5 text-sm">
        <p className="font-semibold">Muriel Tokam | Hublr</p>
        <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-neutral-600 dark:text-neutral-300">
          <a href="mailto:wearehublr@gmail.com" className="underline">
            Email
          </a>
          <span aria-hidden>·</span>
          <a
            href="https://www.linkedin.com/company/thejobseekerhub/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            LinkedIn
          </a>
          <span aria-hidden>·</span>
          <a
            href="https://wa.me/447340334521"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            WhatsApp
          </a>
          <span aria-hidden>·</span>
          <a href="/book" className="underline">
            Book a meeting
          </a>
        </p>
      </div>
    </main>
  );
}
