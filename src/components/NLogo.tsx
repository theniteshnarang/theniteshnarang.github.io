interface NLogoProps {
  size?: number;
  className?: string;
}

export default function NLogo({ size = 32, className = "" }: NLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <linearGradient id="n-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#141414" />
      <path
        d="M18 46V18h4.8l18.4 21.6V18H46v28h-4.8L22.8 24.4V46H18Z"
        fill="url(#n-emerald)"
      />
    </svg>
  );
}
