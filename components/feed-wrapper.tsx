import React from "react";

type Props = {
    children: React.ReactNode;
};

const FeedWrapper = ({ children }: Props) => {
    return <div className="block flex-1 relative top-0 pb-10 z-0">{children}</div>;
};

export default FeedWrapper;
