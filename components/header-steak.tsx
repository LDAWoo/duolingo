"use client";
import { cn } from "@/lib/utils";
import { endOfWeek, format, isToday, startOfWeek } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import React from "react";
import { Steak } from "@/lib/types";
import { Check } from "lucide-react";

type Props = {
    currentSteak: Steak;
    longestSteak: Steak;
    previousSteak: Steak;
};

const HeaderSteak = ({ currentSteak, longestSteak, previousSteak }: Props) => {
    const currentDate = new Date();
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

    const startDate = new Date(currentSteak?.startDate);
    const endDate = new Date(currentSteak?.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const isInThisWeek = startDate <= endOfCurrentWeek && endDate >= startOfCurrentWeek;

    const streakStartDate = isInThisWeek ? startDate : null;
    const streakEndDate = isInThisWeek ? endDate : null;

    const generateWeekDays = () => {
        return Array.from({ length: 7 }, (_, index) => {
            const day = new Date();
            day.setDate(currentDate.getDate() - currentDate.getDay() + index);
            day.setHours(0, 0, 0, 0);

            const formatDay = format(day, "EEEEE", {
                locale: vi,
            });

            let isWithinStreak = false;

            if (streakStartDate && streakEndDate) {
                isWithinStreak = day >= streakStartDate && day <= streakEndDate;
            }

            return {
                day: formatDay,
                isToday: isToday(day),
                isWithinStreak,
            };
        });
    };

    const calendarData = generateWeekDays();

    return (
        <div className="p-[24px_20px_20px] bg-steak">
            <div className="grid grid-cols-[248px,1fr] gap-[22px] items-center mb-6">
                <div className="flex flex-col">
                    <span className="mb-2 font-bold text-[calc(var(--type-base-size)+7px)] text-steak-foreground">{currentSteak ? currentSteak?.length : 0} ngày steak</span>
                    <span className="text-[calc(var(--type-base-size)-1px)] text-wolf">Hãy học một bài học hôm nay để bắt đầu một chuỗi mới!</span>
                </div>
                <div className="h-full relative">
                    <Image src={"/steak-calendar.svg"} height={77} width={64} alt="steak-calendar" />
                </div>
            </div>
            <div className="bg-background p-[12px_16px] rounded-[12px] relative">
                <div className="max-w-[392px] mx-auto text-center w-full">
                    <div className="flex flex-row justify-between">
                        {calendarData.map((day, index) => (
                            <div key={index} className={`flex flex-col items-center p-2 rounded-lg`}>
                                <span
                                    className={cn("w-full whitespace-nowrap font-bold text-[calc(var(--type-base-size)-1px)] text-muted-foreground leading-[25px] m-[0_auto_4px]", {
                                        "text-fox": day.isToday,
                                    })}
                                >
                                    {day.day}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center relative w-full justify-between">
                        {calendarData.map((day, index) => (
                            <div key={index} className="mx-1 flex flex-grow justify-center">
                                <div
                                    className={cn("rounded-[18px] text-background bg-swan flex h-[34px] w-[34px] justify-center items-center", {
                                        "bg-bee ": day.isWithinStreak,
                                    })}
                                >
                                    <Check strokeWidth="5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(HeaderSteak);
