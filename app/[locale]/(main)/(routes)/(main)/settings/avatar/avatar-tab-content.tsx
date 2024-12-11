"use client";
import { useAvatar } from "@/hooks/use-avatar";
import { ImageButton, Section } from "@/lib/constant";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    sections: Section[];
};

const AvatarTabContent = ({ sections }: Props) => {
    const { avatar, setAvatar } = useAvatar();

    const handleColorClick = (state: string, value: number) => {
        setAvatar({ [state]: value });
    };

    return (
        <div className="flex flex-col overflow-y-auto py-6 gap-8">
            {sections.map((section: Section) => {
                if (section.buttonType === "IMAGE") {
                    return (
                        <div className="p-[0_32px] flex flex-col" key={section.header}>
                            <span className="mb-4 text-[calc(var(--type-base-size)+2px)] font-bold">{section.header}</span>

                            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(56px,1fr))]">
                                {section?.imageButtons &&
                                    section.imageButtons.map((button: ImageButton) => (
                                        <div
                                            key={button.color}
                                            className={cn("relative border-2  translate-y-0 active:translate-y-[2px] cursor-pointer inline-flex rounded-[12px] items-center justify-center h-[56px] w-[56px] before:absolute before:-top-[2px] before:-right-[2px] before:-left-[2px] before:-bottom-[2px] before:-z-[1] before:rounded-[12px] before:border-2 before:shadow-[0_2px_0_#E6E6E6]  active:before:shadow-none", {
                                                "bg-primary border-primary-foreground/50 before:shadow-[0_2px_0_#7CD3FA] before:border-primary-foreground/50": avatar[button.state] === button.value,
                                            })}
                                            onClick={() => handleColorClick(button.state, button.value)}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: button.color,
                                                }}
                                                className="h-10 w-10 rounded-[8px]"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default React.memo(AvatarTabContent);
