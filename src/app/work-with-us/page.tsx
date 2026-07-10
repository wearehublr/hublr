import WorkWithUsForm from "./WorkWithUsForm";

export default function WorkWithUsPage() {
  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Work with us
      </h1>
      <p className="mt-2 mb-8 text-neutral-600 dark:text-neutral-300">
        Whether you&apos;re a student who wants to volunteer, or a sponsor
        interested in supporting Hublr, we&apos;d love to hear from you.
      </p>

      <WorkWithUsForm />
    </main>
  );
}
