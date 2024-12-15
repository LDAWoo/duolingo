"use client";

import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/hooks/use-exit-modal";
import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import LottieWrapper from "@/components/global/lottie-wrapper";
import animationData from "@/public/animation/circle.json";
import { cn } from "@/lib/utils";

type Props = {
    status: "correct" | "wrong" | "none";
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
};

const Header = ({ status, hearts, percentage, hasActiveSubscription }: Props) => {
    const [shouldPlayLottie, setShouldPlayLottie] = React.useState(false);
    const { onOpen } = useExitModal();

    const handleProgressComplete = () => {
        if (status === "correct") {
            setShouldPlayLottie(true);
        }
    };

    const handleLottieCompleted = () => {
        setShouldPlayLottie(false);
    };

    return (
        <header className="pt-6 px-4 gap-5 lg:gap-6 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <div onClick={onOpen} className="cursor-pointer">
                <Image src={"/close.svg"} alt="" width={18} height={18} />
            </div>
            <div className="relative flex-1">
                <Progress
                    value={percentage}
                    onComplete={handleProgressComplete}
                    className={cn("bg-secondary fill-secondary stroke-secondary", {
                        "bg-bee fill-bee stroke-bee": percentage >= 40,
                        "bg-fox fill-fox stroke-fox": percentage >= 60,
                    })}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-full w-[60px] h-[60px] z-10">
                        {shouldPlayLottie && (
                            <div>
                                <LottieWrapper animationData={animationData} onComplete={handleLottieCompleted} loop={false} />
                            </div>
                        )}
                    </div>
                </Progress>
            </div>
            <div
                className={cn("text-rose-500 flex items-center font-bold", {
                    "text-disable-foreground": hearts === 0,
                })}
            >
                <Image src={hearts === 0 ? "/hearts-disable.svg" : "/hearts.svg"} alt="" width={32} height={32} />
                {hasActiveSubscription ? (
                    <div>
                        <InfinityIcon className="h-6 w-6 stroke-[3]" />
                    </div>
                ) : (
                    <span className="text-[calc(var(--type-base-size)-1px)] ml-[3px]">{hearts}</span>
                )}
            </div>
        </header>
    );
};

export default React.memo(Header);
