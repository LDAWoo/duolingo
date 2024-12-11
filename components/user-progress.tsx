import React, { act } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
    activeCourse: {
        title: string;
        imageSrc: string;
    };
    hearts: number;
    points: number;
    gems: number;
    hasActiveSubscription: boolean;
};

const UserProgress = ({ activeCourse, hasActiveSubscription, gems, hearts, points }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Button variant={"ghost"} className="cursor-default">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Image src={activeCourse.imageSrc} width={32} height={32} className="rounded-md" alt={activeCourse.title} />
                </div>
            </Button>

            <Button variant={"ghost"} className="gap-0 cursor-default text-orange-500">
                <div className="relative w-[23px] h-7 flex items-center justify-center">
                    <Image src="/points.svg" width={23} height={28} className="rounded-md" alt="points" />
                </div>
                <span className="ml-2">{points}</span>
            </Button>

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
