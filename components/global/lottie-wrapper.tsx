"use client";
import React from "react";
import Lottie, { LottieComponentProps } from "lottie-react";
import useMounted from "@/hooks/use-mounted";

type Props = LottieComponentProps & {};

const LottieWrapper = ({ ...props }: Props) => {
    const isMounted = useMounted();

    if (!isMounted) {
        return null;
    }

    return <Lottie {...props} className="w-full h-full" />;
};

export default LottieWrapper;
