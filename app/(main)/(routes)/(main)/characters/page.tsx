import React from "react";
import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import CharacterWrapper from "./_components/character-wrapper";
import { getAlphabets, getSteaks, getUserProgress } from "@/db/queries";
import UserProgress from "@/components/user-progress";
import { redirect } from "next/navigation";

const CharactersPage = async () => {
    const userProgressData = getUserProgress();
    const alphabetData = getAlphabets();
    const steakData = getSteaks();

    const [userProgress, alphabets, steaks] = await Promise.all([userProgressData, alphabetData, steakData]);

    if (!userProgress || !userProgress.activeCourse) {
        return redirect("/courses");
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
                    steaks={steaks}
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
