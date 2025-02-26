"use client";
import Image from "next/image";
import Link from "next/link";

import React, { CSSProperties } from "react";

type Props = {
    title?: string;
    description?: string;
    style: CSSProperties;
};

const UnitBanner = ({ title, description, style }: Props) => {
    return (
        <div className="sticky top-0 z-[210] bg-background min-h-[82px] w-full px-4 device:px-0 select-none" style={style}>
            <div className="h-6 w-full" />

            <div className="w-full rounded-[13px] overflow-hidden border-b-4 lg:border-b-0 border-[rgba(0,0,0,.2)] bg-[var(--path-lever-color)] p-0 lg:p-4 gap-0 lg:gap-4 text-white flex items-center justify-between">
                <div className="min-h-[82px] lg:min-h-0 flex flex-1 bg-[var(--path-lever-color)] lg:hover:bg-transparent flex-col items-start gap-0 lg:gap-[6px]">
                    <Link href={"/lessons"} className="flex-grow lg:flex-grow-0 w-full lg:w-fit flex flex-col lg:flex-row lg:items-center gap-0 mb-[2px] mt-3 lg:mt-0 lg:mb-0 lg:gap-2 justify-center p-[0_12px_12px_12px] lg:p-0">
                        <Image src={"/arrow-left.svg"} width={16} height={16} alt="Return Lessons" className="hidden lg:block" />
                        <h1 className="uppercase text-[calc(var(--type-base-size)-2px)] leading-[24px] font-bold opacity-70">{title}</h1>
                        <span className="block lg:hidden text-[calc(var(--type-base-size)+1px)] leading-[22px] font-bold">{description}</span>
                    </Link>
                    <span className="hidden lg:block text-[calc(var(--type-base-size)+4px)] leading-[28px] font-bold">{description}</span>
                </div>

                <Link href={`/guidebook/1`} className="min-h-[82px] lg:min-h-0 flex items-center justify-center p-[12px_14px] uppercase font-bold lg:rounded-2xl border-l-2 lg:border-2 lg:border-b-4 border-[rgba(0,0,0,.2)] hover:opacity-80 lg:hover:bg-transparent lg:hover:opacity-80">
                    <Image src={"/guidebook.svg"} width={24} height={24} alt="Guidebook" />
                    <span className="hidden min-[1100px]:block ml-3 text-[calc(var(--type-base-size)-3px)]">Hướng dẫn</span>
                </Link>
            </div>
        </div>
    );
};

export default UnitBanner;
