"use client";
import { Button } from "@/components/ui/button";
import { levels } from "@/db/schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
    title: string;
    active: boolean;
    locked?: boolean;
    href: string;
    activeLevel: typeof levels.$inferSelect;
    totalCount: number;
};

const LessonPopover = ({ title, active, locked, href, totalCount, activeLevel }: Props) => {
    const popoverRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (active && popoverRef.current) {
                popoverRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                });
            }
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [active]);

    return (
        <div
            ref={popoverRef}
            className={cn("transform duration-300 origin-top absolute top-full left-1/2 -translate-x-1/2 z-[11] w-[295px] mt-2 select-none cursor-default", {
                "scale-100 opacity-100": active,
                "scale-0 opacity-0": !active,
                "mt-5": !locked,
            })}
        >
            <div className="absolute left-1/2 -top-[6px] w-5 h-3 transform -translate-x-1/2">
                <div
                    className={cn("absolute left-1/2 -translate-x-1/2 -rotate-45 w-[14px] h-[14px] border-r-2 border-t-2 bg-white", {
                        "bg-secondary border-none": !locked,
                    })}
                />
            </div>
            <div
                className={cn("p-4 text-[calc(var(--type-base-size)+1px)] leading-[1.4] font-bold bg-secondary text-white rounded-[15px]", {
                    "bg-white/90 text-disable-foreground border-2": locked,
                })}
            >
                <div>
                    <div>
                        <h1 className="">{title}</h1>
                    </div>
                    <p
                        className={cn("mt-2 font-normal", {
                            "mt-0 text-[calc(var(--type-base-size)-1px)]": !locked,
                        })}
                    >
                        {locked ? "Hãy hoàn thành tất cả các cấp độ phía trên để mở khóa nhé!" : activeLevel ? `Bài học ${activeLevel?.order}/${totalCount}` : "Chinh phục cấp độ Huyền thoại để chứng minh trình độ"}
                    </p>

                    <Link href={href}>
                        <Button
                            disabled={locked}
                            className={cn("w-full mt-2", {
                                "mt-4": !locked,
                            })}
                            size={"lg"}
                            variant={locked ? "locked" : "secondaryOutline"}
                        >
                            {locked ? "Khóa" : "Bắt đầu +10 KN"}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default React.memo(LessonPopover);
