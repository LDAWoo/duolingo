import { cn } from "@/lib/utils";
import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGSVGElement> & {
    className?: string;
    size?: number;
};

export const ArrowQuestion = ({ className, size, ...props }: Props) => {
    return (
        <svg viewBox="0 0 18 20" width={size} height={size} className={cn("inline-flex", className)} {...props}>
            <path fill="currentColor" d="M2.00358 19.0909H18V0.909058L0.624575 15.9561C-0.682507 17.088 0.198558 19.0909 2.00358 19.0909Z"></path>
            <path className="fill-border" clipRule="evenodd" d="M18 2.48935V0L0.83037 15.6255C-0.943477 17.2398 0.312833 20 2.82143 20H18V18.2916H16.1228H2.82143C1.98523 18.2916 1.56646 17.3716 2.15774 16.8335L16.1228 4.12436L18 2.48935Z" fillRule="evenodd"></path>
        </svg>
    );
};

export const EditIcon = ({ className, size }: Props) => {
    return (
        <svg width={size} height={size} className={cn("inline-flex", className)} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.8637 2.28623L12.1531 1.00038C13.4906 -0.33346 15.659 -0.333457 16.9965 1.00038C18.3339 2.33421 18.3339 4.49679 16.9965 5.83062L15.7071 7.11648L10.8637 2.28623ZM9.34202 3.80383L0.902018 12.2209C0.0785876 13.0421 -0.354215 16.9413 0.363097 17.6567C1.08041 18.3722 4.90788 17.8864 5.7454 17.0512L14.1854 8.63408L9.34202 3.80383Z" fill="currentColor"></path>
        </svg>
    );
};
