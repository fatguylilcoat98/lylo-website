type Props = {
  className?: string;
  size?: number;
};

export default function LyloMark({ className, size = 36 }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lylo-g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#E5C476" />
            <stop offset="100%" stopColor="#85B0CF" />
          </linearGradient>
        </defs>
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="url(#lylo-g)"
          strokeWidth="2.5"
          fill="white"
        />
        <path
          d="M24 33s-9-5.4-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 33 21c0 6.6-9 12-9 12Z"
          fill="url(#lylo-g)"
        />
      </svg>
      <span className="font-serif text-xl font-medium tracking-tight text-ink-900">
        Lylo
      </span>
    </span>
  );
}
