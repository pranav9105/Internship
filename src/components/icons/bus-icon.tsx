import { cn } from "@/lib/utils";

export const BusIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={cn("lucide lucide-bus-front", className)}
        {...props}
    >
        <path d="M5 15h14" />
        <path d="M15 15v5" />
        <path d="M9 15v5" />
        <path d="M15 5h1a2 2 0 0 1 2 2v4H6V7a2 2 0 0 1 2-2h1" />
        <path d="m9 5 3 3 3-3" />
    </svg>
);
