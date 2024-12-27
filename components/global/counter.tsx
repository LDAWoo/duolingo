import React, { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useAnimate, useInView, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface CounterProps {
    from: number;
    to: number;
    className?: string;
    suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ from, to, className, suffix = "" }) => {
    const ref = useRef(null);

    const isInView = useInView(ref, {
        once: true,
        margin: "0px 0px -100px 0px",
    });

    const [_, animate] = useAnimate();
    const startingValue = useMotionValue(from);

    const currentValue = useTransform(startingValue, (value) => Math.round(value).toLocaleString() + suffix);

    useEffect(() => {
        if (isInView) {
            animate(startingValue, to, {
                duration: 1,
                ease: "easeInOut",
            });
        }
    }, [animate, isInView, to, startingValue]);

    return (
        <LazyMotion features={domAnimation}>
            <m.p ref={ref} className={cn("inline-flex text-center", className)}>
                {currentValue}
            </m.p>
        </LazyMotion>
    );
};

export default Counter;
