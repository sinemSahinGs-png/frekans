type Props = {
  size?: number;
  inverted?: boolean;
  className?: string;
};

export function FrekansEmblem({ size = 48, inverted, className }: Props) {
  const navy = inverted ? "#ffffff" : "#0B2857";
  const height = Math.round(size * (58 / 70));

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 70 58"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M5 13 C15 13, 17 31, 27 31 C37 31, 39 13, 49 13 C59 13, 61 31, 66 31"
        stroke="#00A84F"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M5 37 C15 37, 17 55, 27 55 C37 55, 39 37, 49 37 C59 37, 61 55, 66 55"
        stroke={navy}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
