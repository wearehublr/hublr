function daysUntil(deadline: string | null): number | null {
  if (!deadline) return null;
  const ms = new Date(deadline).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
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

  let tone = "text-neutral-600 dark:text-neutral-300";
  if (days !== null && days < 0) tone = "text-neutral-400 line-through";
  else if (days !== null && days <= 7)
    tone = "text-red-600 dark:text-red-400 font-medium";
  else if (days !== null && days <= 21)
    tone = "text-amber-600 dark:text-amber-400 font-medium";

  return (
    <span className={`text-xs ${tone}`}>
      Deadline: {formatted}
      {days !== null && days >= 0 ? ` (${days}d)` : ""}
    </span>
  );
}
