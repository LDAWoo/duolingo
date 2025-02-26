"use client";
import { useDimensions } from "@/hooks/use-dimensions";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { EditIcon } from "./icons";
import { useRouter } from "next/navigation";

interface UserAvatarProps {}

const UserAvatar: React.FC<UserAvatarProps> = ({}) => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useDimensions(containerRef);

    return (
        <div className="bg-[#E5E5E5] h-[224px] relative w-full overflow-hidden rounded-[15px] cursor-pointer">
            {/* <div className="w-full h-full" ref={containerRef}></div> */}

            <Button
                onClick={() => {
                    router.push("/settings/avatar");
                }}
                variant={"none"}
                className="absolute top-4 right-4 w-[48px] h-[48px] p-[0_16px]"
            >
                <EditIcon size={18} />
            </Button>

            <div className="absolute left-1/2 top-[39px] w-[168px] h-[266px] -translate-x-1/2">
                <Image src={"/images/default_avatar.svg"} fill alt="Avatar" className="" />
            </div>
        </div>
    );
};

export default React.memo(UserAvatar);
