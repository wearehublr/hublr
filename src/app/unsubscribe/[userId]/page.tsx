import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const supabase = createAdminClient();

  await supabase
    .from("profiles")
    .upsert({ id: userId, email_notifications_enabled: false });

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-16 sm:py-24 text-center">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
        You&apos;re unsubscribed
      </h1>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
        You won&apos;t receive tracking confirmation or deadline reminder
        emails from Hublr anymore. You can turn them back on anytime from
        your{" "}
        <Link href="/profile" className="underline">
          profile
        </Link>
        .
      </p>
    </main>
  );
}
