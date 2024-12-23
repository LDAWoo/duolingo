"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import animationData from "@/public/animation/voice.json";
import LottieWrapper from "@/components/global/lottie-wrapper";
import { useAudio } from "react-use";
import { LottieRefCurrentProps } from "lottie-react";

type Props = {
    audioSrc?: string | null;
};

const QuestionAudio = ({ audioSrc }: Props) => {
    const lottieRef = React.useRef<LottieRefCurrentProps>(null);

    const [audio, _, __, ref] = useAudio({
        src: audioSrc || "/audio/none.mp3",
        autoPlay: false,
    });

    const handlePlay = React.useCallback(() => {
        if (ref.current) {
            ref.current.pause();
            ref.current.currentTime = 0;

            if (audioSrc) {
                ref.current.src = audioSrc;
                ref.current.load();
                lottieRef.current?.play();
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
    }, []);

    React.useEffect(() => {
        lottieRef.current?.goToAndStop(800, false);
    }, [lottieRef.current]);

    return (
        <div className="mx-auto mb-5 device:mb-0">
            <div className="hidden">{audio}</div>
            <Button onClick={handlePlay} variant={"primary"} className="w-[100px] h-[100px] device:w-[140px] device:h-[140px] rounded-[25%] before:rounded-[25%]">
                <div
                    style={{
                        "--path-speaker-color": "hsl(var(--background))",
                    }}
                >
                    <LottieWrapper lottieRef={lottieRef} animationData={animationData} loop={false} />
                </div>
            </Button>
        </div>
    );
};

export default React.memo(QuestionAudio);
