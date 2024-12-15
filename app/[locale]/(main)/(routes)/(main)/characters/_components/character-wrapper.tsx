import { alphabets, characters } from "@/db/schema";
import React from "react";
import Alphabet from "./alphabet";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

type Props = {
    alphabets: (typeof alphabets.$inferSelect & {
        characters: (typeof characters.$inferSelect)[];
    })[];
};

const CharacterWrapper = ({ alphabets }: Props) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap justify-center">
                <div className="grid p-[19px_0] m-[0_20px] relative w-full leading-[1.6]">
                    <div className="p-[0_24px]">
                        <div className="text-[calc(var(--type-base-size)+14px)] text-eel font-bold text-center mb-[10px]">Cùng học phát âm tiếng Anh nào!</div>
                        <div className="text-[calc(var(--type-base-size)+1px)] text-wolf leading-[1.4] text-center">Tập nghe và học phát âm các âm trong tiếng Anh</div>
                    </div>
                    <div className="mx-auto mt-5 mb-[10px] w-[60%]">
                        <Link href={"/alphabets/pronunciation"}>
                            <Button variant={"primary"} className="w-full text-[calc(var(--type-base-size)-2px)]">
                                Bắt đầu +10 KN
                            </Button>
                        </Link>
                    </div>
                </div>
                {alphabets.map((alphabet) => (
                    <Alphabet key={alphabet.id} title={alphabet.title} characters={alphabet.characters} />
                ))}
            </div>
        </div>
    );
};

export default CharacterWrapper;
