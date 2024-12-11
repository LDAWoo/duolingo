import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "@/i18n/routing";
import React from "react";
import Quiz from "./quiz";

type Props = {
    params: {
        locale: string;
    };
};

const LessonPage = async ({ params }: Props) => {
    const { locale } = params;
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [data, userProgress] = await Promise.all([lessonData, userProgressData]);

    if (!data || !data.lesson || !data.lesson.lessonId || !userProgress) {
        return redirect({
            href: "/learn",
            locale,
        });
    }

    const initialPercentage = (data.lesson.challenges.filter((challenge) => challenge.completed).length / data.lesson.challenges.length) * 100;

    return (
        <>
            <Quiz initialLessonId={data.lesson.lessonId} initialLessonChallenges={data.lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initialPercentage} userSubscription={null} />
        </>
    );
};

export default LessonPage;
