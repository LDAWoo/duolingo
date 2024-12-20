export type Steak = {
    startDate: string;
    endDate: string;
    lastExtendedDate?: string;
    achieveDate?: string;
    length: number;
};

export type SteakMap = {
    [key: string]: Steak;
};

export enum EVENT_TYPE {
    FOLLOW = "FOLLOW",
    UN_FOLLOW = "UN_FOLLOW",
}

export type Follow = {
    id: number;
    userId: string;
    username: string;
    displayName: string;
    picture: string;
    totalXp: number;
    isFollowing: boolean;
    isFollowedBy: boolean;
    canFollow: boolean;
} | null;

export interface ChartDataPoint {
    x: string;
    y: number;
}

export type Rank = {
    username: string;
    userId: number;
    avatarUrl: string;
    score: number;
    displayName: string;
};

export type Leaderboard = {
    leagueId: number;
    leagueName: string;
    leagueSrc: string;
    ranks: Rank[];
};
