"use client";
import { challengeParts } from "@/db/schema";
import { cn } from "@/lib/utils";
import React from "react";
type Option = typeof challengeParts.$inferSelect;

type Props = {
    disable: boolean;
    options: Option[];
    disabledButtons: number[];
    status: "none" | "correct" | "wrong";
    onClick: (opt: Option, event: React.MouseEvent<HTMLButtonElement>) => void;
    onDragStart: (opt: Option, event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
};

const MatchContent = ({ disable, status, options, disabledButtons, onClick, onDragStart, className }: Props) => {
    return (
        <>
            {options.map((option) => (
                <div className="mx-1 h-[60px] inline-flex flex-col justify-center" key={option.text}>
                    <span className="flex flex-col">
                        <button
                            onClick={(e) => {
                                if (disable) return;
                                onClick(option, e);
                            }}
                            draggable={status === "none"}
                            onDragStart={(e) => onDragStart(option, e)}
                            type="button"
                            disabled={disabledButtons.includes(option.id)}
                            className={cn(
                                "disabled:pointer-events-none disabled:cursor-default before:disabled:shadow-none before:disabled:bg-disable disabled:text-disable bg-background flex-[1] outline-none cursor-pointer inline-flex relative p-[12px_16px] border-2 border-b-4 active:border-b-0 rounded-[12px] before:absolute before:-top-[2px] before:-left-[2px] before:-right-[2px] before:-bottom-[2px] before:bg-background before:border-2 before:rounded-[12px] before:border-b-[-2px] before:shadow-[0_2px_0_var(--border)] active:before:shadow-none",
                                {
                                    "cursor-default": status !== "none",
                                },
                                className
                            )}
                        >
                            <span className="relative inline-flex justify-center w-full items-center">
                                <span className="text-[calc(var(--type-base-size)+1px)] leading-[22px]">{option.text}</span>
                            </span>
                        </button>
                    </span>
                </div>
            ))}
        </>
    );
};

export default React.memo(MatchContent);
