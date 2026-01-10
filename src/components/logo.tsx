import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
      >
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 9.8c0 7.3-8 11.8-8 11.8z" />
        <path d="m9 14 3-4 3 4" />
        <path d="M12 10v9" />
      </svg>
      <span className="font-headline text-2xl font-bold">RoamReady</span>
    </Link>
  );
}
