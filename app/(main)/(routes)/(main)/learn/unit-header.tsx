import React from "react";

type Props = {
    description: string;
};

const UnitHeader = ({ description }: Props) => {
    return (
        <header className="flex mt-2 mb-2 items-center">
            <hr className="flex-grow basis-[48px] m-[40px_0] h-0 border-t-2" />
            <h2 className="font-bold text-[calc(var(--type-base-size)+1px)] text-muted-foreground leading-[27px] text-center m-[0_16px]">{description}</h2>
            <hr className="flex-grow basis-[48px] m-[40px_0] h-0 border-t-2" />
        </header>
    );
};

export default UnitHeader;
