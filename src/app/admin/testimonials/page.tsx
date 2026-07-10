import { createClient } from "@/lib/supabase/server";
import { getAllTestimonials } from "@/lib/testimonials";
import AdminSubNav from "../AdminSubNav";
import QuickAddForm from "./QuickAddForm";
import AdminTestimonialRow from "./AdminTestimonialRow";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const testimonials = await getAllTestimonials(supabase);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Admin: In Their Shoes
      </h1>

      <div className="flex flex-col gap-8">
        <QuickAddForm />

        <div>
          <h2 className="text-sm font-semibold mb-3">
            All testimonials ({testimonials.length})
          </h2>
          <div className="flex flex-col gap-3">
            {testimonials.map((t) => (
              <AdminTestimonialRow key={t.id} testimonial={t} />
            ))}
            {testimonials.length === 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No testimonials yet. Add one above.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
