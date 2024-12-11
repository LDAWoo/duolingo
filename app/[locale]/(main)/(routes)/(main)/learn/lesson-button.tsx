"use client";
import { levels } from "@/db/schema";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LessonPopover from "./lesson-popover";

type Props = {
    id: number;
    order: number;
    index: number;
    activeLevel: typeof levels.$inferSelect;
    levels: (typeof levels.$inferSelect)[];
    backgroundColor?: string;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
};

const LessonButton = ({ id, index, order, totalCount, locked, current, backgroundColor, percentage, levels, activeLevel }: Props) => {
    const [active, setActive] = React.useState(false);
    const elementRef = React.useRef<HTMLDivElement>(null);
    useClickOutside(elementRef, () => {
        setActive(false);
    });
    const cycleLength = totalCount;
    const cycleIndex = index % cycleLength;

    let indentationLevel;

    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
        if (index === 2) {
            indentationLevel = cycleIndex - 0.5;
        }
    } else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const position = indentationLevel * 45;

    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isComplete = !current && !locked;

    const href = isComplete ? `/lesson/${id}` : `lesson`;

    const handleButtonClick = () => {
        setActive((prev) => !prev);
    };

    const imageSrc = isComplete ? "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg" : isLast ? "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7d84afaa096ff1f1d3f8c86d6c2c9542.svg" : !locked ? "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg" : "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ddd21f172a2db0f5ef169c09b4d3badb.svg";

    return (
        <div>
            <div
                className="relative"
                style={{
                    right: order % 2 !== 0 ? `${position}px` : "auto",
                    left: order % 2 === 0 ? `${position}px` : "auto",
                    marginTop: isFirst ? 67 : 12,
                    "--path-lever-color": backgroundColor,
                }}
                ref={elementRef}
            >
                {current ? (
                    <div className="h-[93px] min-w-[80px] w-[98px] relative">
                        <div
                            onClick={handleButtonClick}
                            className={cn("scale-100 transition-all origin-bottom animate-bounce absolute cursor-pointer -top-6 left-0 right-0 text-center p-3 border-2 font-bold text-[calc(var(--type-base-size)-1px)] leading-[1] whitespace-nowrap uppercase bg-background text-[var(--path-lever-color)] rounded-xl tracking-wide z-10", {
                                "scale-0 animate-none": active,
                            })}
                        >
                            Bắt đầu
                            <div className="absolute left-1/2 -bottom-1 w-5 h-[10px] transform -translate-x-1/2">
                                <div className="absolute left-1/2 -translate-x-1/2 -rotate-45 w-[14px] h-[14px] border-l-2 border-b-2 bg-background" />
                            </div>
                        </div>
                        <CircularProgressbarWithChildren
                            value={Number.isNaN(percentage) ? 0 : percentage}
                            styles={{
                                path: {
                                    stroke: "hsl(var(--secondary))",
                                },
                                trail: {
                                    stroke: "hsl(var(--border))",
                                },
                            }}
                        >
                            <button type="button" onClick={handleButtonClick} className={cn(`relative z-[1] h-[64px] w-[70px] p-0 cursor-pointer hover:translate-y-[1.5px] active:translate-y-[8px] duration-0 border-b-0 border-0 bg-transparent after:bg-[var(--path-lever-color)] after:absolute after:top-0 after:left-0 after:h-[57px] after:rounded-[50%_50%] after:z-[0] after:w-full after:shadow-[0_8px_0_rgba(0,0,0,.2),0_8px_0_var(--path-lever-color)] hover:after:shadow-[0_6.5px_0_rgba(0,0,0,.2),0_6.5px_0_var(--path-lever-color)] active:after:shadow-none`, {})}>
                                <div className="absolute left-1/2 -translate-x-1/2 top-[11.5px] w-[42px] h-[34px] z-[1]">
                                    <Image src={imageSrc} alt={""} fill />
                                </div>
                            </button>
                        </CircularProgressbarWithChildren>
                    </div>
                ) : (
                    <button type="button" onClick={handleButtonClick} className={cn(`relative z-[1] h-[65px] w-[70px] p-0 cursor-pointer hover:translate-y-[1.5px] active:translate-y-[8px] duration-0 border-b-0 border-0 bg-transparent after:bg-[var(--path-lever-color)] after:absolute after:top-0 after:left-0 after:h-[57px] after:rounded-[50%_50%] after:z-[0] after:w-full after:shadow-[0_8px_0_rgba(0,0,0,.2),0_8px_0_var(--path-lever-color)] hover:after:shadow-[0_6.5px_0_rgba(0,0,0,.2),0_6.5px_0_var(--path-lever-color)] active:after:shadow-none`, {})}>
                        <div className="absolute left-1/2 -translate-x-1/2 top-[11.5px] w-[42px] h-[34px] z-[1]">
                            <Image src={imageSrc} alt={""} fill />
                        </div>
                    </button>
                )}

                <LessonPopover active={active} href={href} locked={locked} activeLevel={activeLevel} totalCount={levels.length} />
            </div>
        </div>
    );
};

export default LessonButton;
