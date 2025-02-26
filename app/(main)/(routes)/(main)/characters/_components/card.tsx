"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { useAudio } from "react-use";

type Props = {
    name: string;
    transliteration: string;
    audioSrc: string;
};

const Card = ({ name, transliteration, audioSrc }: Props) => {
    const [audio, _, __, ref] = useAudio({
        src: "/audio/none.mp3",
        autoPlay: false,
    });

    const handleAudioPlay = (audioSrc: string | null) => {
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
    };

    React.useEffect(() => {
        if (ref.current) {
            ref.current.load();
        }
    }, []);

    return (
        <Button onClick={() => handleAudioPlay(audioSrc)} className="active:translate-y-[2px] before:shadow-[0_2px_0_hsl(var(--border))] font-normal h-fit p-[10px_0_5px] normal-case">
            <span className="flex flex-col w-full">
                <span className="text-[calc(var(--type-base-size)+1px)] leading-none text-eel">{name}</span>
                <span className="text-[calc(var(--type-base-size)-3px)] text-muted-foreground leading-none mb-[5px]">{transliteration}</span>
                <span className="max-w-[40px] w-[60%] mx-auto">
                    <Progress
                        value={0}
                        className="bg-bee"
                        style={{
                            height: "8px",
                        }}
                    />
                </span>
            </span>
            {audio}
        </Button>
    );
};

export default Card;
