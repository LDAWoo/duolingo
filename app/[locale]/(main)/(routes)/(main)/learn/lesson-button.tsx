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
    title: string;
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

const LessonButton = ({ id, index, title, order, totalCount, locked, current, backgroundColor, percentage, levels, activeLevel }: Props) => {
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
                        <div className="absolute left-1/2 -translate-x-1/2 top-[11.5px] w-[42px] h-[34px] z-[2]">
                            <Image src={imageSrc} alt={""} fill />
                        </div>
                        {/* {isComplete && (
                            <span className="absolute z-[1] top-[5px] left-[5px]">
                                <svg width="56" height="46" viewBox="0 0 56 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M34.2346 3.25135C35.3157 2.1269 34.7053 0.276787 33.1512 0.143156C32.0512 0.0485729 30.9331 0 29.8002 0C13.342 0 0 10.2517 0 22.8979C0 26.3985 1.02236 29.7157 2.85016 32.6827C3.47761 33.7012 4.88715 33.7751 5.71626 32.9128L34.2346 3.25135Z" fill="currentColor"></path>
                                    <path d="M55.0954 12.5231C53.3548 9.61289 49.8186 6.8733 47.2219 5.21074C46.2417 4.58319 44.9772 4.77038 44.1616 5.60066C34.5035 15.4328 18.3374 31.8498 12.05 38.0427C10.9724 39.1041 10.996 40.8688 12.249 41.716C16.2271 44.4058 20.9121 45.5851 23.4852 45.9072C24.1853 45.9949 24.8657 45.7259 25.3691 45.2315C34.775 35.9934 50.2041 19.9015 54.7166 15.0879C55.3787 14.3818 55.5923 13.3539 55.0954 12.5231Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        )} */}
                    </button>
                )}

                <LessonPopover title={title} active={active} href={href} locked={locked} activeLevel={activeLevel} totalCount={levels.length} />
            </div>
        </div>
    );
};

export default LessonButton;
