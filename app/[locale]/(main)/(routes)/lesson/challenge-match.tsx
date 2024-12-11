"use client";
import { challengeParts } from "@/db/schema";
import React from "react";
import { Portal } from "@radix-ui/react-portal";
import { cn } from "@/lib/utils";
import { useAudio } from "react-use";

type Option = typeof challengeParts.$inferSelect;

type Status = "correct" | "wrong" | "none";

type Props = {
    options: Option[];
    onSelectOption: (options: (typeof challengeParts.$inferSelect)[]) => void;
    status: Status;
    type: "MATCH" | null;
};

const ChallengeMatch: React.FC<Props> = ({ status, options, onSelectOption }) => {
    const [animationState, setAnimationState] = React.useState<{
        visible: boolean;
        start: { x: number; y: number };
        end: { x: number; y: number };
        text: string;
    } | null>(null);

    const [audio, _, __, ref] = useAudio({
        src: "/audio/none.mp3",
        autoPlay: false,
    });

    const duration = 300;
    const [dragging, setDragging] = React.useState(false);
    const [results, setResults] = React.useState<Option[]>([]);
    const resultContainerRef = React.useRef<HTMLDivElement | null>(null);
    const optionContainerRef = React.useRef<HTMLDivElement | null>(null);
    const resultRef = React.useRef<HTMLDivElement | null>(null);
    const optionRef = React.useRef<HTMLDivElement | null>(null);
    const [disabledButtons, setDisabledButtons] = React.useState<number[]>([]);

    const handleAudioPlay = (audioSrc: string | null) => {
        if (ref.current && audioSrc) {
            ref.current.src = audioSrc;
            ref.current.load();

            ref.current.oncanplay = () => {
                ref.current?.play().catch((error) => {
                    console.error("Error during audio playback:", error);
                });
            };
        }
    };

    const handleOptionClick = (option: Option, event: React.MouseEvent<HTMLButtonElement>) => {
        if (status !== "none") return;
        if (dragging) return;
        handleAudioPlay(option?.audioSrc);
        const buttonRect = event.currentTarget.getBoundingClientRect();
        const containerResultRect = resultContainerRef.current?.getBoundingClientRect();
        const resultRect = resultRef.current?.getBoundingClientRect();
        const margin = 4;

        if (resultRect && containerResultRect) {
            setDisabledButtons((prev) => [...prev, option.id]);

            const startX = buttonRect.left;
            const startY = buttonRect.top;

            let endX = resultRect.left + resultRect.width + margin;
            let endY = resultRect.top + margin;

            setAnimationState({
                visible: true,
                start: { x: startX, y: startY },
                end: { x: endX, y: endY },
                text: option.text,
            });

            setTimeout(() => {
                setResults((prev) => [...prev, option]);
                setAnimationState(null);
            }, duration);
        }
    };

    const handleResultClick = (option: Option, event: React.MouseEvent<HTMLButtonElement>) => {
        if (status !== "none") return;
        if (dragging) return;
        handleAudioPlay(option?.audioSrc);
        const resultRect = event.currentTarget.getBoundingClientRect();
        const optionIndex = options.findIndex((opt) => opt.id === option.id);
        const optionElement = document.querySelectorAll(".option-button")[optionIndex];

        if (optionElement) {
            const optionRect = optionElement.getBoundingClientRect();

            setAnimationState({
                visible: true,
                start: { x: resultRect.left, y: resultRect.top },
                end: { x: optionRect.left, y: optionRect.top },
                text: option.text,
            });

            setResults((prev) => prev.filter((result) => result.id !== option.id));
            setTimeout(() => {
                setDisabledButtons((prev) => prev.filter((id) => id !== option.id));
                setAnimationState(null);
            }, duration);
        }
    };

    const handleDragStartResult = (option: Option, event: React.MouseEvent<HTMLButtonElement>) => {
        if (status !== "none") return;
        event.preventDefault();
        handleAudioPlay(option?.audioSrc);
        const { clientX, clientY } = event;

        const resultRect = event.currentTarget.getBoundingClientRect();
        const optionIndex = options.findIndex((opt) => opt.id === option.id);
        const optionElement = document.querySelectorAll(".option-button")[optionIndex];

        const startX = resultRect.left;
        const startY = resultRect.top;

        const offsetX = startX - clientX;
        const offsetY = startY - clientY;

        setAnimationState({
            visible: false,
            start: { x: startX, y: startY },
            text: option.text,
            end: {
                x: startX,
                y: startY,
            },
        });

        const handleMouseMove = (e: MouseEvent) => {
            setDragging(true);

            setResults((prev) => prev.filter((result) => result.id !== option.id));
            setAnimationState((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    visible: true,
                    start: { x: e.clientX + offsetX, y: e.clientY + offsetY },
                };
            });

            // const mouseX = e.clientX;
            // const mouseY = e.clientY;

            // const optionRect = optionElement.getBoundingClientRect();

            // const hoveredButton = results.find((result) => {
            //     const button = document.getElementById(result.id.toString());

            //     if (button) {
            //         const rect = button.getBoundingClientRect();
            //         return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
            //     }
            //     return false;
            // });

            // const existingDiv = document.querySelector(`#hoverDiv-${hoveredButton?.id}`);

            // if (hoveredButton) {
            //     if (!existingDiv) {
            //         const newDiv = document.createElement("div");
            //         newDiv.id = `hoverDiv-${hoveredButton.id}`;
            //         newDiv.style.width = `${optionRect.width}px`;
            //         newDiv.style.height = "60px";

            //         const button = document.getElementById(hoveredButton.id.toString());
            //         if (button) {
            //             button.insertAdjacentElement("beforebegin", newDiv);
            //         }
            //     }
            // } else {
            //     const allDivs = document.querySelectorAll("[id^='hoverDiv-']");
            //     allDivs.forEach((div) => {
            //         div.remove();
            //     });
            // }
        };

        const handleMouseUp = (e: MouseEvent) => {
            setDragging(false);
            const containerOptionRect = optionContainerRef.current?.getBoundingClientRect();

            if (containerOptionRect && optionElement) {
                const optionRect = optionElement.getBoundingClientRect();

                const endX = optionRect.left;
                const endY = optionRect.top;

                if (e.clientX > containerOptionRect.left && e.clientX < containerOptionRect.right && e.clientY > containerOptionRect.top && e.clientY < containerOptionRect.bottom) {
                    setAnimationState((prev) => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            end: {
                                x: endX,
                                y: endY,
                            },
                        };
                    });
                    setTimeout(() => {
                        setDisabledButtons((prev) => prev.filter((id) => id !== option.id));
                        setAnimationState(null);
                    }, duration);
                } else {
                    setTimeout(() => {
                        setResults((prev) => [...prev, option]);
                        setAnimationState(null);
                    }, duration);
                }
            }

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleDragStartOption = (option: Option, event: React.MouseEvent<HTMLButtonElement>) => {
        if (status !== "none") return;
        event.preventDefault();
        handleAudioPlay(option?.audioSrc);
        const { clientX, clientY } = event;
        const buttonRect = event.currentTarget.getBoundingClientRect();

        const startX = buttonRect.left;
        const startY = buttonRect.top;
        const offsetX = startX - clientX;
        const offsetY = startY - clientY;
        const margin = 4;

        setAnimationState({
            visible: false,
            start: { x: startX, y: startY },
            text: option.text,
            end: {
                x: startX,
                y: startY,
            },
        });

        const handleMouseMove = (e: MouseEvent) => {
            setDragging(true);
            setDisabledButtons((prev) => [...prev, option.id]);
            setAnimationState((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    visible: true,
                    start: { x: e.clientX + offsetX, y: e.clientY + offsetY },
                };
            });
        };

        const handleMouseUp = (e: MouseEvent) => {
            setDragging(false);
            const containerResultRect = resultContainerRef.current?.getBoundingClientRect();
            const resultRect = resultRef.current?.getBoundingClientRect();

            if (containerResultRect && resultRect) {
                const endX = resultRect.left + resultRect.width + margin;
                const endY = resultRect.top + margin;

                if (e.clientX > containerResultRect.left && e.clientX < containerResultRect.right && e.clientY > containerResultRect.top && e.clientY < containerResultRect.bottom) {
                    setAnimationState((prev) => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            end: {
                                x: endX,
                                y: endY,
                            },
                        };
                    });
                    setTimeout(() => {
                        setResults((prev) => [...prev, option]);
                        setDisabledButtons((prev) => [...prev, option.id]);
                        setAnimationState(null);
                    }, duration);
                } else {
                    if (e.clientX > containerResultRect.left && e.clientX < containerResultRect.right && e.clientY > containerResultRect.top && e.clientY < containerResultRect.bottom) {
                        setAnimationState((prev) => {
                            if (!prev) return null;
                            return {
                                ...prev,
                                end: {
                                    x: endX,
                                    y: endY,
                                },
                            };
                        });
                        setTimeout(() => {
                            setResults((prev) => [...prev, option]);
                            setDisabledButtons((prev) => [...prev, option.id]);
                            setAnimationState(null);
                        }, duration);
                    } else {
                        setTimeout(() => {
                            setDisabledButtons((prev) => prev.filter((id) => id !== option.id));
                            setAnimationState(null);
                        }, duration);
                    }
                }
            }

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    React.useEffect(() => {
        onSelectOption(results);
    }, [results]);

    React.useEffect(() => {
        if (ref?.current) {
            ref.current.load();
        }
    }, []);

    React.useEffect(() => {
        if (status === "none") {
            setResults([]);
            setDisabledButtons([]);
        }
    }, [status]);

    return (
        <div className="min-h-[170px] h-full flex flex-col self-start">
            {audio}
            <div
                className="grid text-inherit content-start gap-8 border-t-2 h-full"
                style={{
                    gridAutoRows: "1fr",
                }}
            >
                <div className="relative">
                    <div className="absolute h-full w-full">
                        <div className="relative w-full h-full">
                            <div ref={resultContainerRef} className="overflow-hidden w-full h-full">
                                {options.map((option, index) => (
                                    <div className="h-[60px] w-full border-b-2" key={option.id} id={`result-${index}`} />
                                ))}
                                <div ref={resultRef} className="absolute top-0 z-0 flex flex-wrap">
                                    {results.map((result) => (
                                        <div id={result.id.toString()} className="mx-1 h-[60px] inline-flex flex-col justify-center" key={result.id}>
                                            <span className="inline-flex flex-col">
                                                <button
                                                    onClick={(e) => {
                                                        if (animationState?.visible) return;
                                                        handleResultClick(result, e);
                                                    }}
                                                    draggable={status === "none"}
                                                    onDragStart={(e) => handleDragStartResult(result, e)}
                                                    type="button"
                                                    className={cn("flex-[1] cursor-pointer duration-500 inline-flex relative p-[12px_16px] border-2 border-b-4 active:border-b-0 rounded-[12px] before:absolute before:-top-[2px] before:-left-[2px] before:-right-[2px] before:-bottom-[2px] before:bg-background before:border-2 before:rounded-[12px] before:border-b-[-2px] before:shadow-[0_2px_0_var(--border)] active:before:shadow-none", {
                                                        "cursor-default": status !== "none",
                                                    })}
                                                >
                                                    <span className="relative inline-flex justify-center w-full items-center">
                                                        <span className="text-[calc(var(--type-base-size)+1px)] leading-[22px]">{result.text}</span>
                                                    </span>
                                                </button>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={optionContainerRef} className="flex flex-wrap justify-center">
                    <div ref={optionRef} className="flex justify-center flex-wrap w-full">
                        {options.map((option) => (
                            <div className="h-[60px] mx-1 inline-flex flex-col justify-center" key={option.text}>
                                <span className="flex flex-col">
                                    <button
                                        onClick={(e) => {
                                            if (animationState?.visible) return;
                                            handleOptionClick(option, e);
                                        }}
                                        draggable={status === "none"}
                                        onDragStart={(e) => handleDragStartOption(option, e)}
                                        type="button"
                                        disabled={disabledButtons.includes(option.id)}
                                        className={cn("option-button disabled:pointer-events-none disabled:cursor-default before:disabled:shadow-none before:disabled:bg-disable disabled:text-disable bg-background flex-[1] outline-none cursor-pointer inline-flex relative p-[12px_16px] border-2 border-b-4 active:border-b-0 rounded-[12px] before:absolute before:-top-[2px] before:-left-[2px] before:-right-[2px] before:-bottom-[2px] before:bg-background before:border-2 before:rounded-[12px] before:border-b-[-2px] before:shadow-[0_2px_0_var(--border)] active:before:shadow-none", {
                                            "cursor-default": status !== "none",
                                        })}
                                    >
                                        <span className="relative inline-flex justify-center w-full items-center">
                                            <span className="text-[calc(var(--type-base-size)+1px)] leading-[22px]">{option.text}</span>
                                        </span>
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {animationState?.visible && (
                    <Portal>
                        <div
                            className={cn("fixed top-0 left-0 z-[9999] pointer-events-none ", {
                                "animate-fly": !dragging,
                            })}
                            style={{
                                transform: `translate(${animationState.start.x}px, ${animationState.start.y}px)`,
                                "--start-x": `${animationState.start.x}px`,
                                "--start-y": `${animationState.start.y}px`,
                                "--end-x": `${animationState.end?.x}px`,
                                "--end-y": `${animationState.end?.y}px`,
                            }}
                        >
                            <button
                                type="button"
                                className={cn("flex-[1] bg-background outline-none cursor-pointer inline-flex p-[12px_16px] border-2 border-b-4 rounded-[12px]", {
                                    "!cursor-grabbing": dragging,
                                })}
                            >
                                <span className="relative inline-flex justify-center w-full items-center">
                                    <span className="text-[calc(var(--type-base-size)+1px)] leading-[22px]">{animationState.text}</span>
                                </span>
                            </button>
                        </div>
                    </Portal>
                )}
            </div>
        </div>
    );
};

export default React.memo(ChallengeMatch);
