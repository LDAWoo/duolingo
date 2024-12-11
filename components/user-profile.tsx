import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

type Props = {
    displayName?: string | null;
    username?: string;
    createdAt?: Date | null;
    activeCourse: {
        title: string;
        imageSrc: string;
    };
};
const UserProfile = ({ displayName, username, activeCourse, createdAt }: Props) => {
    const formattedDate = createdAt
        ? format(new Date(createdAt), "LLLL yyyy", {
              locale: vi,
          })
        : "N/A";

    return (
        <div className="pb-4 mt-2 border-b-2 flex">
            <div className="flex-1 flex flex-row">
                <div className="flex flex-1 flex-col">
                    <h1 className="mb-[6px] text-[calc(var(--type-base-size)+10px)] leading-[34px] font-bold break-words">
                        <span>{displayName}</span>
                        <div className="leading-[22px] text-[calc(var(--type-base-size)-1px)] font-normal text-muted-foreground">{username}</div>
                    </h1>

                    <div className="mr-5 text-wolf">
                        <div className="flex flex-row mb-4">
                            <span className="mr-[5px] text-[calc(var(--type-base-size)-1px)] whitespace-nowrap">Đã tham gia {formattedDate}</span>
                        </div>
                        <div className="flex flex-row gap-4 mb-4 ">
                            <button type="button" className="whitespace-nowrap text-primary-foreground font-bold text-[calc(var(--type-base-size)-2px)] mr-[3px] leading-[24px] duration-150 transition-all hover:opacity-85">
                                Đang theo dõi 0
                            </button>
                            <button type="button" className="whitespace-nowrap text-primary-foreground font-bold text-[calc(var(--type-base-size)-2px)] mr-[3px] leading-[24px] duration-150 transition-all hover:opacity-85">
                                0 Người theo dõi
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-[1_0_118px] flex-col-reverse">
                    <button type="button" className="flex items-center -ml-1 p-[10px_0] self-end mb-[6px] hover:opacity-80">
                        <Image width={31} height={24} src={activeCourse.imageSrc} alt={activeCourse.title} className="rounded-md" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(UserProfile);
