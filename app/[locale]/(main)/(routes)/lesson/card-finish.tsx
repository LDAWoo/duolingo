import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type Props = {
    variant: "points" | "experiences";
    value: number;
    duration?: number;
};

const CardFinish = ({ variant, value, duration = 3 }: Props) => {
    const digits = Array.from({ length: value + 1 }, (_, i) => i);
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
                {isBeeVariant ? <Image src="/experiences.svg" width={19} height={24} alt="" className="mr-1" /> : <Image src="/destination.svg" width={28} height={25} alt="" className="mr-1" />}

                <div
                    className={cn("h-5 overflow-hidden mt-1 relative", {
                        "pr-5": variant === "points",
                    })}
                >
                    <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        {digits.map((digit) => (
                            <motion.div key={digit} initial={{ y: "-100%" }} animate={{ y: `-${100 * value}%` }} transition={{ duration }} className="relative leading-[20px]">
                                {digit}
                            </motion.div>
                        ))}
                    </motion.div>
                    {variant === "points" && <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 -right-1">%</div>}
                </div>
            </motion.div>
        </div>
    );
};

export default React.memo(CardFinish);
