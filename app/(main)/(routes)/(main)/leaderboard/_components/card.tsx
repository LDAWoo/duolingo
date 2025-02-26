import { Rank } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = Rank & {
    rank: number;
    active: boolean;
};

const Card = ({ score, avatarUrl, displayName, username, rank, active }: Props) => {
    return (
        <Link
            href={`/profile/${username}`}
            className={cn("rounded-[16px] flex p-[8px_24px_8px_16px] items-center hover:bg-polar", {
                "bg-disable": active,
            })}
        >
            {rank <= 3 ? (
                <div className="relative w-[41px] h-[42px]">
                    {rank === 1 && <Image src={"/top-1st.svg"} alt="" fill />}
                    {rank === 2 && <Image src={"/top-2nd.svg"} alt="" fill />}
                    {rank === 3 && <Image src={"/top-3rd.svg"} alt="" fill />}
                </div>
            ) : (
                <span
                    className={cn("w-[41px] text-center font-bold flex-shrink-0", {
                        "text-frog": rank <= 7,
                    })}
                >
                    {rank}
                </span>
            )}

            <div className="m-[0_28px_0_12px] relative w-[48px] h-[48px]">
                <Image src={avatarUrl} alt="" fill className="rounded-full object-cover overflow-hidden" />
            </div>

            <div className="overflow-hidden flex flex-col flex-grow text-left mr-[10px]">
                <span className="font-bold text-[calc(var(--type-base-size)-1px)] text-ellipsis whitespace-nowrap overflow-hidden">{displayName}</span>
            </div>
            <span className="text-right flex-shrink-0 text-wolf mr-[10px] text-[calc(var(--type-base-size)-1px)]">{score} KN</span>
        </Link>
    );
};

export default Card;
