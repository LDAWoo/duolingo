import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    className?: string;
    size?: string | number;
};

const Loading = ({ className, size = 8 }: Props) => {
    return (
        <span className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center gap-[5px]", className)}>
            <span
                className="rounded-full bg-background animate-loading-first"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
            <span
                className="rounded-full bg-background animate-loading-second delay-75"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
            <span
                className="rounded-full bg-background animate-loading-third delay-150"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        </span>
    );
};

export default React.memo(Loading);
