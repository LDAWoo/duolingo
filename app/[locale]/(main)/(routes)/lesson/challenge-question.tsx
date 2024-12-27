"use client";
import { ArrowQuestion, VoiceIcon } from "@/components/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { challengeQuestions, challengeQuestionTranslations } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useAudio } from "react-use";

type Props = {
    questions: (typeof challengeQuestions.$inferSelect & {
        challengeQuestionTranslations: (typeof challengeQuestionTranslations.$inferSelect)[];
    })[];
    audioSrc?: string | null;
    imageSrc?: string | null;
};

const ChallengeQuestion = ({ questions, audioSrc, imageSrc }: Props) => {
    const [audio, _, __, ref] = useAudio({
        src: audioSrc,
        autoPlay: false,
    });

    if (!questions) return null;

    const handlePlay = React.useCallback(() => {
        if (!audioSrc) return;
        if (ref.current) {
            ref.current.pause();
            ref.current.currentTime = 0;

            if (audioSrc) {
                ref.current.src = audioSrc;
                ref.current.load();
                ref.current.oncanplay = () => {
                    ref.current?.play();
                };
            }
        }
    }, [ref, audioSrc]);

    const handleMouseEnter = React.useCallback(
        (audioSrc?: string | null) => {
            if (!audioSrc) return;
            if (ref.current) {
                ref.current.pause();
                ref.current.currentTime = 0;

                if (audioSrc) {
                    ref.current.src = audioSrc;
                    ref.current.load();
                    ref.current.oncanplay = () => {
                        ref.current?.play();
                    };
                }
            }
        },
        [ref]
    );

    React.useEffect(() => {
        if (ref.current) {
            ref.current.load();
            if (audioSrc !== "") {
                ref.current.oncanplay = () => {
                    ref.current?.play();
                };
            }
        }
    }, []);

    return (
        <div className="flex items-center">
            {imageSrc && (
                <div className="aspect-[118/170] relative w-[30%] flex-shrink-0">
                    <Image src={imageSrc} fill alt="" />
                </div>
            )}
            <div
                className={cn("inline-flex flex-col gap-2 my-3 ml-4", {
                    "ml-0": !imageSrc,
                })}
            >
                <div className="relative">
                    <div
                        className={cn("border-2 rounded-[12px] p-[10px_14px] bg-background", {
                            "border-0 p-0": !audioSrc && !imageSrc,
                        })}
                    >
                        <div className="flex items-start w-full text-[calc(var(--type-base-size)+2px)]">
                            {audioSrc && (
                                <span onClick={handlePlay} className="w-[28px] h-[22px] mr-2 cursor-pointer hover:opacity-80">
                                    <VoiceIcon />
                                </span>
                            )}
                            <span className="relative">
                                {questions.map((question, i, array) => (
                                    <React.Fragment key={question.id}>
                                        <Tooltip delayDuration={150}>
                                            <TooltipTrigger asChild>
                                                <span
                                                    className={cn("inline p-[0_0_4px] bg-none", {
                                                        "text-beetle font-bold": question.isNew,
                                                    })}
                                                    style={{
                                                        backgroundRepeat: "no-repeat",
                                                        background: `url(${question.isNew ? "https://d35aaqx5ub95lt.cloudfront.net/images/af821b2d9d7e2fd3cbfce2ed8a0264da.svg" : "https://d35aaqx5ub95lt.cloudfront.net/images/06f94a15de0c0937cce25dc5dc083e6e.svg"}) 0 100% repeat-x`,
                                                    }}
                                                    onMouseEnter={() => handleMouseEnter(question?.audioSrc)}
                                                >
                                                    {question.question}
                                                </span>
                                            </TooltipTrigger>
                                            {question?.challengeQuestionTranslations?.length > 0 && (
                                                <TooltipContent side="bottom" sideOffset={16} className="duration-0 data-[state=closed]:zoom-out-100 bg-polar border-2 border-swan text-foreground rounded-[16px] overflow-visible p-0 relative before:absolute before:left-1/2 before:bottom-[calc(100%_+_2px)] before:translate-y-1/2 before:z-[51] before:-translate-x-1/2 before:w-4 before:h-4 before:rounded-[2px] before:bg-polar before:border-t-2 before:border-l-2 before:rotate-45 ">
                                                    <table>
                                                        <tbody>
                                                            {question.challengeQuestionTranslations.map((translations, index) => (
                                                                <tr key={translations.id}>
                                                                    <td
                                                                        className={cn("p-[15px_10px] text-center leading-[22px] text-[calc(var(--type-base-size)-1px)]", {
                                                                            "border-t-2 border-swan": index !== 0,
                                                                        })}
                                                                    >
                                                                        {translations.translation}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                        {i < array.length && <span className="p-[0_0_4px] inline"> </span>}
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                    </div>
                    {(audioSrc || imageSrc) && <ArrowQuestion className="w-[18px] h-5 text-background absolute -left-4 top-3" />}
                </div>
            </div>
            {audio}
        </div>
    );
};

export default React.memo(ChallengeQuestion);
