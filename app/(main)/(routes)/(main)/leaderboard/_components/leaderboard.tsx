import React from "react";
import Card from "./card";
import { Rank } from "@/lib/types";
import Image from "next/image";

type Props = {
    userId: number;
    ranks: Rank[];
};

const LeaderBoard = ({ ranks, userId }: Props) => {
    const totalUsers = Math.min(ranks.length, 30);
    const promotionLimit = Math.min(7, totalUsers);
    const relegationStart = totalUsers >= 8 ? totalUsers - 7 : 0;

    return (
        <div className="flex flex-col flex-grow relative mb-[2px] overflow-hidden border-t-2">
            {ranks.map((rank, index) => {
                const currentRank = index + 1;
                const isLastPromotionGroup = currentRank === promotionLimit;
                const isFirstRelegationGroup = totalUsers >= 8 && currentRank === relegationStart + 1;

                return (
                    <>
                        <Card rank={currentRank} active={rank.userId === userId} userId={rank.userId} avatarUrl={rank.avatarUrl} displayName={rank.displayName} score={rank.score} username={rank.username} />
                        {isLastPromotionGroup && (
                            <div className="flex items-center justify-center mb-[10px] p-[15px_0] text-frog font-bold text-[calc(var(--type-base-size)-3px)] uppercase tracking-[.8px]">
                                <div className="relative w-6 h-6 mx-[15px]">
                                    <Image src={"/promotion-arrow.svg"} alt="" fill />
                                </div>
                                Nhóm thăng hạng
                                <div className="relative w-6 h-6 mx-[15px]">
                                    <Image src={"/promotion-arrow.svg"} alt="" fill />
                                </div>
                            </div>
                        )}

                        {isFirstRelegationGroup && (
                            <div className="flex items-center justify-center mb-[10px] p-[15px_0] text-ant font-bold text-[calc(var(--type-base-size)-3px)] uppercase tracking-[.8px]">
                                <div className="relative w-6 h-6 mx-[15px]">
                                    <Image src={"/relegation-arrow.svg"} alt="" fill />
                                </div>
                                Nhóm rớt hạng
                                <div className="relative w-6 h-6 mx-[15px]">
                                    <Image src={"/relegation-arrow.svg"} alt="" fill />
                                </div>
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
};

export default React.memo(LeaderBoard);
