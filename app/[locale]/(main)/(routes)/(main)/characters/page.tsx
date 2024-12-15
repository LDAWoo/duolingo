import React from "react";
import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import CharacterWrapper from "./_components/character-wrapper";
import { getAlphabets, getUserProgress } from "@/db/queries";
import { redirect } from "@/i18n/routing";
import UserProgress from "@/components/user-progress";

const CharactersPage = async () => {
    const userProgressData = getUserProgress();
    const alphabetData = getAlphabets();

    const [userProgress, alphabets] = await Promise.all([userProgressData, alphabetData]);

    if (!userProgress || !userProgress.activeCourse) {
        return redirect({ href: "/courses", locale: "en" });
    }

    return (
        <div className="flex flex-col device:flex-row-reverse gap-0 device:gap-[28px] device:px-6 device:pt-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={{
                        title: userProgress?.activeCourse?.title,
                        imageSrc: userProgress?.activeCourse?.imageSrc,
                    }}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    gems={userProgress.gems}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <CharacterWrapper alphabets={alphabets} />
            </FeedWrapper>
        </div>
    );
};

export default CharactersPage;
