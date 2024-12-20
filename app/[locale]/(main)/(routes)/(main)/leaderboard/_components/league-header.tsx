import Image from "next/image";
import React from "react";

type League = {
    id: number;
    name: string;
    imageSrc: string;
};

type Props = {
    leagues: League[];
    activeLeagueId: number;
    name: string;
};

const LeagueHeader = ({ leagues, activeLeagueId, name }: Props) => {
    return (
        <div className="max-w-[592px] pt-6 bg-background sticky top-0 z-[1]">
            <div className="h-[94px] relative overflow-hidden flex">
                <div
                    className="grid items-center absolute top-0 bottom-0 gap-7 justify-between left-0 right-0"
                    style={{
                        gridTemplateColumns: `repeat(${leagues.length}, min-content)`,
                    }}
                >
                    {leagues.map((league) => {
                        if (league.id === activeLeagueId) {
                            return (
                                <div key={league.imageSrc} className="relative w-[91px] h-[80px]">
                                    <Image src={league.imageSrc} alt="" fill />
                                </div>
                            );
                        }

                        return (
                            <div key={league.imageSrc} className="relative w-[52px] h-[58px]">
                                <Image src={league.id > activeLeagueId ? "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/1b4fb092de75e4ecefd8e92f10b4ddd2.svg" : league.imageSrc} alt="" fill />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="font-bold text-[calc(var(--type-base-size)+7px)] leading-[20px] mt-6 mb-5">{name}</div>
            <div className="text-wolf text-[calc(var(--type-base-size)+1px)] leading-[20px] mb-[5px] p-[0_12px]">Top 7 sẽ được thăng hạng lên giải đấu cao hơn</div>
            <div className="mb-4 h-[26px]"></div>
        </div>
    );
};

export default React.memo(LeagueHeader);
