import React from "react";
import { getCourses, getUserProgress } from "@/db/queries";
import ListCourses from "./list-courses";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
    const userData = await currentUser();
    const coursesData = getCourses();
    const userProgressData = getUserProgress();

    const [user, courses, userProgress] = await Promise.all([userData, coursesData, userProgressData]);

    if (!user) {
        return redirect("/");
    }

    return (
        <div className="pt-6">
            <div className="h-full max-w-[912px] px-3 mx-auto mb-[30px]">
                <div className="flex flex-row px-3 justify-between items-center">
                    <h1 className="text-[calc(var(--type-base-size)+6px)] leading-[40px] font-bold text-neutral-700">Khoá học dành cho người nói Tiếng Việt</h1>
                </div>
                <ListCourses courses={courses} activeCourseId={userProgress?.activeCourseId} />
            </div>
        </div>
    );
};

export default CoursesPage;
