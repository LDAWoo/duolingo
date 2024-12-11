"use client";
import React from "react";
import AvatarTabItem from "./avatar-tab-item";
import { AvatarProps } from "@/lib/constant";

type Props = {
    activeTab: string;
    tabs: AvatarProps[];
    onClick: (name: string) => void;
};

const AvatarTab = ({ activeTab, tabs, onClick = () => {} }: Props) => {
    return <div className="flex flex-row justify-between px-4 w-full relative flex-shrink-0 device:overflow-visible">{tabs && tabs.map((tab, index) => <AvatarTabItem key={index} active={activeTab === tab.tabName} name={tab.tabName} selectedIcon={tab.selectedIcon} unselectedIcon={tab.unselectedIcon} onClick={onClick} />)}</div>;
};

export default React.memo(AvatarTab);
