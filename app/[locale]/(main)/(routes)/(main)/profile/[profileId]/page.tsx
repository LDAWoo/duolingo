import UserAvatar from "@/components/user-avatar";
import UserProfile from "@/components/user-profile";
import UserProgress from "@/components/user-progress";
import { getFollowers, getFollowings, getSteaks, getUser, getUserByUserName, getUserProfileByUserName, getUserProgress } from "@/db/queries";
import { redirect } from "@/i18n/routing";
import React from "react";
import UserStatistical from "./_components/user-statistical";
import UserFollower from "@/components/user-follower";
import UserSummaryExperiences from "./_components/user-summary-experiences";

type Props = {
    params: Promise<{
        profileId: string;
    }>;
};

const ProfileIdPage = async ({ params }: Props) => {
    const { profileId } = await params;

    const userData = getUser();
    const steakData = getSteaks();
    const userProfileData = getUserProfileByUserName(profileId);

    const followerData = getFollowers(profileId);
    const followingData = getFollowings(profileId);

    const [user, steaks, followers, followings, userProfile] = await Promise.all([userData, steakData, followerData, followingData, userProfileData]);

    if (!user.userProgress || !user.userProgress.activeCourse || !userProfile) {
        return redirect({ href: "/courses", locale: "en" });
    }
    const userId = user.id;

    const isVisitProfile = userId !== userProfile.id;

    const isFollower = followers?.some((follow) => follow?.id === userId);

    const isFollowing = followings?.some((follow) => follow?.id === userId);

    return (
        <div className="flex flex-col md:flex-row-reverse gap-0 md:gap-[28px] md:px-6 md:pt-6">
            <div className="w-full md:w-[368px] gap-4 flex flex-col">
                <UserProgress
                    activeCourse={{
                        title: user.userProgress.activeCourse.title,
                        imageSrc: user.userProgress.activeCourse.imageSrc,
                    }}
                    steaks={steaks}
                    hearts={user.userProgress.hearts}
                    points={user.userProgress.points}
                    gems={user.userProgress.gems}
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
                        title: user.userProgress.activeCourse.title,
                        imageSrc: user.userProgress.activeCourse.imageSrc,
                    }}
                    isFollower={isFollower}
                    isFollowing={isFollowing}
                    isVisiting={isVisitProfile}
                    totalFollower={followers?.length || 0}
                    totalFollowing={followings?.length || 0}
                />
                <UserStatistical steaks={userProfile.steaks} exp={userProfile?.totalExp || 0} />
                {isVisitProfile && <UserSummaryExperiences totalExpUser={user?.totalExp} userProfileDisplayName={userProfile?.displayName || ""} totalExpUserProfile={userProfile?.totalExp} experiences={user.experiences} profileExperiences={userProfile?.experiences} />}
            </div>
        </div>
    );
};

export default ProfileIdPage;
