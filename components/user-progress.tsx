import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import HeaderSteak from "./header-steak";

type Props = {
    activeCourse: {
        title: string;
        imageSrc: string;
    };
    hearts: number;
    points: number;
    steaks: any;
    gems: number;
    hasActiveSubscription: boolean;
};

const UserProgress = ({ activeCourse, steaks, hasActiveSubscription, gems, hearts, points }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Button variant={"ghost"} className="cursor-default">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Image src={activeCourse.imageSrc} width={32} height={32} className="rounded-md" alt={activeCourse.title} />
                </div>
            </Button>

            <HoverCard openDelay={0}>
                <HoverCardTrigger asChild>
                    <Button variant={"ghost"} className="gap-0 cursor-default text-orange-500">
                        <div className="relative w-[23px] h-7 flex items-center justify-center">
                            <Image src={steaks?.currentSteak?.length > 0 ? "/steak-active.svg" : "/steak.svg"} width={23} height={28} className="rounded-md" alt="points" />
                        </div>
                        <span className="ml-2">{steaks ? steaks?.currentSteak?.length : 0}</span>
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-[384px] duration-0 overflow-hidden">
                    <HeaderSteak currentSteak={steaks?.currentSteak} longestSteak={steaks?.longestSteak} previousSteak={steaks?.previousSteak} />
                </HoverCardContent>
            </HoverCard>
            <Button variant={"ghost"} className="gap-0 cursor-default text-sky-500">
                <div className="relative w-[23px] h-7 flex items-center justify-center">
                    <Image src="/gems.svg" width={23} height={28} className="rounded-md" alt="gems" />
                </div>
                <span className="ml-2">{gems}</span>
            </Button>

            <Button variant={"ghost"} className="gap-0 cursor-default text-rose-500">
                <div className="relative w-7 h-7 flex items-center justify-center">
                    <Image src="/hearts.svg" width={28} height={28} className="rounded-md" alt="hearts" />
                </div>
                <span className="ml-2">{hearts}</span>
            </Button>
        </div>
    );
};

export default React.memo(UserProgress);
