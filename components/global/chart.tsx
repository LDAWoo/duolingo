"use client";
import React from "react";
import ChartLine from "./chart-line";
import { useDimensions } from "@/hooks/use-dimensions";
import { ChartDataPoint } from "@/lib/types";

type ChartData = {
    data1: ChartDataPoint[];
    data2: ChartDataPoint[];
};

const Chart: React.FC<ChartData> = ({ data1, data2 }) => {
    const ref = React.useRef(null);
    const xLabels = data1.map((point) => point.x);
    const { width, height } = useDimensions(ref);

    const maxY = Math.max(...[...data1, ...data2].map((point) => point.y), 0);

    const yLabels = [maxY, (maxY * 3) / 4, maxY / 2, maxY / 4, 0];

    return (
        <div className="aspect-[1/0.4] pl-10 pb-2">
            <div className="relative h-full" ref={ref}>
                {/* Grid lines */}
                <div className="h-full flex flex-col justify-between">
                    {yLabels.map((label) => {
                        let left = 28;
                        if (label >= 100) {
                            left = 36;
                        }

                        if (label >= 1000) {
                            left = 44;
                        }

                        return (
                            <div key={label} className="w-full border-t-2 relative">
                                <div
                                    className="absolute top-1/2 -translate-y-1/2"
                                    style={{
                                        left: `-${left}px`,
                                    }}
                                >
                                    <div className="min-w-[16px] text-right">
                                        <span className="text-[calc(var(--type-base-size)-2px)] text-[#cccac9]">{Math.floor(label)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Chart lines */}
                <ChartLine data={data1} color="rgba(200, 200, 200, 0.8)" strokeColor="rgb(222, 222, 222)" strokeWidth={2} maxY={maxY} width={width} height={height} opacity={0.5} />
                <ChartLine data={data2} color="hsl(var(--primary-foreground))" strokeColor="rgb(28, 176, 246)" strokeWidth={2} maxY={maxY} width={width} height={height} />
            </div>

            {/* X-axis labels */}
            <div className="relative">
                <div
                    className="absolute"
                    style={{
                        width: `${width + 18}px`,
                        left: "-8px",
                    }}
                >
                    <div className="flex justify-between mt-2">
                        {xLabels.map((label) => (
                            <span key={label} className="text-[calc(var(--type-base-size)-2px)] text-right text-[#cccac9]">
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Chart);
