/**
 * Orders items so upcoming dates come first (soonest first), items with no
 * date sit in the middle, and past dates sink to the bottom (most recently
 * passed first). Plain ascending order would put past dates first since
 * they're chronologically smaller than future ones -- this fixes that.
 */
export function compareByDate(a: string | null, b: string | null): number {
  const now = Date.now();
  const tier = (d: string | null) => {
    if (d === null) return 1;
    return new Date(d).getTime() >= now ? 0 : 2;
  };

  const tierA = tier(a);
  const tierB = tier(b);
  if (tierA !== tierB) return tierA - tierB;
  if (tierA === 0) return new Date(a!).getTime() - new Date(b!).getTime();
  if (tierA === 2) return new Date(b!).getTime() - new Date(a!).getTime();
  return 0;
}
