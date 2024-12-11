"use client";
import { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import React from "react";
import { useAudio } from "react-use";
import animationData from "@/public/animation/voice.json";
import { ArrowQuestion } from "@/components/icons";
import LottieWrapper from "@/components/global/lottie-wrapper";

type Props = {
    question?: string | null;
    audioSrc?: string | null;
};

const QuestionConversation = ({ audioSrc, question }: Props) => {
    const lottieRef = React.useRef<LottieRefCurrentProps>(null);

    const [audio, _, controls] = useAudio({
        src: audioSrc || "/audio/none.mp3",
        autoPlay: false,
    });

    const handlePlay = React.useCallback(() => {
        if (audioSrc) {
            lottieRef.current?.play();
            controls.play();
        }
    }, [controls, audio, lottieRef]);

    const handleCompleted = React.useCallback(() => {
        const totalFrames = animationData.op;
        lottieRef.current?.goToAndStop(totalFrames, false);
    }, [controls]);

    return (
        <div className="grid gap-2">
            <div className="mr-[20%]">
                <div className="flex flex-row items-start">
                    <Image src={"/images/lucy_avatar_icon.svg"} width={64} height={67} alt="" className="mr-4" />
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
                                                    <LottieWrapper lottieRef={lottieRef} animationData={animationData} loop={false} onComplete={handleCompleted} />
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
            <div className="ml-[20%]">
                <div className="flex items-start justify-end">
                    <div className="inline-flex">
                        <div className="relative">
                            <div className="border-2 rounded-[12px] p-[10px_14px] bg-background min-h-[56px]">
                                <span className="inline-flex border-b-2 border-muted-foreground align-bottom">
                                    <span className="w-[70px] inline-flex" />
                                </span>
                            </div>
                            <ArrowQuestion
                                className="w-[18px] h-5 text-background absolute -right-4 top-3 "
                                style={{
                                    scale: "-1 1",
                                }}
                            />
                        </div>
                    </div>
                    <Image src={"/images/lily_avatar_icon.svg"} width={64} height={67} alt="" className="ml-4" />
                </div>
            </div>
        </div>
    );
};

export default React.memo(QuestionConversation);
