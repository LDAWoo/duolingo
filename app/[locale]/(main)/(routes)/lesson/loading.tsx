import LottieWrapper from "@/components/global/lottie-wrapper";
import React from "react";

import animationData from "@/public/animation/loading.json";

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-background">
            <div className="flex items-center justify-center w-full h-full">
                <div className="p-4 flex flex-col items-center justify-center max-w-[352px] text-center">
                    <div className="w-[150px] h-[177px] mb-6 inline-flex">
                        <LottieWrapper animationData={animationData} />
                    </div>
                    <span className="font-bold text-[calc(var(--type-base-size)-1px)] text-muted-foreground uppercase">Đang tải...</span>
                    <span className="text-[calc(var(--type-base-size)-1px)] text-foreground mt-3 font-medium">Duolingo có các bài học phù hợp với người mới học, người học tầm trung và cả người học nâng cao!</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
