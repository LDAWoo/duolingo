"use client";
import React from "react";
import { vi } from "date-fns/locale";
import { format } from "date-fns";
import Chart from "@/components/global/chart";

type Experience = {
    createdAt?: Date | null;
    updatedAt?: Date | null;
    score?: number | null;
};

type Props = {
    totalExpUser: number;
    totalExpUserProfile: number | undefined;
    userProfileDisplayName: string;
    experiences?: Experience[];
    profileExperiences: Experience[] | undefined;
};

const UserSummaryExperiences = ({ totalExpUser, totalExpUserProfile, userProfileDisplayName, experiences, profileExperiences }: Props) => {
    function getLast7Days() {
        const today = new Date();
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            days.push({
                fullDate: date.toISOString().split("T")[0],
                dayLabel: format(date, "EEEEE", { locale: vi }),
            });
        }
        return days;
    }

    function generateChartData() {
        const days = getLast7Days();

        const experiencesData = days.map(({ fullDate }) => {
            const exp = experiences?.find((e) => e.createdAt && new Date(e.createdAt).toISOString().split("T")[0] === fullDate);
            return exp?.score ?? 0;
        });

        const profileExperiencesData = days.map(({ fullDate }) => {
            const exp = profileExperiences?.find((e) => e.createdAt && new Date(e.createdAt).toISOString().split("T")[0] === fullDate);
            return exp?.score ?? 0;
        });

        return {
            data1: days.map(({ dayLabel }, index) => ({ x: dayLabel, y: experiencesData[index] })),
            data2: days.map(({ dayLabel }, index) => ({ x: dayLabel, y: profileExperiencesData[index] })),
        };
    }

    const { data1, data2 } = generateChartData();

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-[calc(var(--type-base-size)+6px)]">Tổng kết KN tuần</h2>
            </div>

            <div className="p-[28px_28px] rounded-[16px] border-2">
                <div>
                    <div className="pl-4 leading-[20px] text-primary-foreground font-bold flex justify-between text-[calc(var(--type-base-size)+1px)] items-center mb-2">
                        <div className="flex items-center overflow-hidden">
                            <div className="w-[10px] h-[10px] bg-primary-foreground rounded-full mr-2" />
                            <div>{userProfileDisplayName}</div>
                        </div>

                        <div className="flex-[0_0_auto]">{totalExpUserProfile} KN</div>
                    </div>

                    <div className="pl-4 leading-[20px] text-muted-foreground flex justify-between text-[calc(var(--type-base-size)+1px)] items-center mb-6">
                        <div className="flex items-center overflow-hidden">
                            <div className="w-[10px] h-[10px] bg-muted-foreground rounded-full mr-2" />
                            <div>Bạn</div>
                        </div>

                        <div className="flex-[0_0_auto]">{totalExpUser} KN</div>
                    </div>
                </div>
                <div>
                    <Chart data1={data1} data2={data2} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(UserSummaryExperiences);
