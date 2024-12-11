import React from "react";

const LessonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex flex-col w-full h-full">{children}</div>
        </div>
    );
};

export default LessonLayout;
