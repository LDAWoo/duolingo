import React from "react";
import ChartPoint from "./chart-point";
import { ChartDataPoint } from "@/lib/types";

interface ChartLineProps {
    data: ChartDataPoint[];
    color: string;
    maxY: number;
    width?: number;
    height?: number;
    strokeWidth?: number;
    strokeColor?: string;
    opacity?: number;
}

const ChartLine: React.FC<ChartLineProps> = ({ data, color, maxY, width = 0, height = 0, strokeColor, strokeWidth = 2, opacity = 1 }) => {
    const xStep = width / (data.length - 1);

    const points = data.map((point, index) => ({
        x: index * xStep,
        y: height - (point.y / maxY) * height - 1,
    }));

    const pathD = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

    return (
        <div className="absolute inset-0 z-10">
            <svg className="w-full h-full">
                <path d={pathD} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" opacity={opacity} />
            </svg>
            {points.map((point, index) => (
                <ChartPoint key={index} x={point.x} y={point.y} color={color} />
            ))}
        </div>
    );
};

export default React.memo(ChartLine);
