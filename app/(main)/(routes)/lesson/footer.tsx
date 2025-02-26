"use client";
import Loading from "@/components/global/loading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useKey } from "react-use";

type Props = {
    onCheck: () => void;
    status: "correct" | "wrong" | "none" | "completed" | "finish";
    answerCorrect?: string;
    disable?: boolean;
    lessonId?: string;
    loading?: boolean;
};

const Footer = ({ onCheck, status, disable = false, answerCorrect, lessonId, loading }: Props) => {
    useKey("Enter", onCheck, {}, [onCheck]);

    return (
        <footer
            className={cn("device:h-[140px] h-auto border-0 device:border-2", {
                "bg-[rgb(215,255,184)] border-transparent": status === "correct",
                "bg-[rgb(255,223,224)] border-transparent": status === "wrong",
            })}
        >
            <div className="max-w-[1000px] mx-auto relative h-full flex flex-col device:flex-row items-center justify-between px-0 device:px-6">
                {status === "correct" && (
                    <div className="animate-slide-down absolute device:relative left-0 right-0 bottom-0 w-full p-[24px_26px_96px] device:p-[16px_0] bg-[rgb(215,255,184)] flex items-center gap-4 text-[rgb(88,167,0)]">
                        <div className="bg-background hidden device:flex w-[80px] h-[80px] rounded-full items-center justify-center">
                            <Image src={"/correct-question.svg"} alt="" width={41} height={31} />
                        </div>

                        <h2 className="text-[calc(var(--type-base-size)+6px)] device:text-[calc(var(--type-base-size)+12px)] font-bold leading-[26px] device:leading-[30px]">Tuyệt vời</h2>
                    </div>
                )}

                {status === "wrong" && (
                    <div className="animate-slide-down absolute device:relative left-0 right-0 bottom-0 w-full p-[24px_26px_96px] device:p-[16px_0] bg-[rgb(255,223,224)] flex items-center gap-4 text-[rgb(234,43,43)]">
                        <div className="bg-background hidden device:flex w-[80px] h-[80px] rounded-full items-center justify-center">
                            <Image src={"/wrong-question.svg"} alt="" width={31} height={31} />
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-[calc(var(--type-base-size)+6px)] device:text-[calc(var(--type-base-size)+12px)] font-bold leading-[26px] device:leading-[30px]">Đáp án đúng:</h2>
                            {answerCorrect && <div className="text-[calc(var(--type-base-size)-2px)]">{answerCorrect}</div>}
                        </div>
                    </div>
                )}

                {status === "completed" && (
                    <Button
                        onClick={() => {
                            window.location.href = `/lesson/${lessonId}`;
                        }}
                        className="w-full device:w-fit min-w-[150px] ml-auto text-[calc(var(--type-base-size)-1px)]"
                        size={"lg"}
                    >
                        {"Bỏ qua"}
                    </Button>
                )}

                {/* {status === "finish" && (
                    <Button
                        onClick={() => {
                            //modal
                        }}
                        className="w-full device:w-fit min-w-[150px] ml-auto text-[calc(var(--type-base-size)-1px)]"
                        size={"lg"}
                        variant={"ghostOutline"}
                    >
                        {"Xem lại bài học"}
                    </Button>
                )} */}

                <div className="relative w-full p-[0_16px_16px_16px] device:p-0 flex device:justify-end">
                    <Button variant={loading ? "secondary" : disable ? "locked" : status === "wrong" ? "danger" : "secondary"} disabled={disable} className={cn("w-full relative device:w-fit min-w-[150px] ml-auto text-[calc(var(--type-base-size)-1px)]")} size={"lg"} onClick={onCheck}>
                        {!loading && status === "none" && "Kiểm tra"}
                        {!loading && status === "correct" && "Tiếp tục"}
                        {!loading && status === "wrong" && "Tiếp tục"}
                        {!loading && status === "completed" && "Tiếp tục"}
                        {!loading && status === "finish" && "Tiếp tục"}
                        {loading && <Loading />}
                    </Button>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
