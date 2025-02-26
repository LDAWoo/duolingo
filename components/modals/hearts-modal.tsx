"use client";
import { recoveryHearts } from "@/actions/user-progress";
import { useModal } from "@/providers/modal-provider";
import Image from "next/image";
import React from "react";
import Loading from "../global/loading";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";

const HeartsModal = () => {
    const router = useRouter();
    const { isOpen, type, onClose } = useModal();
    const [pending, startTransition] = React.useTransition();

    const isModalOpen = isOpen && type === "hearts";

    if (!isModalOpen) return null;

    const handleRecoveryFree = () => {
        startTransition(() => {
            recoveryHearts()
                .then(() => {
                    onClose();
                })
                .catch((err) => {
                    console.error("Hearts recovery failed:", err);
                });
        });
    };

    return (
        <Dialog open={isModalOpen}>
            <DialogContent className="w-[calc(100%_-_48px)] max-w-[384px] !rounded-2xl gap-0" showX={false}>
                <DialogHeader>
                    <div className="flex items-center w-full justify-end text-primary-foreground">
                        <Image src={"/gems.svg"} width={28} height={28} alt="" />
                        <span className="font-bold text-[calc(var(--type-base-size)-3px)] ml-1">500</span>
                    </div>
                    <DialogTitle className="mt-3 text-center font-bold text-[calc(var(--type-base-size)+6px)]">Bạn đã hết trái tim!</DialogTitle>
                </DialogHeader>

                <div></div>

                <DialogFooter className="mt-8">
                    <div className="w-full">
                        <Button disabled={pending} onClick={handleRecoveryFree} variant={"primary"} className="w-full text-[calc(var(--type-base-size)-3px)]" size={"lg"}>
                            {pending && <Loading />}
                            <span>{!pending && "Hồi phục miễn phí"}</span>
                        </Button>

                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                router.push("/learn");
                            }}
                            className="h-[46px] border-none text-primary-foreground hover:opacity-80 text-[calc(var(--type-base-size)-3px)] uppercase font-bold flex justify-center items-center w-full"
                        >
                            Không cảm ơn
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default React.memo(HeartsModal);
