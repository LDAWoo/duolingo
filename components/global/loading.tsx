import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    className?: string;
    size?: string | number;
    style?: React.CSSProperties;
};

const Loading = ({ className, size = 10, style }: Props) => {
    return (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center gap-[5px]" style={style}>
            <span
                className={cn("rounded-full bg-background animate-loading-first", className)}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
            <span
                className={cn("rounded-full bg-background animate-loading-second", className)}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
            <span
                className={cn("rounded-full bg-background animate-loading-third", className)}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        </span>
    );
};

export default React.memo(Loading);
