import { cn } from "@/lib/utils";

export const TrainIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-train-front", className)}
    {...props}
  >
    <path d="M8 3.1l.2.2c1.2 1.4 2.8 2.5 4.8 2.5s3.6-1.1 4.8-2.5l.2-.2" />
    <path d="M5 12h14" />
    <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    <path d="M5 12V8c0-1.7 1.3-3 3-3h8c1.7 0 3 1.3 3 3v4" />
    <path d="M8 12v-2" />
    <path d="M16 12v-2" />
    <path d="M8 19v2" />
    <path d="M16 19v2" />
  </svg>
);
