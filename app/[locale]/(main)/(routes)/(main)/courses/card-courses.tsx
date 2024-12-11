import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
    title: string;
    id: number;
    imageSrc: string;
    onClick: (id: number) => void;
    disable: boolean;
    active: boolean;
};

const CardCourses = ({ title, id, imageSrc, onClick, disable, active }: Props) => {
    return (
        <div
            className={cn("border-2 rounded-xl border-b-4 hover:bg-black/5 select-none cursor-pointer active:border-b-2 p-3 pb-6 max-w-[240px] min-h-[217px] min-w-[150px] min-[1065px]:min-w-[200px] m-[6px] min-[700px]:m-3", {
                "pointer-events-none opacity-50": disable,
            })}
            onClick={() => onClick(id)}
        >
            <div className="relative">
                <div className="min-h-[26px] w-full flex items-center justify-end mb-[6px]">
                    {active && (
                        <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                            <CheckIcon className="text-white stroke-[4] h-4 w-4" />
                        </div>
                    )}
                </div>
                <div className="h-[71px]">
                    <Image src={imageSrc} alt={title} height={67} width={88} className="rounded-[16px] object-cover block mx-auto" />
                </div>
                <p className="text-neutral-700 text-center font-bold mt-[10px] text-[calc(var(--type-base-size)-1px)]">{title}</p>
                <p className="mt-[6px] text-muted-foreground text-[calc(var(--type-base-size)-1px)] text-center">12,6 Tr người học</p>
            </div>
        </div>
    );
};

export default CardCourses;
