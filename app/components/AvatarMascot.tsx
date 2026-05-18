// TODO: replace placeholder SVG with final illustrated mascot before launch

type Props = { size?: number };

export function AvatarMascot({ size = 28 }: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <ellipse
        cx="40"
        cy="36"
        rx="14"
        ry="18"
        fill="none"
        stroke="#0A0A0A"
        strokeWidth="2.5"
      />
      <path
        d="M26,28 Q28,16 40,15 Q52,16 54,28 Q53,21 47,22 Q44,17 40,17 Q36,17 33,22 Q27,21 26,28 Z"
        fill="#0A0A0A"
      />
      <circle
        cx="34"
        cy="36"
        r="5"
        fill="none"
        stroke="#0A0A0A"
        strokeWidth="2.5"
      />
      <circle
        cx="46"
        cy="36"
        r="5"
        fill="none"
        stroke="#0A0A0A"
        strokeWidth="2.5"
      />
      <line
        x1="39"
        y1="36"
        x2="41"
        y2="36"
        stroke="#0A0A0A"
        strokeWidth="2.5"
      />
      <path
        d="M37,46 Q40,47.5 43,46"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
