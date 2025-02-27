"use client";
import React from "react";
import { useAudio } from "react-use";

type Props = {
    status: "correct" | "wrong" | "none";
};

const Audio = ({ status }: Props) => {
    const [audioCorrect, _, controlCorrect] = useAudio({
        src: "/audio/correct.mp3",
    });

    const [audioWrong, __, controlWrong] = useAudio({
        src: "/audio/wrong.mp3",
    });

    React.useEffect(() => {
        if (status === "correct") {
            handleCorrect();
            return;
        }
        if (status === "wrong") {
            handleWrong();
            return;
        }
    }, [status]);

    const handleCorrect = React.useCallback(() => {
        controlCorrect.play();
    }, [controlCorrect]);

    const handleWrong = React.useCallback(() => {
        controlWrong.play();
    }, [controlWrong]);

    return (
        <div className="hidden">
            {audioCorrect}
            {audioWrong}
        </div>
    );
};

export default React.memo(Audio);
