function daysUntil(deadline: string | null): number | null {
  if (!deadline) return null;
  const ms = new Date(deadline).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function urgencyLabel(days: number): string {
  if (days === 0) return "🔴 Closes today";
  if (days === 1) return "🔴 Closes tomorrow";
  if (days <= 7) return `🔴 ${days} days left`;
  if (days <= 21) return `🟡 ${days} days left`;
  return `🟢 ${days} days left`;
}

export default function DeadlineBadge({ deadline }: { deadline: string | null }) {
  if (!deadline) {
    return (
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        Rolling / no fixed deadline
      </span>
    );
  }

  const days = daysUntil(deadline);
  const formatted = new Date(deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (days !== null && days < 0) {
    return (
      <span className="text-xs text-neutral-400 line-through">
        Deadline passed &middot; {formatted}
      </span>
    );
  }

  let tone = "text-neutral-600 dark:text-neutral-300";
  if (days !== null && days <= 7) tone = "text-red-600 dark:text-red-400 font-medium";
  else if (days !== null && days <= 21)
    tone = "text-amber-600 dark:text-amber-400 font-medium";

  return (
    <span className={`text-xs ${tone}`}>
      {days !== null ? `${urgencyLabel(days)} · ${formatted}` : `Deadline: ${formatted}`}
    </span>
  );
}
