import { createClient } from "@/lib/supabase/server";
import { getPublishedInterviewResources } from "@/lib/interview-resources";
import { getPublishedInterviewQuestions } from "@/lib/interview-questions";
import InterviewPrepBrowser from "@/app/components/InterviewPrepBrowser";

export const dynamic = "force-dynamic";

export default async function InterviewPrepPage() {
  const supabase = await createClient();
  const [resources, questions] = await Promise.all([
    getPublishedInterviewResources(supabase),
    getPublishedInterviewQuestions(supabase),
  ]);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Interview Prep
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Practice questions, guides, and newsletter resources to help you
          prepare for interviews.
        </p>
      </header>

      {resources.length === 0 && questions.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-12 text-center">
          Nothing published yet. Check back soon.
        </p>
      ) : (
        <InterviewPrepBrowser resources={resources} questions={questions} />
      )}
    </main>
  );
}
