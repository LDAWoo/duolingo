"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import SidebarItem from "./sidebar-item";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { users } from "@/db/schema";
import Link from "next/link";

type Props = {
    className?: string;
    user?: typeof users.$inferSelect;
};

const Sidebar = ({ className, user }: Props) => {
    const handleLogout = () => {
        signOut();
    };

    return (
        <div className={cn("hidden md:flex flex-col h-full w-[88px] lg:w-[256px] fixed left-0 top-0 px-4 border-r-2 p-[0_16px]", className)}>
            <div className="pt-8 pl-[10px] lg:pl-4 pb-[25px] lg:mb-[30px]">
                <Link href={"/learn"}>
                    <div className="w-[128px] h-[30px] relative hidden lg:block">
                        <Image src={"/duolingo.svg"} alt="Duolingo" fill />
                    </div>
                    <div className="w-10 h-10 relative block lg:hidden">
                        <Image src={"/mascot.svg"} alt="Mascot" fill />
                    </div>
                </Link>
            </div>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Học" href="/learn" iconSrc="/learn.svg" />
                <SidebarItem label="Phát âm" href="/characters" iconSrc="/characters.svg" />
                <SidebarItem label="Bảng xếp hạng" href="/leaderboard" iconSrc="/leaderboard.svg" />
                <SidebarItem label="Nhiệm vụ" href="/quests" iconSrc="/quests.svg" />
                <SidebarItem label="Cửa hàng" href="/shop" iconSrc="/shop.svg" />
                <SidebarItem label="Hồ sơ" href={`/profile/${user?.username}`} iconSrc="/profile.svg" />
                <HoverCard openDelay={0}>
                    <HoverCardTrigger asChild>
                        <Button variant={"sidebar"} className="p-[4px_8px] text-[calc(var(--type-base-size)-3px)] justify-start h-[52px] gap-0 cursor-default">
                            <>
                                <Image src={"/more.svg"} alt={"more"} className="lg:ml-[6px] lg:mr-5" height={32} width={32} />
                                <span className="hidden lg:block">Xem Thêm</span>
                            </>
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[252px]" side="right">
                        <div className="p-[8px_0] border-b-2">
                            <div className="flex items-center p-[0_20px] uppercase w-full h-[52px] text-wolf font-bold text-[calc(var(--type-base-size)-3px)]">
                                <Image src={"/world.svg"} alt={""} height={32} width={32} className="mr-5" />
                                <span>Schools</span>
                            </div>
                        </div>
                        <div className="p-[8px_0]">
                            <button type="button" className="cursor-pointer flex p-[0_20px] items-center text-[calc(var(--type-base-size)-3px)] min-w-[100px] w-full h-10 justify-normal text-wolf font-bold uppercase hover:bg-background-hover">
                                Cài đặt
                            </button>
                            <button type="button" className="cursor-pointer flex p-[0_20px] items-center text-[calc(var(--type-base-size)-3px)] min-w-[100px] w-full h-10 justify-normal text-wolf font-bold uppercase hover:bg-background-hover">
                                Trợ giúp
                            </button>
                            <button onClick={handleLogout} type="button" className="cursor-pointer flex p-[0_20px] items-center text-[calc(var(--type-base-size)-3px)] min-w-[100px] w-full h-10 justify-normal text-wolf font-bold uppercase hover:bg-background-hover">
                                Đăng xuất
                            </button>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
        </div>
    );
};

export default Sidebar;
