import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SelectedIcon } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
    active: boolean;
    name: string;
    onClick: (name: string) => void;
    selectedIcon: SelectedIcon;
    unselectedIcon: SelectedIcon;
};
const AvatarTabItem = ({ active, name, selectedIcon, unselectedIcon, onClick = () => {} }: Props) => {
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <div
                    className={cn("group relative flex h-[64px] cursor-pointer justify-center w-[58px] items-center border-b-2", {
                        "border-primary-foreground": active,
                    })}
                    onClick={() => onClick(name)}
                >
                    {active && <Image src={selectedIcon.lightUrl} alt="" width={28} height={28} />}
                    {!active && <Image src={unselectedIcon.lightUrl} alt="" width={28} height={28} className="block group-hover:hidden" />}
                    {!active && <Image src={selectedIcon.lightUrl} alt="" width={28} height={28} className="hidden group-hover:block" />}
                </div>
            </TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
        </Tooltip>
    );
};

export default React.memo(AvatarTabItem);
