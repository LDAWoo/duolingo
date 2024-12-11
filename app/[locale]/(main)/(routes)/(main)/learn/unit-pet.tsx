"use client";
import LottieWrapper from "@/components/global/lottie-wrapper";
import axios from "axios";
import React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    className?: string;
    src: string;
    type: "image" | "json" | null;
};

const UnitPet = ({ className, src, type }: Props) => {
    const [animationData, setAnimationData] = React.useState<object | null>(null);

    React.useEffect(() => {
        if (type !== "json") return;

        const fetchAnimationData = async () => {
            try {
                const response = await axios.get(`/api/proxy?url=${encodeURIComponent(src)}`);
                setAnimationData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAnimationData();
    }, [src, type]);

    return (
        <div className={cn("absolute top-1/2 -translate-y-1/2 w-[calc(50%+3px)] h-[260px]", className)}>
            {type === "image" && <Image src={src} alt="" fill />}
            {type === "json" && animationData && <LottieWrapper animationData={animationData} />}
        </div>
    );
};

export default React.memo(UnitPet);
