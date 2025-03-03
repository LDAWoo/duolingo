import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getSteaks, getUnits, getUserProgress } from "@/db/queries";
import UnitWrapper from "./unit-wrapper";
import { levels } from "@/db/schema";
import React from "react";
import { redirect } from "next/navigation";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const unitData = getUnits();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const steakData = getSteaks();
    const [userProgress, units, courseProgress, lessonPercentage, steaks] = await Promise.all([userProgressData, unitData, courseProgressData, lessonPercentageData, steakData]);

    if (!userProgress || !userProgress.activeCourse || !courseProgress) {
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
                    points={userProgress.points}
                    steaks={steaks}
                    gems={userProgress.gems}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <UnitWrapper
                    units={units}
                    lessonPercentage={lessonPercentage}
                    courseProgress={
                        courseProgress as {
                            activeLevelLesson: typeof levels.$inferSelect;
                            activeLevelLessonId: number;
                        }
                    }
                />
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
