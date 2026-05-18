// TODO: replace placeholder SVG with final illustrated mascot before launch

export function AvatarMascot() {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent bg-paper-light">
      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="Encyclopedia mascot (placeholder)"
      >
        <path
          d="M16 22 Q22 10 32 11 Q42 10 48 22 L48 32 L16 32 Z"
          fill="#3A2D20"
        />
        <circle cx="32" cy="36" r="13" fill="#F2EDE0" />
        <circle
          cx="26"
          cy="36"
          r="4"
          fill="none"
          stroke="#1A1410"
          strokeWidth="1.4"
        />
        <circle
          cx="38"
          cy="36"
          r="4"
          fill="none"
          stroke="#1A1410"
          strokeWidth="1.4"
        />
        <line
          x1="30"
          y1="36"
          x2="34"
          y2="36"
          stroke="#1A1410"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M28 43 Q32 45 36 43"
          stroke="#1A1410"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M28 50 L32 53 L36 50 L34 58 L30 58 Z"
          fill="#D4A437"
        />
      </svg>
    </div>
  );
}
