"use client";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Loading from "./global/loading";
import qs from "query-string";
import { EVENT_TYPE, Follow } from "@/lib/types";
import axios from "axios";
import { useRouter } from "@/i18n/routing";

type Props = {
    displayName?: string | null;
    username?: string;
    createdAt?: Date | null;
    activeCourse: {
        title: string;
        imageSrc: string;
    };
    isVisiting?: boolean;
    isFollower?: boolean;
    isFollowing?: boolean;
    userId?: number;
    totalFollower: number;
    totalFollowing: number;
};
const UserProfile = ({ displayName, username, activeCourse, createdAt, isVisiting, isFollowing, isFollower, userId, totalFollower, totalFollowing }: Props) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const formattedDate = createdAt
        ? format(new Date(createdAt), "LLLL yyyy", {
              locale: vi,
          })
        : "N/A";

    const [follower, setFollower] = React.useState(isFollower);

    const handleClick = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/users",
                query: {
                    userId,
                    eventType: follower ? EVENT_TYPE.UN_FOLLOW : EVENT_TYPE.FOLLOW,
                },
            });

            setLoading(true);
            await axios.post(url);
            router.refresh();
            setFollower(!follower);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="pb-4 mt-2 border-b-2 flex flex-col">
            <div className="flex-1 flex flex-row">
                <div className="flex flex-1 flex-col">
                    <h1 className="mb-[6px] text-[calc(var(--type-base-size)+10px)] leading-[34px] font-bold break-words">
                        <span>{displayName}</span>
                        <div className="leading-[22px] text-[calc(var(--type-base-size)-1px)] font-normal text-muted-foreground">{username}</div>
                    </h1>

                    <div className="mr-5 text-wolf">
                        <div className="flex flex-row mb-4">
                            <span className="mr-[5px] text-[calc(var(--type-base-size)-1px)] whitespace-nowrap">Đã tham gia {formattedDate}</span>
                        </div>
                        <div className="flex flex-row gap-4 mb-4 ">
                            <button type="button" className="whitespace-nowrap text-primary-foreground font-bold text-[calc(var(--type-base-size)-2px)] mr-[3px] leading-[24px] duration-150 transition-all hover:opacity-85">
                                Đang theo dõi {totalFollowing}
                            </button>
                            <button type="button" className="whitespace-nowrap text-primary-foreground font-bold text-[calc(var(--type-base-size)-2px)] mr-[3px] leading-[24px] duration-150 transition-all hover:opacity-85">
                                {totalFollower} Người theo dõi
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-[1_0_118px] flex-col-reverse">
                    <button type="button" className="flex items-center -ml-1 p-[10px_0] self-end mb-[6px] hover:opacity-80">
                        <Image width={31} height={24} src={activeCourse.imageSrc} alt={activeCourse.title} className="rounded-md" />
                    </button>
                </div>
            </div>

            {isVisiting && (
                <div className="flex flex-[0_1_auto] items-start">
                    <div className="flex-[1_1_auto] flex gap-[10px]">
                        {!isFollowing && (
                            <Button
                                variant={follower ? "ghostOutline" : "primary"}
                                className={cn("w-full", {
                                    "text-secondary": follower,
                                })}
                                disabled={loading}
                                size={"lg"}
                                onClick={handleClick}
                            >
                                {!loading && (
                                    <>
                                        <Image src={`${follower ? "/user-check.svg" : "/user-plus.svg"}`} alt="" width={25} height={16} />
                                        Theo dõi
                                    </>
                                )}

                                {loading && (
                                    <Loading
                                        className={cn({
                                            "bg-swan": follower,
                                        })}
                                    />
                                )}
                            </Button>
                        )}
                        <Button variant={"ghostOutline"} size={"lg"}>
                            <Image src={"/flag.svg"} alt="" width={20} height={20} />
                            Báo cáo
                        </Button>
                        <Button variant={"ghostOutline"} className="p-[0_16px] h-[46px]">
                            <div className="w-[28px] h-2 relative">
                                <Image src={"/option.svg"} alt="" fill />
                            </div>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(UserProfile);
