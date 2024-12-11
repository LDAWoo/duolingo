"use client";
import { courses, userProgress } from "@/db/schema";
import React from "react";
import CardCourses from "./card-courses";
import { upsertUserProgress } from "@/actions/user-progress";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

type Props = {
    courses: (typeof courses.$inferSelect)[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

const ListCourses = ({ activeCourseId, courses }: Props) => {
    const router = useRouter();
    const locale = useLocale();
    const [pending, startTransition] = React.useTransition();

    const onClick = (id: number) => {
        if (pending) return;

        if (id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(locale, id);
        });
    };

    return <div className="pt-6 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] min-[1065px]:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">{courses && courses.map((course) => <CardCourses key={course.id} id={course.id} title={course.title} imageSrc={course.imageSrc} onClick={(id) => onClick(id)} disable={pending} active={course.id === activeCourseId} />)}</div>;
};

export default ListCourses;
