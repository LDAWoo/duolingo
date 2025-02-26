import { characters } from "@/db/schema";
import React from "react";
import Card from "./card";

type Props = {
    title: string;
    characters: (typeof characters.$inferSelect)[];
};

const Alphabet = ({ title, characters }: Props) => {
    return (
        <div className="max-w-[500px] grid gap-5 w-full items-center">
            <div className="inline-flex pt-5">
                <span className="my-auto h-[2px] w-full bg-swan align-middle" />
                <div className="whitespace-nowrap text-center relative text-[calc(var(--type-base-size)+2px)] font-bold mx-2">{title}</div>
                <span className="my-auto h-[2px] w-full bg-swan align-middle" />
            </div>

            <div className="grid gap-2 grid-cols-[repeat(3,1fr)]">
                {characters.map((character, index) => (
                    <Card key={character.id} name={character.name} transliteration={character.transliteration} audioSrc={character.audioSrc} />
                ))}
            </div>
        </div>
    );
};

export default Alphabet;
