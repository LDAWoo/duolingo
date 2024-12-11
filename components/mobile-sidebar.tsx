import React from "react";

const MobileSidebar = () => {
    return (
        <div className="md:hidden block fixed bottom-0 left-0 right-0 w-full z-[210]">
            <nav className="relative">
                <div className="border-t-2 h-[82px] flex gap-3 p-4 items-center justify-between"></div>
            </nav>
        </div>
    );
};

export default MobileSidebar;
