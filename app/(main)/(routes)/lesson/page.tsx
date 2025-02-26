import { getLesson, getUserProgress } from "@/db/queries";
import React from "react";
// import Quiz from "./quiz";
import { redirect } from "next/navigation";

const LessonPage = async () => {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [data, userProgress] = await Promise.all([lessonData, userProgressData]);

    if (!data || !data.lesson || !data.lesson.lessonId || !userProgress) {
        return redirect("/learn");
    }

    const initialPercentage = (data.lesson.challenges.filter((challenge) => challenge.completed).length / data.lesson.challenges.length) * 100;

    return (
        // <Quiz initialLessonId={data.lesson.lessonId} initialLessonChallenges={data.lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initialPercentage} userSubscription={null} />

        <div>Quiz</div>
    );
};

export default LessonPage;
