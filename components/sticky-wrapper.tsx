import React from "react";

type Props = {
    children: React.ReactNode;
};

const StickyWrapper = ({ children }: Props) => {
    return (
        <div className="w-full device:w-[368px] sticky device:basis-6">
            <div className="min-h-[58px] device:min-h-[calc(100vh-48px)] sticky top-0 device:top-6 flex flex-col items-center justify-center device:justify-start device:gap-y-4 px-[10px] device:px-0">{children}</div>
        </div>
    );
};

export default StickyWrapper;
