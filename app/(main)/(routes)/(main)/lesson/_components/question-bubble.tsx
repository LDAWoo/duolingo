"use client";
import LottieWrapper from "@/components/global/lottie-wrapper";
import { ArrowQuestion } from "@/components/icons";
import Image from "next/image";
import animationData from "@/public/animation/voice.json";
import { useAudio } from "react-use";
import React from "react";
import { LottieRefCurrentProps } from "lottie-react";
import { Button } from "@/components/ui/button";

type Props = {
    question?: string | null;
    audioSrc?: string | null;
    imageSrc?: string | null;
};

const QuestionBubble = ({ question, audioSrc, imageSrc }: Props) => {
    const lottieRef = React.useRef<LottieRefCurrentProps>(null);

    const [audio, _, __, ref] = useAudio({
        src: "/audio/none.mp3",
        autoPlay: false,
    });

    const handlePlay = React.useCallback(() => {
        if (!audioSrc) return;
        if (ref.current) {
            ref.current.pause();
            ref.current.currentTime = 0;

            if (audioSrc) {
                ref.current.src = audioSrc;
                ref.current.load();
                ref.current.oncanplay = () => {
                    ref.current?.play();
                };
            }
        }
    }, [ref, audioSrc]);

    React.useEffect(() => {
        if (ref.current) {
            ref.current.load();

            if (audioSrc) {
                ref.current.oncanplay = () => {
                    ref.current?.play();
                };
            }
        }
    }, [audioSrc]);

    React.useEffect(() => {
        lottieRef.current?.goToAndStop(800, false);
    }, [lottieRef.current]);

    return (
        <div className="flex items-center gap-x-4 mb-6">
            {imageSrc && (
                <div className="aspect-[118/180] relative w-[30%] flex-shrink-0">
                    <Image src={imageSrc} fill alt="" />
                </div>
            )}
            <div className="flex flex-row items-center flex-[1]">
                {!question && audioSrc && (
                    <div className="flex items-center justify-center flex-[1]">
                        <Button onClick={handlePlay} variant={"primary"} className="w-[100px] h-[100px] rounded-[25%] before:rounded-[25%]">
                            <div
                                style={{
                                    "--path-speaker-color": "hsl(var(--background))",
                                }}
                            >
                                <LottieWrapper lottieRef={lottieRef} animationData={animationData} loop={false} />
                            </div>
                        </Button>
                    </div>
                )}
                {question && (
                    <div className="inline-flex flex-col gap-2 my-3 ml-4">
                        <div className="relative">
                            <div className="border-2 rounded-[12px] p-[10px_14px] bg-background ">
                                <div className="flex items-center w-full text-[calc(var(--type-base-size)+2px)]">
                                    {audioSrc && (
                                        <>
                                            <div
                                                onClick={handlePlay}
                                                className="w-[28px] h-[22px] mr-2 cursor-pointer hover:opacity-80"
                                                style={{
                                                    "--path-speaker-color": "hsl(var(--primary-foreground))",
                                                }}
                                            >
                                                <LottieWrapper lottieRef={lottieRef} animationData={animationData} loop={false} />
                                            </div>
                                        </>
                                    )}
                                    <span className="leading-[28px]"> {question}</span>
                                </div>
                            </div>
                            <ArrowQuestion className="w-[18px] h-5 text-background absolute -left-4 top-3" />
                        </div>
                    </div>
                )}
                <div className="hidden">{audio}</div>
            </div>
        </div>
    );
};

export default QuestionBubble;
