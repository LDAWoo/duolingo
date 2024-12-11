"use client";
import { challengeOptions, challengeParts, challenges } from "@/db/schema";
import { useRouter } from "@/i18n/routing";
import React from "react";
import Audio from "./audio";
import Challenge from "./challenge";
import ChallengeMatch from "./challenge-match";
import Finish from "./finish";
import Footer from "./footer";
import Header from "./header";
import QuestionBubble from "./question-bubble";
import QuestionAudio from "./question-audio";
import QuestionConversation from "./question-conversation";
import ChallengeFill from "./challenge-fill";

type Props = {
    initialLessonId: number;
    initialHearts: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: (typeof challengeOptions.$inferSelect)[];
        challengeParts: (typeof challengeParts.$inferSelect)[];
    })[];
    initialPercentage: number;
    userSubscription: any;
};

type ChallengePartOption = typeof challengeParts.$inferSelect;

const Quiz: React.FC<Props> = ({ initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscription }) => {
    const router = useRouter();
    const workerRef = React.useRef<Worker | null>(null);
    const [hearts, setHearts] = React.useState(initialHearts);

    const [percentage, setPercentage] = React.useState(initialPercentage);

    const [challenges] = React.useState(initialLessonChallenges);

    const [activeIndex, setActiveIndex] = React.useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);

        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
    const [selectedMatchOption, setSelectedMatchOption] = React.useState<ChallengePartOption[] | []>([]);
    const [status, setStatus] = React.useState<"correct" | "wrong" | "none">("none");
    const [pending, setPending] = React.useState<"pending" | "none" | "completed">("none");

    React.useEffect(() => {
        workerRef.current = new Worker(new URL("/workers/challenge-progress-workers.js", process.env.NEXT_PUBLIC_URL));

        workerRef.current.onmessage = (event) => {
            if (event.data.message === "completed") {
                setPending("completed");
            } else if (event.data.message === "none") {
                setPending("none");
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const challenge = challenges[activeIndex];

    const options = challenge?.challengeOptions;

    const optionsParts = challenge?.challengeParts;

    const onNext = React.useCallback(() => {
        setActiveIndex((prev) => prev + 1);
    }, []);

    const onSelect = React.useCallback(
        (id: number) => {
            if (status !== "none") return;
            setSelectedOption(id);
        },
        [status]
    );

    const onSelectOption = React.useCallback(
        (options: ChallengePartOption[]) => {
            if (status !== "none") return;
            setSelectedMatchOption(options);
        },
        [status]
    );

    const onContinue = () => {
        switch (challenge.type) {
            case "MATCH":
            case "FILL":
                if (selectedMatchOption.length === 0) return;

                if (status === "wrong") {
                    setStatus("none");
                    setSelectedMatchOption([]);
                    return;
                }

                if (status === "correct") {
                    onNext();
                    setStatus("none");
                    setSelectedMatchOption([]);
                    return;
                }

                const correctMatchOptions = optionsParts.sort((a, b) => a.order - b.order).filter((o) => o.correct);

                if (!correctMatchOptions) return;

                const isCorrectOrder = selectedMatchOption.length === correctMatchOptions.length && selectedMatchOption.every((o, index) => o.text === correctMatchOptions[index]?.text && o.correct === correctMatchOptions[index]?.correct);

                if (isCorrectOrder) {
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                    setPending("pending");
                    workerRef.current?.postMessage({ lessonId: initialLessonId, challengeId: challenge.id });
                } else {
                    setStatus("wrong");
                }

                break;
            case "SELECT":
            case "ASSIST":
            case "LISTEN":
            case "CONVERSATION":
                if (!selectedOption) return;

                if (status === "wrong") {
                    setStatus("none");
                    setSelectedOption(null);
                    return;
                }

                if (status === "correct") {
                    onNext();
                    setStatus("none");
                    setSelectedOption(null);
                    return;
                }
                const correctOption = options.find((option) => option.correct);

                if (!correctOption) return;

                if (correctOption.id === selectedOption) {
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                    setPending("pending");
                    workerRef.current?.postMessage({ lessonId: initialLessonId, challengeId: challenge.id });
                } else {
                    setStatus("wrong");
                }
                break;
            default:
                return;
        }
    };

    const getTitle = () => {
        switch (challenge?.type) {
            case "ASSIST":
                return "Chọn nghĩa đúng";
            case "LISTEN":
                return "Bạn nghe được gì?";
            case "MATCH":
                if (!challenge?.question || challenge?.question === null) {
                    return "Nhấn vào những gì bạn nghe";
                }
                return "Viết lại bằng Tiếng Việt";
            case "CONVERSATION":
                return "Hoàn thành hội thoại";
            case "FILL":
                return "Điền vào chỗ trống";
            case "SELECT":
                return challenge?.question;
            default:
                return challenge?.question;
        }
    };

    const onDisableButton = () => {
        switch (challenge.type) {
            case "MATCH":
            case "FILL":
                return selectedMatchOption.length === 0;
            case "SELECT":
            case "ASSIST":
            case "LISTEN":
            case "CONVERSATION":
                return !selectedOption;
            default:
                return false;
        }
    };

    const onAnswerCorrect = () => {
        let text = "";
        switch (challenge.type) {
            case "MATCH":
            case "FILL":
                const correctMatchOptions = optionsParts.sort((a, b) => a.order - b.order).filter((o) => o.correct);

                if (correctMatchOptions.length > 0) {
                    text = correctMatchOptions.map((o) => o.text).join(" ");
                } else {
                    text = "Không có lựa chọn đúng";
                }
                return text;
            case "SELECT":
            case "ASSIST":
            case "LISTEN":
            case "CONVERSATION":
                const correctOption = options.find((option) => option.correct);
                text = correctOption ? correctOption.text : "Không có đáp án đúng";
                return text;

            default:
                return "Loại câu hỏi không hợp lệ";
        }
    };

    if (!challenge) {
        return (
            <>
                <Finish points={challenges.length * 10} hearts={hearts} />
                <Footer disable={pending === "pending"} status={"finish"} onCheck={() => router.push({ pathname: "/learn" })} />
            </>
        );
    }

    return (
        <>
            <Header hearts={hearts} status={status} percentage={percentage} hasActiveSubscription={!!userSubscription?.isActive} />
            <div className="flex-1">
                <div className="grid h-full w-full items-center justify-center grid-rows-[minmax(0,1fr)] grid-cols-1 device:grid-cols-[min-content] device:grid-rows-[min-content] p-[24px_16px]">
                    <div key={challenge.id} className="animate-slide-left device:min-h-[450px] device:w-[600px] w-full grid grid-rows-[min-content,minmax(0,1fr)] gap-4 overflow-y-auto overflow-x-hidden device:overflow-y-visible device:gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="text-[rgb(206,130,255)] inline-flex items-center">
                                <span className="mr-[3px]">
                                    <svg height="32" preserveAspectRatio="xMidYMin slice" width="32" viewBox="0 0 33 32">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.5 28C23.1274 28 28.5 22.6274 28.5 16C28.5 9.37258 23.1274 4 16.5 4C9.87258 4 4.5 9.37258 4.5 16C4.5 22.6274 9.87258 28 16.5 28ZM11.8184 14.0055C11.3302 13.5173 11.3302 12.7259 11.8184 12.2377L14.1165 9.9396C14.6046 9.45145 15.3961 9.45145 15.8843 9.9396L18.1823 12.2377C18.6705 12.7259 18.6705 13.5173 18.1823 14.0055L15.8843 16.3036C15.3961 16.7917 14.6046 16.7917 14.1165 16.3036L11.8184 14.0055ZM18.586 16.4145C18.1955 16.805 18.1955 17.4382 18.586 17.8287L19.6467 18.8893C20.0372 19.2799 20.6704 19.2799 21.0609 18.8893L22.1215 17.8287C22.5121 17.4382 22.5121 16.805 22.1215 16.4145L21.0609 15.3538C20.6704 14.9633 20.0372 14.9633 19.6467 15.3538L18.586 16.4145ZM14.9356 20.5646C14.6427 20.8575 14.6427 21.3324 14.9356 21.6253L15.6427 22.3324C15.9356 22.6253 16.4105 22.6253 16.7034 22.3324L17.4105 21.6253C17.7034 21.3324 17.7034 20.8575 17.4105 20.5646L16.7034 19.8575C16.4105 19.5646 15.9356 19.5646 15.6427 19.8575L14.9356 20.5646Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                                <span className="text-[calc(var(--type-base-size)-2px)] font-bold uppercase">Từ vựng mới</span>
                            </div>
                            <h1 className="font-bold leading-[1.25] text-[calc(var(--type-base-size)+8px)] min-[700px]:text-[calc(var(--type-base-size)+14px)]">{getTitle()}</h1>
                        </div>
                        <div className="grid items device:items-center">
                            {(challenge.type === "ASSIST" || challenge.type === "MATCH") && <QuestionBubble question={challenge?.question} audioSrc={challenge?.audioSrc} />}
                            {challenge.type === "LISTEN" && <QuestionAudio question={challenge?.question} audioSrc={challenge?.audioSrc} />}
                            {challenge.type === "CONVERSATION" && <QuestionConversation question={challenge?.question} audioSrc={challenge?.audioSrc} />}
                            {(challenge.type === "SELECT" || challenge.type === "ASSIST" || challenge.type === "LISTEN" || challenge.type === "CONVERSATION") && <Challenge options={options} onSelect={onSelect} status={status} selectedOption={selectedOption} disable={!!selectedOption && status !== "none"} type={challenge?.type} />}
                            {challenge.type === "MATCH" && <ChallengeMatch options={optionsParts} onSelectOption={onSelectOption} status={status} type={challenge?.type} />}
                            {challenge.type === "FILL" && <ChallengeFill question={challenge?.question} imageSrc={challenge?.imageSrc} options={optionsParts} onSelectOption={onSelectOption} status={status} />}
                        </div>
                    </div>
                </div>
            </div>
            <Audio status={status} />
            <Footer disable={onDisableButton()} status={status} answerCorrect={onAnswerCorrect()} onCheck={onContinue} />
        </>
    );
};

export default React.memo(Quiz);
