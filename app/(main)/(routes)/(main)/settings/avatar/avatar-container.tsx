"use client";
import { useAvatar } from "@/hooks/use-avatar";
import { useDimensions } from "@/hooks/use-dimensions";
import { avatarBuilders, ImageButton, Section } from "@/lib/constant";
import React from "react";
import AvatarTab from "./avatar-tab";
import AvatarTabContent from "./avatar-tab-content";
import Model from "./model";

type StylesProps = {
    BackgroundColor: string;
    SkinTone: string;
    ClothingColor: string;
    HairColor: string;
    EyeColor: string;
    MouthShape: string;
};

const AvatarContainer = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { width, height } = useDimensions(containerRef);
    const avatars = React.useMemo(() => avatarBuilders, []);
    const { avatar } = useAvatar();
    const [activeTab, setActiveTab] = React.useState<string>("Dáng người");
    const [sections, setSections] = React.useState<Section[]>([]);
    const [styles, setStyles] = React.useState<StylesProps>({
        BackgroundColor: "",
        SkinTone: "",
        ClothingColor: "",
        HairColor: "",
        EyeColor: "",
        MouthShape: "",
    });

    const handleClickTab = (name: string) => {
        setActiveTab(name);
    };

    React.useEffect(() => {
        if (!avatars || !activeTab) return;
        const currentSections = avatars.find((tab) => {
            if (tab.tabName === activeTab) {
                return tab.sections;
            }
        });
        if (currentSections && currentSections?.sections) {
            setSections(currentSections.sections);
        }
    }, [activeTab, avatars]);

    React.useEffect(() => {
        if (!avatars || !avatar) return;
        avatars.forEach((a) => {
            a?.sections?.forEach((section) => {
                section?.imageButtons?.forEach((button: ImageButton) => {
                    const value = avatar[button.state];

                    if (button.value === value) {
                        setStyles((prev) => ({
                            ...prev,
                            [button.state]: button.color,
                        }));
                    }
                });
            });
        });
    }, [avatar, avatars]);

    return (
        <div className="max-h-[688px] overflow-visible flex flex-col device:flex-row flex-[1] relative">
            <div className="flex-shrink flex-[1] h-full  border-2 border-[rgba(0,0,0,.2)] device:rounded-tl-[16px] device:rounded-bl-[16px] overflow-hidden">
                <div ref={containerRef} className="w-full h-full max-h-[200px] device:max-h-none device:h-[500px]">
                    <Model styles={styles} width={width} height={height} />
                </div>
            </div>
            <div className="flex flex-[1] flex-col w-full device:max-w-[520px] overflow-visible border-2 border-l-0 device:rounded-tr-[16px] device:rounded-br-[16px]">
                <AvatarTab activeTab={activeTab} tabs={avatars} onClick={handleClickTab} />
                <AvatarTabContent sections={sections} />
            </div>
        </div>
    );
};

export default React.memo(AvatarContainer);
