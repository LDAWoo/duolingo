"use client";
import { challengeOptions, challengeParts, challengeQuestions, challengeQuestionTranslations, challenges } from "@/db/schema";
import { useModal } from "@/providers/modal-provider";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import React from "react";
import Audio from "./audio";
import Challenge from "./challenge";
import ChallengeFill from "./challenge-fill";
import ChallengeMatch from "./challenge-match";
import ChallengeQuestion from "./challenge-question";
import Finish from "./finish";
import Footer from "./footer";
import Header from "./header";
import QuestionAudio from "./question-audio";
import QuestionBubble from "./question-bubble";
import QuestionConversation from "./question-conversation";

type Props = {
    initialLessonId: number;
    initialHearts: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: (typeof challengeOptions.$inferSelect)[];
        challengeParts: (typeof challengeParts.$inferSelect)[];
        challengeQuestions: (typeof challengeQuestions.$inferSelect & {
            challengeQuestionTranslations: (typeof challengeQuestionTranslations.$inferSelect)[];
        })[];
    })[];
    initialPercentage: number;
    userSubscription: any;
};

type ChallengePartOption = typeof challengeParts.$inferSelect;

const Quiz: React.FC<Props> = ({ initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscription }) => {
    const router = useRouter();
    const { onOpen } = useModal();
    const workerRef = React.useRef<Worker | null>(null);
    const userProgressWorkerRef = React.useRef<Worker | null>(null);
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
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        workerRef.current = new Worker(new URL("/workers/challenge-progress-workers.js", process.env.NEXT_PUBLIC_URL));
        userProgressWorkerRef.current = new Worker(new URL("/workers/user-progress-workers.js", process.env.NEXT_PUBLIC_URL));

        workerRef.current.onmessage = (event) => {
            if (event.data.message === "completed") {
                setPending("completed");
            } else if (event.data.message === "none") {
                setPending("none");
            }
        };

        return () => {
            workerRef.current?.terminate();
            userProgressWorkerRef.current?.terminate();
        };
    }, []);

    React.useEffect(() => {
        if (hearts === 0) {
            onOpen("hearts");
        }
    }, [hearts]);

    const challenge = challenges[activeIndex];

    const options = challenge?.challengeOptions;

    const optionsParts = challenge?.challengeParts;

    const onNext = async () => {
        if (activeIndex === challenges.length - 1) {
            const url = qs.stringifyUrl({ url: "/api/steaks" });
            try {
                setLoading(true);
                await axios.post(url);
                setLoading(false);
                setActiveIndex((prev) => prev + 1);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        } else {
            setActiveIndex((prev) => prev + 1);
        }
    };

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
                    handleWrong();
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
                    handleWrong();
                }
                break;
            default:
                return;
        }
    };

    const handleWrong = () => {
        setStatus("wrong");
        if (hearts === 0) {
            return;
        }
        setHearts((prev) => Math.max(prev - 1, 0));
        userProgressWorkerRef.current?.postMessage({ challengeId: challenge.id });
    };

    const getTitle = () => {
        switch (challenge?.type) {
            case "ASSIST":
                return "Chọn nghĩa đúng";
            case "LISTEN":
                return "Bạn nghe được gì?";
            case "MATCH":
                if (!challenge?.question && challenge?.challengeQuestions.length === 0) {
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
        const loading = pending === "pending";
        return (
            <>
                <Finish points={Math.max(100)} exp={10} totalCompleted={challenges.length} />
                <Footer disable={loading} loading={loading} status={"finish"} onCheck={() => router.push("/learn")} />
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
                            <h1 className="font-bold leading-[1.25] text-[calc(var(--type-base-size)+8px)] min-[700px]:text-[calc(var(--type-base-size)+14px)]">{getTitle()}</h1>
                        </div>
                        <div className="grid items-start device:items-center mb-2">
                            {challenge.type !== "CONVERSATION" && challenge?.challengeQuestions.length > 0 && <ChallengeQuestion questions={challenge?.challengeQuestions} audioSrc={challenge?.audioSrc} imageSrc={challenge?.imageSrc} />}
                            {(challenge.type === "ASSIST" || (challenge.type === "MATCH" && challenge?.challengeQuestions.length === 0)) && <QuestionBubble question={challenge?.question} audioSrc={challenge?.audioSrc} imageSrc={challenge.imageSrc} />}
                            {challenge.type === "LISTEN" && <QuestionAudio audioSrc={challenge?.audioSrc} />}
                            {challenge.type === "CONVERSATION" && <QuestionConversation questions={challenge?.challengeQuestions} audioSrc={challenge?.audioSrc} />}
                            {(challenge.type === "SELECT" || challenge.type === "ASSIST" || challenge.type === "LISTEN" || challenge.type === "CONVERSATION") && <Challenge options={options} onSelect={onSelect} status={status} selectedOption={selectedOption} disable={!!selectedOption && status !== "none"} type={challenge?.type} />}
                            {challenge.type === "MATCH" && <ChallengeMatch options={optionsParts} onSelectOption={onSelectOption} status={status} type={challenge?.type} />}
                            {challenge.type === "FILL" && <ChallengeFill question={challenge?.question} imageSrc={challenge?.imageSrc} options={optionsParts} onSelectOption={onSelectOption} status={status} />}
                        </div>
                    </div>
                </div>
            </div>
            <Audio status={status} />
            <Footer loading={loading} disable={onDisableButton() || loading} status={status} answerCorrect={onAnswerCorrect()} onCheck={onContinue} />
        </>
    );
};

export default React.memo(Quiz);
