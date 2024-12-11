"use client";
import { useAudio, useKey } from "react-use";
import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    id: number;
    index: number;
    length: number;
    imageSrc: string | null;
    audioSrc?: string | null;
    text: string;
    shortcut: string;
    selected: boolean;
    onClick: () => void;
    disable: boolean;
    status: "correct" | "wrong" | "none";
    type?: (typeof challenges.$inferSelect)["type"];
};

const Card = ({ id, index, length, imageSrc, audioSrc, text, shortcut, selected, onClick, disable, status, type }: Props) => {
    const [audio, _, controls] = useAudio({
        src: audioSrc || "/audio/none.mp3",
    });

    const handleClick = React.useCallback(() => {
        if (disable) return;

        controls.play();
        onClick();
    }, [disable, onClick, controls]);

    useKey(shortcut, handleClick, {}, [handleClick]);

    return (
        <div
            onClick={handleClick}
            className={cn("border-[rgb(229, 229,229)] relative inline-flex outline-none select-none rounded-[12px] border-2 border-b-4 border-transparent cursor-pointer active:translate-y-[2px] p-3 before:absolute -before:z-[1] before:-top-[2px] before:-left-[2px] before:-right-[2px] before:-bottom-[2px] before:border-2 before:rounded-[12px] before:bg-background hover:before:bg-[rgb(247,247,247)] before:shadow-[0_2px_0_#E5E5E5] active:before:shadow-none", {
                "before:border-[rgb(132,216,255)] before:shadow-[0_2px_0_rgb(132,216,255)]": selected,
                "border:-[rgb(132,216,255)] before:border-[rgb(132,216,255)] before:shadow-[0_2px_0_rgb(132,216,255)]": selected && status === "wrong",
                "before:bg-[rgb(215,255,184)] hover:before:bg-[rgb(215,255,184)] before:border-[rgb(165,237,110)] before:shadow-[0_2px_0_rgb(165,237,110)]": selected && status === "correct",
                "pointer-events-none hover:bg-transparent cursor-default": disable,
                "w-full": type === "ASSIST",
                "col-[1_/_span_2] m-[0_auto] w-[calc(50%_-_4px)] device:w-auto device:m-0 device:col-auto": index + 1 === 3 && length === 3 && type === "SELECT",
            })}
        >
            <div className="hidden">{audio}</div>
            <div className="flex flex-col flex-1 w-full relative z-0">
                {imageSrc && (
                    <div className="flex-1 w-full items-center flex justify-center">
                        <div
                            className={`w-full flex-1 h-[165px] device:h-[160px] bg-no-repeat bg-contain bg-center`}
                            style={{
                                backgroundImage: `url(${imageSrc})`,
                            }}
                        />
                    </div>
                )}

                <div
                    className={cn("flex items-center justify-between", {
                        "flex-row-reverse": type === "ASSIST" || type === "LISTEN" || type === "CONVERSATION",
                    })}
                >
                    {(type === "ASSIST" || type === "LISTEN" || type === "CONVERSATION") && <div />}
                    <span
                        className={cn("text-foreground mx-auto min-[700px]:mx-0 text-[calc(var(--type-base-size)+1px)]", {
                            "text-[rgb(24,153,214)]": selected,
                            "text-[rgb(89,168,2)]": selected && status === "correct",
                        })}
                    >
                        {text}
                    </span>
                    <span
                        className={cn("hidden min-[700px]:flex w-[30px] h-[30px] text-[rgb(175,175,175)] items-center justify-center text-[calc(var(--type-base-size)-3px)] font-bold rounded-[8px] border-2", {
                            "text-[rgb(24,153,214)] border-[rgb(132,216,255)]": selected,
                            "text-[rgb(89,168,2)] border-[rgb(165,237,110)]": selected && status === "correct",
                        })}
                    >
                        {shortcut}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
