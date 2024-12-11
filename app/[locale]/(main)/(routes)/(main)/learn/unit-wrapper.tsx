"use client";
import { lessons, levels, styles, units } from "@/db/schema";
import React from "react";
import Unit from "./unit";
import UnitBanner from "./unit-banner";

type Props = {
    units: (typeof units.$inferSelect & {
        lessons: (typeof lessons.$inferSelect & {
            levels: (typeof levels.$inferInsert)[];
        })[];
        style: typeof styles.$inferSelect | null;
    })[];
    courseProgress: {
        activeLevelLesson: typeof levels.$inferSelect;
        activeLevelLessonId: number;
    };
    lessonPercentage: number;
};

type UnitProps = typeof units.$inferSelect & {
    style: typeof styles.$inferSelect | null;
};

const UnitWrapper = ({ units, courseProgress, lessonPercentage }: Props) => {
    const unitRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const [currentUnit, setCurrentUnit] = React.useState<UnitProps | null>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const unitIndex = unitRefs.current.findIndex((ref) => ref === entry.target);
                        if (unitIndex !== -1) {
                            setCurrentUnit(units[unitIndex]);
                        }
                    }
                });
            },
            {
                threshold: 1,
            }
        );

        unitRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [units]);

    return (
        <>
            <UnitBanner
                title={currentUnit?.title}
                description={currentUnit?.description}
                style={{
                    "--path-lever-color": currentUnit?.style?.backgroundColor,
                }}
            />

            {units.map((unit, index) => (
                <div
                    key={unit.id}
                    className="mb-10"
                    ref={(el) => {
                        unitRefs.current[index] = el;
                    }}
                >
                    <Unit
                        id={unit.id}
                        type={unit.type}
                        src={unit.src}
                        order={unit.order}
                        description={unit.description}
                        title={unit.title}
                        lessons={
                            unit.lessons as (typeof lessons.$inferSelect & {
                                levels: (typeof levels.$inferInsert & {
                                    completed: boolean;
                                })[];
                                completed: boolean;
                            })[]
                        }
                        backgroundColor={unit.style?.backgroundColor}
                        activeLessonLevel={courseProgress.activeLevelLesson}
                        activeLessonPercentage={lessonPercentage}
                    />
                </div>
            ))}
        </>
    );
};

export default React.memo(UnitWrapper);
