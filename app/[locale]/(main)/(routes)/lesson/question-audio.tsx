"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import animationData from "@/public/animation/voice.json";
import LottieWrapper from "@/components/global/lottie-wrapper";
import { useAudio } from "react-use";
import { LottieRefCurrentProps } from "lottie-react";

type Props = {
    question?: string | null;
    audioSrc?: string | null;
};

const QuestionAudio = ({ question, audioSrc }: Props) => {
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
    }, [controls, audioSrc]);

    const handleCompleted = React.useCallback(() => {
        const totalFrames = animationData.op;
        lottieRef.current?.goToAndStop(totalFrames, false);
    }, []);

    return (
        <div className="mx-auto mb-5 device:mb-0">
            <div className="hidden">{audio}</div>
            <Button onClick={handlePlay} variant={"primary"} className="w-[100px] h-[100px] device:w-[140px] device:h-[140px] rounded-[25%] before:rounded-[25%]">
                <div
                    style={{
                        "--path-speaker-color": "hsl(var(--background))",
                    }}
                >
                    <LottieWrapper lottieRef={lottieRef} animationData={animationData} loop={false} onComplete={handleCompleted} />
                </div>
            </Button>
        </div>
    );
};

export default React.memo(QuestionAudio);
