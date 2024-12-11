"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LottieWrapper from "@/components/global/lottie-wrapper";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import animationData from "@/public/animation/hero.json";

const Header = () => {
    const { onOpen } = useModal();

    return (
        <header className="pt-[70px] flex flex-col ">
            <div className="fixed top-0 w-full z-[2] bg-background">
                <nav className="max-w-[988px] mx-auto h-[70px] flex justify-between items-center lg:px-0 px-10">
                    <Link href={"/"} className="flex items-center">
                        <div className="w-10 h-10 relative">
                            <Image src={"/mascot.svg"} alt="Mascot" fill />
                        </div>
                        <div className="w-[128px] h-[30px] relative">
                            <Image src={"/duolingo.svg"} alt="Duolingo" fill />
                        </div>
                    </Link>
                </nav>
            </div>

            <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-[10px_15px_20px] device:p-[48px_0] gap-2">
                <div className="relative w-[273px] h-[273px] device:w-[424px] device:h-[424px] mb-8 lg:mb-0">
                    <LottieWrapper animationData={animationData} />
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-[calc(var(--type-base-size)+14px)] font-bold text-foreground max-w-[480px] text-center leading-tight">Cách học ngôn ngữ miễn phí, vui nhộn và hiệu quả!</h1>

                    <div className="max-w-[330px] w-full flex flex-col mt-10 gap-3">
                        <Button variant={"secondary"} size={"lg"}>
                            Bắt đầu
                        </Button>
                        <Button
                            variant={"primaryOutline"}
                            size={"lg"}
                            onClick={() => {
                                onOpen("authentication");
                            }}
                        >
                            Tôi đã có tài khoản
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default React.memo(Header);
