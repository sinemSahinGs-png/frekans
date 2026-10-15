type Props = {
  size?: number;
  inverted?: boolean;
  className?: string;
};

export function FrekansEmblem({ size = 40, inverted, className }: Props) {
  const navy = inverted ? "#ffffff" : "#0B2857";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <circle cx="32" cy="32" r="30.2" stroke={navy} strokeWidth="2.4" />
      <circle cx="32" cy="32" r="24.5" stroke={navy} strokeOpacity="0.22" strokeWidth="1.1" />
      <path
        d="M14 38 C20 24, 26 24, 32 32 C38 40, 44 40, 50 26"
        stroke="#00A84F"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 26 C20 40, 26 40, 32 32 C38 24, 44 24, 50 38"
        stroke={navy}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
