import { steaks } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
    steaks: any;
    points: number;
};

const UserStatistical = ({ steaks, points }: Props) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-[calc(var(--type-base-size)+6px)]">Thống kê</h2>
            </div>
            <div className="grid grid-cols-[repeat(2,1fr)] gap-3">
                <div className="rounded-[16px] p-[15px_24px] border-2 flex items-start overflow-hidden">
                    <Image src={`${steaks?.currentSteak?.length > 0 ? "/steak-active.svg" : "/steak.svg"}`} width={23} height={28} alt="" className="mr-[15px]" />
                    <div className="flex-[1_0_auto] items-center leading-[20px]">
                        <h4
                            className={cn("font-bold mb-1 text-[calc(var(--type-base-size)+2px)]", {
                                "text-disable-foreground": !steaks?.currentSteak?.length,
                            })}
                        >
                            {steaks?.currentSteak?.length || 0}
                        </h4>
                        <div className="text-muted-foreground text-[calc(var(--type-base-size)-2px)]">Ngày Steak</div>
                    </div>
                </div>

                <div className="rounded-[16px] p-[15px_24px] border-2 flex items-start overflow-hidden">
                    <Image src={`${points > 0 ? "/experiences.svg" : "/experiences-inactive.svg"}`} width={21} height={26} alt="" className="mr-[15px]" />
                    <div className="flex-[1_0_auto] items-center leading-[20px]">
                        <h4
                            className={cn("font-bold mb-1 text-[calc(var(--type-base-size)+2px)]", {
                                "text-disable-foreground": points === 0,
                            })}
                        >
                            {points || 0}
                        </h4>
                        <div className="text-muted-foreground text-[calc(var(--type-base-size)-2px)]">Tổng điểm KN</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStatistical;
