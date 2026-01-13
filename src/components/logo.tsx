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
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.11.65-1.07 2.33-1.07 3.45-.08a2.5 2.5 0 0 1-1.05 4.38"/><path d="M19.5 16.5c1.5 1.26 2 5 2 5s-3.74-.5-5-2c-.71-.84-.7-2.3.05-3.11-.65-1.07-2.33-1.07-3.45-.08a2.5 2.5 0 0 0 1.05 4.38"/><path d="M12 2a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4Z"/>
      </svg>
      <span className="font-headline text-2xl font-bold text-white">RoamReady</span>
    </Link>
  );
}
