import { getLeaderboard } from "@/actions/leader-board";
import { getLeagues } from "@/actions/league";
import UserProgress from "@/components/user-progress";
import { getSteaks, getUser } from "@/db/queries";
import React from "react";
import LeagueHeader from "./_components/league-header";
import LeaderBoard from "./_components/leaderboard";
import NotLeaderBoard from "./_components/not-leaderboard";
import WhatLeaderBoard from "./_components/what-leaderboard";
import { redirect } from "next/navigation";

const LeaderBoardPage = async () => {
    const userData = getUser();
    const steakData = getSteaks();
    const leagueData = getLeagues();
    const leaderBoardData = getLeaderboard();

    const [user, steaks, leagues, leaderboard] = await Promise.all([userData, steakData, leagueData, leaderBoardData]);

    if (!user?.userProgress || !user?.userProgress?.activeCourse) {
        return redirect("/courses");
    }

    return (
        <div className="flex flex-col md:flex-row-reverse gap-0 md:gap-[28px] md:px-6 md:pt-6">
            <div className="w-full md:w-[368px] gap-4 flex flex-col">
                {leaderboard && (
                    <UserProgress
                        activeCourse={{
                            title: user.userProgress.activeCourse.title,
                            imageSrc: user.userProgress.activeCourse.imageSrc,
                        }}
                        steaks={steaks}
                        hearts={user.userProgress.hearts}
                        points={user.userProgress.points}
                        gems={user.userProgress.gems}
                        hasActiveSubscription={false}
                    />
                )}
                {!leaderboard && <WhatLeaderBoard />}
            </div>

            <div className="flex flex-col w-full max-w-[592px] text-center">
                {!leaderboard && <NotLeaderBoard />}
                {leaderboard && leagues && (
                    <>
                        <LeagueHeader leagues={leagues} name={leaderboard?.leagueName as string} activeLeagueId={leaderboard?.leagueId as number} />
                        <LeaderBoard ranks={leaderboard?.ranks} userId={user.id} />
                    </>
                )}
            </div>
        </div>
    );
};

export default LeaderBoardPage;
