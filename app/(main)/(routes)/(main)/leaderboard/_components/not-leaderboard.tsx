import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotLeaderBoard = () => {
    return (
        <>
            <div className="relative w-[272px] h-[168px] mb-2 mx-auto">
                <Image src={"/leagues.svg"} alt="" fill />
            </div>
            <h2 className="mb-4 text-[calc(var(--type-base-size)+7px)] font-bold leading-[26px]">Mở khóa Bảng xếp hạng!</h2>
            <div className="mb-6 text-[calc(var(--type-base-size)+1px)] text-wolf leading-[20px]">Hoàn thành thêm 1 bài học để bắt đầu thi đua</div>
            <Link href={"/lesson"} className="mb-7 w-[256px] mx-auto">
                <Button variant={"primaryOutline"} size={"lg"} className="w-full">
                    Bắt đầu học
                </Button>
            </Link>

            <div className="relative overflow-hidden p-[0_24px_0_28px] w-full grid grid-cols-[min-content,1fr,min-content] after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t from-background to-transparent">
                <div className="relative w-4 h-[448px] m-[16px_24px_0_0]">
                    <Image src={"/leagues-dot-skeleton.svg"} alt="" fill />
                </div>
                <div className="relative w-[208px] h-[480px]">
                    <Image src={"/leagues-user-skeleton.svg"} alt="" fill />
                </div>
                <div className="relative w-[48px] h-[444px]">
                    <Image src={"/leagues-line-skeleton.svg"} alt="" fill />
                </div>
            </div>
        </>
    );
};

export default React.memo(NotLeaderBoard);
