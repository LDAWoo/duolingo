import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-[calc(var(--type-base-size)-3px)] font-bold transition-colors focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-[.8px]", {
    variants: {
        variant: {
            default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-background-hover text-slate-500",
            locked: "bg-disable text-disable-foreground hover:bg-disable border border-b-4 border-border",
            primary: "text-background translate-y-0 active:translate-y-[4px] before:bg-primary-foreground before:hover:bg-primary-foreground/90 before:hover:border-primary-foreground/90 before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:border-2 before:border-primary-foreground before:rounded-2xl before:-z-[1] before:shadow-[0_4px_0_hsl(var(--primary-border))] active:before:shadow-none",
            primaryOutline: "text-primary-foreground translate-y-0 active:translate-y-[4px] before:bg-background before:hover:bg-background-hover before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:border-2 before:rounded-2xl before:-z-[1] before:shadow-[0_4px_0_hsl(var(--border))] active:before:shadow-none",
            secondary: "text-background translate-y-0 active:translate-y-[4px] before:bg-secondary before:hover:bg-secondary-hover before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:border-secondary-border before:rounded-2xl before:-z-[1] before:shadow-[0_4px_0_hsl(var(--secondary-border))] active:before:shadow-none",
            secondaryOutline: "text-secondary translate-y-0 active:translate-y-[4px] before:bg-background before:hover:bg-background-hover before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:border-border before:rounded-2xl before:-z-[1] before:shadow-[0_4px_0_hsl(var(--border))] active:before:shadow-none",
            danger: "bg-rose-500 text-background hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
            dangerOutline: "bg-background text-rose-500 hover:bg-background-hover",
            super: "bg-indigo-500 text-background hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
            superOutline: "bg-background text-indigo-500 hover:bg-background-hover",
            ghost: "bg-transparent text-slate-500 border-transparent border-0 hover:bg-background-hover",
            sidebar: "bg-transparent text-wolf border-2 border-transparent hover:bg-background-hover transition-none",
            sidebarOutline: "bg-primary text-primary-foreground border-sky-300 border-2 hover:bg-sky-500/20 transition-none",
            none: "bg-none border-2 border-[#8B99A0] translate-y-0 active:translate-y-[2px] before:absolute before:-top-[2px] before:-left-[2px] before:-bottom-[2px] before:-right-[2px] before:border-2 before:border-[#8B99A0] before:shadow-[0_2px_0_#8B99A0] before:rounded-[15px] before:-z-[1] active:before:shadow-none",
        },
        size: {
            default: "h-11 px-4 py-2",
            sm: "h-9 px-3",
            lg: "h-[46px] px-8",
            icon: "h-10 w-10",
            rounded: "rounded-full",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
