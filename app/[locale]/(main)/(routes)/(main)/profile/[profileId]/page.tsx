import UserAvatar from "@/components/user-avatar";
import UserProfile from "@/components/user-profile";
import UserProgress from "@/components/user-progress";
import { getFollowers, getFollowings, getSteaks, getUserByUserName, getUserProgress } from "@/db/queries";
import { redirect } from "@/i18n/routing";
import React from "react";
import UserStatistical from "./_components/user-statistical";
import UserFollower from "@/components/user-follower";

type Props = {
    params: Promise<{
        profileId: string;
    }>;
};

const ProfileIdPage = async ({ params }: Props) => {
    const { profileId } = await params;

    const userProfileData = getUserByUserName(profileId);
    const userProgressData = getUserProgress();
    const userProfileProgressData = getUserProgress(profileId);
    const steakData = getSteaks();
    const steakUserProfileData = getSteaks(profileId);

    const followerData = getFollowers(profileId);
    const followingData = getFollowings(profileId);

    const [userProfile, userProgress, userProfileProgress, steaks, steaksUserProfile, followers, followings] = await Promise.all([userProfileData, userProgressData, userProfileProgressData, steakData, steakUserProfileData, followerData, followingData]);

    if (!userProgress || !userProgress.activeCourse || !userProfileProgress) {
        return redirect({ href: "/courses", locale: "en" });
    }

    const isVisitProfile = userProgress.id !== userProfileProgress.id;

    const isFollower = followers?.some((follow) => follow?.id === userProgress?.userId);

    const isFollowing = followings?.some((follow) => follow?.id === userProgress?.userId);

    return (
        <div className="flex flex-col md:flex-row-reverse gap-0 md:gap-[28px] md:px-6 md:pt-6">
            <div className="w-full md:w-[368px] gap-4 flex flex-col">
                <UserProgress
                    activeCourse={{
                        title: userProgress.activeCourse.title,
                        imageSrc: userProgress.activeCourse.imageSrc,
                    }}
                    steaks={steaks}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    gems={userProgress.gems}
                    hasActiveSubscription={false}
                />
                <UserFollower followers={followers} followings={followings} />
            </div>

            <div className="flex flex-col gap-8 p-0 flex-1 relative">
                <UserAvatar />
                <UserProfile
                    userId={userProfile?.id}
                    displayName={userProfile?.displayName}
                    username={userProfile?.username}
                    createdAt={userProfile?.timeStamp}
                    activeCourse={{
                        title: userProgress.activeCourse.title,
                        imageSrc: userProgress.activeCourse.imageSrc,
                    }}
                    isFollower={isFollower}
                    isFollowing={isFollowing}
                    isVisiting={isVisitProfile}
                    totalFollower={followers?.length || 0}
                    totalFollowing={followings?.length || 0}
                />
                <UserStatistical steaks={steaksUserProfile} points={userProfileProgress?.points} />
            </div>
        </div>
    );
};

export default ProfileIdPage;
