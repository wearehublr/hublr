// Same hub/node mark used for the favicon (see icon.tsx / apple-icon.tsx),
// reused here as the visible on-page logo so the two stay in sync. Uses
// currentColor + Tailwind's text-* classes instead of fixed hex, so it
// (unlike the favicon, which can't) respects dark mode.
export default function Logo({
  size = 28,
  className = "shrink-0",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 170 170"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <line x1="85" y1="85" x2="85" y2="38" stroke="currentColor" strokeWidth="6" />
      <line x1="85" y1="85" x2="85" y2="132" stroke="currentColor" strokeWidth="6" />
      <line x1="85" y1="85" x2="38" y2="85" stroke="currentColor" strokeWidth="6" />
      <line x1="85" y1="85" x2="132" y2="85" stroke="currentColor" strokeWidth="6" />
      <circle cx="85" cy="38" r="11" fill="currentColor" />
      <circle cx="85" cy="132" r="11" fill="currentColor" />
      <circle cx="38" cy="85" r="11" fill="currentColor" />
      <circle cx="132" cy="85" r="11" fill="currentColor" />
      <circle cx="85" cy="85" r="18" fill="currentColor" />
    </svg>
  );
}
