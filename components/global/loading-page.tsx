import Loading from "@/components/global/loading";
import React from "react";

const LoadingPage = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <Loading
                style={{
                    gap: "12px",
                }}
                size={18}
                className="bg-swan"
            />
        </div>
    );
};

export default React.memo(LoadingPage);
