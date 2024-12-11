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
        <div className="flex items-center gap-x-4 mb-6">
            {imageSrc && <Image src={imageSrc} height={180} width={180} alt="" />}
            <div className="flex flex-row items-center flex-[1]">
                {!question && audioSrc && (
                    <div className="flex items-center justify-center flex-[1]">
                        <Button onClick={handlePlay} variant={"primary"} className="w-[100px] h-[100px] rounded-[25%] before:rounded-[25%]">
                            <div
                                style={{
                                    "--path-speaker-color": "hsl(var(--background))",
                                }}
                            >
                                <LottieWrapper lottieRef={lottieRef} animationData={animationData} loop={false} onComplete={handleCompleted} />
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
    );
};

export default QuestionBubble;
