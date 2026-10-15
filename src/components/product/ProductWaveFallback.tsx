export function ProductWaveFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" className={className} aria-hidden>
      <rect x="70" y="70" width="260" height="180" rx="6" fill="none" stroke="#0B2857" strokeOpacity="0.25" />
      <path d="M90 180 C140 120, 180 240, 230 160 C280 90, 320 200, 350 150" fill="none" stroke="#00A84F" strokeWidth="2" />
      <circle cx="230" cy="160" r="4" fill="#00A84F" />
    </svg>
  );
}
