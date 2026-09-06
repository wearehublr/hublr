import { createClient } from "@/lib/supabase/server";
import { getAllInterviewQuestions } from "@/lib/interview-questions";
import AdminSubNav from "../AdminSubNav";
import QuickAddForm from "./QuickAddForm";
import AdminQuestionRow from "./AdminQuestionRow";

export const dynamic = "force-dynamic";

export default async function AdminInterviewQuestionsPage() {
  const supabase = await createClient();
  const questions = await getAllInterviewQuestions(supabase);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Admin: Interview Questions
      </h1>

      <div className="flex flex-col gap-8">
        <QuickAddForm />

        <div>
          <h2 className="text-sm font-semibold mb-3">
            All questions ({questions.length})
          </h2>
          <div className="flex flex-col gap-3">
            {questions.map((q) => (
              <AdminQuestionRow key={q.id} question={q} />
            ))}
            {questions.length === 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No questions yet. Add one above.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
