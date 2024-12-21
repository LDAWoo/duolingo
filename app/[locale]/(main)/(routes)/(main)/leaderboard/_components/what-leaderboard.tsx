import React from "react";

import animationData from "@/public/animation/hard.json";
import LottieWrapper from "@/components/global/lottie-wrapper";

const WhatLeaderBoard = () => {
    return (
        <div className="flex items-center w-full md:w-[368px]">
            <div className="flex flex-col p-[18px] border-2 rounded-[16px]">
                <div className="uppercase text-muted-foreground text-[calc(var(--type-base-size)-3px)] mb-2 font-bold">BẢNG XẾP HẠNG LÀ GÌ?</div>

                <div className="grid grid-cols-[70%,30%]">
                    <div>
                        <div className="font-bold text-[calc(var(--type-base-size)+1px)] text-eel mb-2">Học tập. Kiếm KN. Thi đua.</div>
                        <div className="leading-[25px] text-[calc(var(--type-base-size)-1px)] text-wolf">Kiếm thật nhiều KN từ các bài học để thi đua với những người học khác trên bảng xếp hạng hằng tuần</div>
                    </div>

                    <div className="ml-2">
                        <LottieWrapper animationData={animationData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(WhatLeaderBoard);
