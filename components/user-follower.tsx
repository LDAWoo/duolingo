import { Follow } from "@/lib/types";
import Image from "next/image";
import React from "react";
import CardFollow from "./card-follow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type Props = {
    followers: Follow[] | null;
    followings: Follow[] | null;
};

const UserFollower = ({ followers, followings }: Props) => {
    return (
        <div className="border-2 rounded-[16px] overflow-hidden">
            <Tabs defaultValue="following" className="w-full">
                <TabsList className="grid w-full grid-cols-2  bg-transparent">
                    <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
                    <TabsTrigger value="follower">Người theo dõi</TabsTrigger>
                </TabsList>
                <TabsContent value="following" className="mt-2">
                    {followings && followings.map((following) => <CardFollow key={following?.id} userId={following?.id} canFollow={following?.canFollow} displayName={following?.displayName} username={following?.username} isFollowing={following?.isFollowing} picture={following?.picture} totalXp={following?.totalXp} isFollowedBy={following?.isFollowedBy} />)}
                    {followings?.length === 0 && (
                        <div className="p-[40px_30px_30px] flex items-center flex-col">
                            <div className="relative w-[304px] h-[140px]">
                                <Image src={"/background-following.svg"} alt="" fill className="pb-5" />
                            </div>
                            <div className="text-[calc(var(--type-base-size)+2px)] text-wolf text-center">Kết nối bạn bè giúp học vui và hiệu quả hơn.</div>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="follower" className="mt-2">
                    {followers && followers.map((follower) => <CardFollow key={follower?.id} userId={follower?.id} canFollow={follower?.canFollow} displayName={follower?.displayName} username={follower?.username} isFollowing={follower?.isFollowing} picture={follower?.picture} totalXp={follower?.totalXp} />)}
                    {followers?.length === 0 && (
                        <div className="p-[40px_30px_30px] flex items-center flex-col">
                            <div className="text-[calc(var(--type-base-size)+2px)] text-wolf text-center">Chưa có người theo dõi</div>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default React.memo(UserFollower);
