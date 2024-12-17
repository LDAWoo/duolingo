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
