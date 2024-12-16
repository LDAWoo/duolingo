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
