"use client";
import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Props = {
    label: string;
    iconSrc: string;
    href: string;
};

const SidebarItem = ({ href, iconSrc, label }: Props) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Button className="p-[4px_8px] text-[calc(var(--type-base-size)-3px)] justify-start h-[52px] gap-0" variant={active ? "sidebarOutline" : "sidebar"} asChild>
            <Link href={href}>
                <Image src={iconSrc} alt={label} className="lg:ml-[6px] lg:mr-5" height={32} width={32} />
                <span className="hidden lg:block">{label}</span>
            </Link>
        </Button>
    );
};

export default SidebarItem;
