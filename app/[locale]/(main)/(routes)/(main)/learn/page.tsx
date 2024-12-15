import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "@/i18n/routing";
import UnitWrapper from "./unit-wrapper";
import { levels } from "@/db/schema";
import React from "react";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const unitData = getUnits();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([userProgressData, unitData, courseProgressData, lessonPercentageData]);

    if (!userProgress || !userProgress.activeCourse || !courseProgress) {
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
