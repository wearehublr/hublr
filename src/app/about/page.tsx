export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Introduction
      </h1>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        Hublr is a student-led platform supporting underrepresented
        students as they navigate the challenges of entering the UK job
        market. It began with a simple mission: to offer the kind of
        career support students often struggle to find elsewhere.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        It began as a grassroots initiative offering free CV and cover
        letter reviews, mock interview preparation, and weekly newsletters
        featuring job opportunities. These services were designed to fill
        the gaps in existing university career support, providing students
        with practical, relevant, and culturally aware guidance.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        The team behind Hublr is made up of ten dedicated volunteers,
        students or recent graduates, who bring insight, empathy, and
        first-hand experience to everything we do. Our aim is to build a
        trusted, student-centred space where career support is practical,
        honest, and inclusive.
      </p>

      <p className="mt-4 font-medium text-neutral-800 dark:text-neutral-100">
        One built with heart: for students, by students.
      </p>

      <h2 className="mt-10 text-lg font-semibold">The founder</h2>

      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Muriel Tokam is the Founder of Hublr and currently works in asset
        management, following the completion of her MSc in Banking &amp;
        Finance at King&apos;s College London.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        Her experience spans both finance and recruitment. She previously
        completed an HR Summer Internship at HSBC, where she gained direct
        insight into how candidates are assessed throughout the hiring
        process. She also completed a six-month placement with the
        Placements Team at Loughborough Business School during her BSc in
        Economics, where she reviewed hundreds of CVs and cover letters and
        supported over 50 students in securing year-long placements across
        industries, including banking, technology and consulting.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        Muriel has also participated in selective insight programmes with
        firms such as Goldman Sachs, Aon, Fidelity, Morgan Stanley and
        Bloomberg. She has completed multiple assessment centres and
        received offers from companies including Amazon, Schroders, HSBC
        and UBS.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        A year after completing an Equity and Venture Capital Financing
        Summer School at Bocconi University in Italy, she gained exposure to
        early-stage investing as a Ventures Intern at Cambridge Enterprise,
        the University of Cambridge&apos;s commercialisation arm, where she
        conducted market analysis and investment evaluation.
      </p>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        Building on this experience, she has supported 150+ students in
        securing roles across finance, tech and consulting. Her approach
        focuses on helping candidates strengthen their positioning, improve
        their applications and perform effectively at each stage of the
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
