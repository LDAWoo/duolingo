import { lessons, levels } from "@/db/schema";
import { cn } from "@/lib/utils";
import LessonButton from "./lesson-button";
import UnitHeader from "./unit-header";
import UnitPet from "./unit-pet";

type Props = {
    id: number;
    src: string;
    type: "image" | "json" | null;
    order: number;
    title: string;
    description: string;
    lessons: (typeof lessons.$inferSelect & {
        levels: (typeof levels.$inferInsert & {
            completed: boolean;
        })[];
        completed: boolean;
    })[];
    activeLessonLevel: typeof levels.$inferSelect;
    activeLessonPercentage: number;
    backgroundColor?: string;
};

const Unit = ({ id, type, src, order, title, description, lessons, activeLessonLevel, activeLessonPercentage, backgroundColor }: Props) => {
    // console.log(activeLessonPercentage);

    return (
        <section
            style={{
                "--path-lever-color": backgroundColor,
            }}
        >
            {order > 1 && <UnitHeader description={description} />}
            <div className="flex items-center flex-col relative p-[0_16px] min-h-[500px]">
                {lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLessonLevel?.lessonId;
                    const lessonComplete = Array.isArray(lesson.levels) && lesson.levels.length > 0 && lesson.levels.every((level) => level?.completed === true);
                    const isLocked = !lessonComplete && !isCurrent;

                    const pathLeverColor = !isLocked ? backgroundColor : `rgba(229, 229, 229,1)`;

                    return <LessonButton key={lesson.id} levels={lesson.levels as (typeof levels.$inferSelect)[]} activeLevel={activeLessonLevel} backgroundColor={pathLeverColor} id={lesson.id} index={index} order={order} totalCount={lessons.length - 1} current={isCurrent} locked={isLocked} percentage={activeLessonPercentage} />;
                })}

                <UnitPet
                    src={src}
                    type={type}
                    className={cn("right-0 left-auto", {
                        "left-0 right-auto": order % 2 === 0,
                    })}
                />
            </div>
        </section>
    );
};

export default Unit;
