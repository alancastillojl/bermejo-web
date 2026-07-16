const PHRASE = "We show up every day, one step at a time, until things begin to change";
const REPEAT_COUNT = 6;

function MarqueeGroup() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
        <span key={i} className="flex items-center gap-3 px-4">
          {PHRASE}
          <span className="text-brand">•</span>
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="w-full overflow-hidden border-y border-ink/15 bg-cream/60">
      <div className="flex w-max animate-marquee py-3 text-[11px] font-semibold tracking-[0.15em] text-ink/70 uppercase">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}
