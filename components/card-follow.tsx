"use client";
import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Loading from "./global/loading";
import qs from "query-string";
import { EVENT_TYPE } from "@/lib/types";
import axios from "axios";
import { cn } from "@/lib/utils";

type Props = {
    userId?: number;
    username?: string;
    picture?: string;
    displayName?: string;
    totalXp?: number;
    canFollow?: boolean;
    isFollowing?: boolean;
    isFollowedBy?: boolean;
};

const CardFollow = ({ userId, picture, username, displayName, isFollowing, isFollowedBy, canFollow, totalXp }: Props) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [following, setIsFollowing] = React.useState(isFollowing);

    const handleClick = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/users",
                query: {
                    userId,
                    eventType: following ? EVENT_TYPE.UN_FOLLOW : EVENT_TYPE.FOLLOW,
                },
            });
            setLoading(true);
            await axios.post(url);
            router.refresh();
            setIsFollowing(!following);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 flex items-center">
            <Link href={`/profile/${username}`} className="flex flex-[1_1_auto] items-center overflow-hidden text-eel">
                <div className="relative w-12 h-12">
                    <Image src={picture || ""} alt={username || ""} fill className="rounded-full overflow-hidden" />
                </div>
                <div className="mx-3 overflow-hidden text-ellipsis whitespace-nowrap">
                    <h3 className="mb-[1px] font-bold text-[calc(var(--type-base-size)+2px)] overflow-hidden text-ellipsis leading-none">{displayName}</h3>
                    <div className="text-muted-foreground text-[calc(var(--type-base-size)-2px)] leading-none">{`${totalXp} KN`}</div>
                </div>
            </Link>
            {canFollow && isFollowedBy && (
                <Button disabled={loading} onClick={handleClick} variant={following ? "ghostOutline" : "primary"} className="p-[6px_8px] before:rounded-[8px] w-[41px] h-7">
                    {!loading && <Image src={following ? "/user-check.svg" : "/user-plus.svg"} width={25} height={16} alt="" />}
                    {loading && (
                        <Loading
                            size={7}
                            className={cn({
                                "bg-swan": following,
                            })}
                            style={{
                                gap: "4px",
                            }}
                        />
                    )}
                </Button>
            )}
        </div>
    );
};

export default React.memo(CardFollow);
