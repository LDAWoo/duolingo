"use client";
import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import React from "react";
import Card from "./card";
type Props = {
    options: (typeof challengeOptions.$inferSelect)[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption: number | null;
    disable: boolean;
    type?: (typeof challenges.$inferSelect)["type"];
};

const Challenge = ({ options, onSelect, status, selectedOption, disable, type }: Props) => {
    return (
        <div
            className={cn("grid gap-2", {
                "grid-cols-1": type === "ASSIST",
                "grid-cols-[min-content,1fr)] device:grid-cols-[repeat(2,1fr)]": type === "LISTEN" || type === "CONVERSATION",
                "grid-cols-[repeat(2,1fr)] device:grid-cols-[repeat(auto-fit,minmax(0,1fr))]": type === "SELECT",
            })}
        >
            {options.map((option, index) => (
                <Card key={index} id={option.id} text={option.text} index={index} length={options.length} imageSrc={option.imageSrc} shortcut={`${index + 1}`} selected={selectedOption === option.id} onClick={() => onSelect(option.id)} status={status} audioSrc={option.audioSrc} disable={disable} type={type} />
            ))}
        </div>
    );
};

export default Challenge;
