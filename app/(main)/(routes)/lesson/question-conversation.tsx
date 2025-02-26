"use client";
import { ArrowQuestion } from "@/components/icons";
import { challengeQuestions, challengeQuestionTranslations } from "@/db/schema";
import Image from "next/image";
import React from "react";
import ChallengeQuestion from "./challenge-question";

type Props = {
    questions: (typeof challengeQuestions.$inferSelect & {
        challengeQuestionTranslations: (typeof challengeQuestionTranslations.$inferSelect)[];
    })[];
    audioSrc?: string | null;
};

const QuestionConversation = ({ audioSrc, questions }: Props) => {
    return (
        <div className="grid gap-2">
            <div className="mr-[20%]">
                <div className="flex flex-row items-start">
                    <Image src={"/images/lucy_avatar_icon.svg"} width={64} height={67} alt="" className="mr-4" />
                    <ChallengeQuestion questions={questions} audioSrc={audioSrc} />
                </div>
            </div>
            <div className="ml-[20%]">
                <div className="flex items-start justify-end">
                    <div className="inline-flex">
                        <div className="relative">
                            <div className="border-2 rounded-[12px] p-[10px_14px] bg-background min-h-[56px]">
                                <span className="inline-flex border-b-2 border-muted-foreground align-bottom">
                                    <span className="w-[70px] inline-flex" />
                                </span>
                            </div>
                            <ArrowQuestion
                                className="w-[18px] h-5 text-background absolute -right-4 top-3 "
                                style={{
                                    scale: "-1 1",
                                }}
                            />
                        </div>
                    </div>
                    <Image src={"/images/lily_avatar_icon.svg"} width={64} height={67} alt="" className="ml-4" />
                </div>
            </div>
        </div>
    );
};

export default React.memo(QuestionConversation);
