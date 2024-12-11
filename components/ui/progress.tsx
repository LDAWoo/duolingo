"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { children?: React.ReactNode; onComplete?: () => void }>(({ className, value, children, onComplete, ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn("relative h-4 w-full rounded-full bg-disable")} {...props}>
        <ProgressPrimitive.Indicator
            className={cn("h-full flex-1 bg-primary transition-all relative rounded-full", className)}
            style={{ width: `${value || 0}%` }}
            onTransitionEnd={() => {
                if (onComplete) onComplete();
            }}
        >
            {children}
        </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
