"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

type Props = {
    variant: "points" | "experiences";
    children?: React.ReactNode;
};

const CardFinish = ({ variant, children }: Props) => {
    const isBeeVariant = variant === "experiences";
    const borderClass = isBeeVariant ? "border-bee text-bee" : "border-secondary text-secondary";
    const bgClass = isBeeVariant ? "bg-bee" : "bg-secondary";

    return (
        <div className="min-[380px]:w-[163px] w-[133px] rounded-[16px] bg-background relative -z-[2] overflow-hidden">
            <motion.div initial={{ translateY: "30px", opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{ delay: 2, duration: 0.1, ease: "linear" }} className={cn("absolute -z-[1] h-full w-full rounded-[16px]", bgClass)} />

            <motion.div initial={{ translateY: "30px", opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{ delay: 3, duration: 0.1, ease: "linear" }} className="text-background uppercase text-[calc(var(--type-base-size)-5px)] font-bold leading-[16px] p-[4px_0]">
                {isBeeVariant ? "Tổng điểm KN" : "Tuyệt vời"}
            </motion.div>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 0.5, ease: "linear" }} className={cn("flex items-center justify-center text-center font-bold text-[calc(var(--type-base-size)+2px)] h-[70px] bg-background rounded-[16px] border-2", borderClass)}>
                {isBeeVariant ? <Image src="/experiences.svg" width={19} height={25} alt="" className="mr-1" /> : <Image src="/destination.svg" width={28} height={25} alt="" className="mr-1" />}
                {children}
            </motion.div>
        </div>
    );
};

export default React.memo(CardFinish);
