import { cn } from "@/lib/utils";
import React from "react";

interface ChartPointProps {
    x: number;
    y: number;
    color: string;
    className?: string;
}

const ChartPoint: React.FC<ChartPointProps> = ({ x, y, color, className }) => (
    <div
        className={cn(`absolute w-[10px] h-[10px] rounded-full transform -translate-x-1/2 -translate-y-1/2`, className)}
        style={{
            left: `${x}px`,
            top: `${y}px`,
            backgroundColor: color,
        }}
    />
);

export default React.memo(ChartPoint);
