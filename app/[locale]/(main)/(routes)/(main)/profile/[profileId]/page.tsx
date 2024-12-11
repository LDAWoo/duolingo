import UserAvatar from "@/components/user-avatar";
import UserProfile from "@/components/user-profile";
import UserProgress from "@/components/user-progress";
import { getUserByUserName, getUserProgress } from "@/db/queries";
import { redirect } from "@/i18n/routing";
import React from "react";

type Props = {
    params: {
        profileId: string;
    };
};

const ProfileIdPage = async ({ params }: Props) => {
    const { profileId } = await params;

    const userProfileData = getUserByUserName(profileId);
    const userProgressData = getUserProgress();

    const [userProfile, userProgress] = await Promise.all([userProfileData, userProgressData]);

    if (!userProgress || !userProgress.activeCourse) {
        return redirect({ href: "/courses", locale: "en" });
    }

    return (
        <div className="flex flex-col device:flex-row-reverse gap-0 device:gap-[28px] device:px-6 device:pt-6">
            <div>
                <UserProgress
                    activeCourse={{
                        title: userProgress.activeCourse.title,
                        imageSrc: userProgress.activeCourse.imageSrc,
                    }}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    gems={userProgress.gems}
                    hasActiveSubscription={false}
                />
            </div>

            <div className="flex flex-col gap-8 p-0 flex-1 relative">
                <UserAvatar />
                <UserProfile
                    displayName={userProfile?.displayName}
                    username={userProfile?.username}
                    createdAt={userProfile?.timeStamp}
                    activeCourse={{
                        title: userProgress.activeCourse.title,
                        imageSrc: userProgress.activeCourse.imageSrc,
                    }}
                />
            </div>
        </div>
    );
};

export default ProfileIdPage;
