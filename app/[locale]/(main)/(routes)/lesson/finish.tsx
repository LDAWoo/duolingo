"use client";
import LottieWrapper from "@/components/global/lottie-wrapper";
import React from "react";

import animatedData from "@/public/animation/finish-oscar.json";
import CardFinish from "./card-finish";
import { useAudio } from "react-use";

type Props = {
    exp: number;
    points: number;
    totalCompleted: number;
};

const Finish = ({ points, exp, totalCompleted }: Props) => {
    const [audio] = useAudio({
        src: "/audio/finish.mp3",
        autoPlay: true,
        loop: false,
    });

    return (
        <div className="flex-1 p-[24px_16px]">
            <div className="flex items-center flex-col text-center justify-center relative h-full">
                <div className="select-none">
                    <div className="h-[45vh] inline-block">
                        <LottieWrapper animationData={animatedData} />
                    </div>
                </div>
                <div className="m-[20px_0]">
                    <div className="mt-5 text-bee font-bold text-[calc(var(--type-base-size)+6px)] device:text-[calc(var(--type-base-size)+14px)]">Hoàn thành bài học!</div>
                    {totalCompleted && <div className="text-muted-foreground text-[calc(var(--type-base-size)+1px)]">Bạn đã hoàn thành {totalCompleted} thử thách nghe trong bài học này</div>}
                </div>

                <div className="flex gap-[10px] device:gap-4">
                    <CardFinish variant="experiences" value={exp} />
                    <CardFinish variant="points" value={points} duration={2} />
                </div>

                <div className="hidden">{audio}</div>
            </div>
        </div>
    );
};

export default React.memo(Finish);
