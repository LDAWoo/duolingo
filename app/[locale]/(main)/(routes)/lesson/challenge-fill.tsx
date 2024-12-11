"use client";
import { challengeParts } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Portal } from "@radix-ui/react-portal";
import React from "react";
import { useAudio } from "react-use";

type Option = typeof challengeParts.$inferSelect;

type Status = "correct" | "wrong" | "none";

type Props = {
    question?: string | null;
    imageSrc?: string | null;
    options: Option[];
    onSelectOption: (options: (typeof challengeParts.$inferSelect)[]) => void;
    status: Status;
};

const ChallengeFill = ({ question, imageSrc, options, status, onSelectOption }: Props) => {
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

    const optionRef = React.useRef<HTMLDivElement | null>(null);
    const resultRef = React.useRef<HTMLDivElement | null>(null);
    const [disabledButton, setDisabledButton] = React.useState<number | null>(null);
    const [result, setResult] = React.useState<Option | null>(null);
    const duration = 300;

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

    const renderFillInTheBlank = React.useMemo(() => {
        if (!question) return null;

        const blanks = question.match(/{{\w+}}/g) || [];

        return question.split(/{{\w+}}/).map((text, index) => (
            <React.Fragment key={index}>
                {text && <span className="text-[calc(var(--type-base-size)+1px)]">{text}</span>}
                {index < blanks.length && (
                    <div className="inline-flex mb-[5px] mt-[5px] align-middle mr-1">
                        <span className="inline-flex align-bottom m-[0_3px_-2px] border-b-2 border-muted-foreground">
                            <div ref={resultRef} className="grid mb-[2px]">
                                {options.map((option, idx) => (
                                    <span
                                        key={idx}
                                        className={cn("col-[1] row-[1] justify-self-center invisible", {
                                            visible: result?.id === option.id,
                                        })}
                                    >
                                        <span className="inline-flex flex-col">
                                            <button
                                                onClick={(e) => {
                                                    if (animationState?.visible) return;
                                                    const currentResult = options.find((option) => option.id === result?.id) || null;
                                                    handleResultClick(currentResult, e);
                                                }}
                                                type="button"
                                                className="bg-background flex-[1] outline-none cursor-pointer inline-flex relative p-[12px_16px] border-2 border-b-4 active:border-b-0 active:translate-y-[2px] rounded-[12px] before:absolute before:-top-[2px] before:-left-[2px] before:-right-[2px] before:-bottom-[2px] before:bg-background before:border-2 before:rounded-[12px] before:border-b-[-2px] before:shadow-[0_2px_0_var(--border)] active:before:shadow-none"
                                            >
                                                <span className="relative inline-flex justify-center w-full items-center">
                                                    <span className="text-[calc(var(--type-base-size)+1px)] leading-[22px]">{option.text}</span>
                                                </span>
                                            </button>
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </span>
                    </div>
                )}
            </React.Fragment>
        ));
    }, [question, options, result, animationState]);

    const handleResultClick = React.useCallback(
        (option: Option | null, event: React.MouseEvent<HTMLButtonElement>) => {
            if (status !== "none") return;
            if (!option) return;

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

                setResult(null);
                setTimeout(() => {
                    setDisabledButton(null);
                    setAnimationState(null);
                }, duration);
            }
        },
        [status, options, result]
    );

    const handleOptionClick = React.useCallback(
        (option: Option, event: React.MouseEvent<HTMLButtonElement>) => {
            if (status !== "none") return;
            handleAudioPlay(option?.audioSrc);

            if (result) return;

            const buttonRect = event.currentTarget.getBoundingClientRect();
            const resultRect = resultRef.current?.getBoundingClientRect();

            if (resultRect) {
                setDisabledButton(option.id);
                const startX = buttonRect.left;
                const startY = buttonRect.top;

                let endX = resultRect.left + resultRect.width / 2 - buttonRect.width / 2;
                let endY = resultRect.top;

                setAnimationState({
                    visible: true,
                    start: { x: startX, y: startY },
                    end: { x: endX, y: endY },
                    text: option.text,
                });

                setTimeout(() => {
                    setResult(option);
                    setAnimationState(null);
                }, duration);
            }
        },
        [status, result, handleAudioPlay]
    );

    React.useEffect(() => {
        onSelectOption(options.filter((option) => option.id === result?.id));
    }, [result]);

    React.useEffect(() => {
        if (ref?.current) {
            ref.current.load();
        }
    }, []);

    React.useEffect(() => {
        if (status === "none") {
            setResult(null);
            setDisabledButton(null);
        }
    }, [status]);

    return (
        <>
            {audio}
            <div className="grid gap-4 device:gap-8 grid-flow-col-[repeat(2,min-content)] device:grid-cols-[min-content,1fr] items-center">
                {imageSrc && (
                    <div
                        className={`mx-auto w-[180px] h-[180px] bg-no-repeat bg-contain bg-center`}
                        style={{
                            backgroundImage: `url(${imageSrc})`,
                        }}
                    />
                )}

                {question && <div className="leading-[39px] text-inherit">{renderFillInTheBlank}</div>}

                <div className="col-[1/-1]">
                    <div ref={optionRef} className="flex justify-center flex-wrap w-full">
                        {options.map((option) => (
                            <div className="h-[60px] mx-1 inline-flex flex-col justify-center" key={option.text}>
                                <span className="flex flex-col">
                                    <button
                                        onClick={(e) => {
                                            if (animationState?.visible) return;
                                            handleOptionClick(option, e);
                                        }}
                                        type="button"
                                        disabled={disabledButton === option.id}
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
                            className={cn("fixed animate-fly top-0 left-0 z-[9999] pointer-events-none ")}
                            style={{
                                transform: `translate(${animationState.start.x}px, ${animationState.start.y}px)`,
                                "--start-x": `${animationState.start.x}px`,
                                "--start-y": `${animationState.start.y}px`,
                                "--end-x": `${animationState.end?.x}px`,
                                "--end-y": `${animationState.end?.y}px`,
                            }}
                        >
                            <button type="button" className={cn("flex-[1] bg-background outline-none cursor-pointer inline-flex p-[12px_16px] border-2 border-b-4 rounded-[12px]")}>
                                <span className="relative inline-flex justify-center w-full items-center">
                                    <span className="text-[calc(var(--type-base-size)+1px)] leading-[22px]">{animationState.text}</span>
                                </span>
                            </button>
                        </div>
                    </Portal>
                )}
            </div>
        </>
    );
};

export default React.memo(ChallengeFill);
