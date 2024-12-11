"use client";

import { useExitModal } from "@/hooks/use-exit-modal";
import useMounted from "@/hooks/use-mounted";
import { useRouter } from "@/i18n/routing";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

export const ExitModal = () => {
    const router = useRouter();
    const isMounted = useMounted();
    const { isOpen, onClose } = useExitModal();

    if (!isMounted) return;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[calc(100%_-_48px)] max-w-[384px] !rounded-2xl gap-0" showX={false}>
                <DialogHeader>
                    <div className="flex items-center w-full justify-center">
                        <Image src={"/mascot-sad.svg"} alt="" width={120} height={120} />
                    </div>
                    <DialogTitle className="mt-3 text-center font-bold text-[calc(var(--type-base-size)+6px)]">Đợi chút, đừng đi mà! Bạn sẽ mất hết tiến trình của bài học này nếu thoát bây giờ</DialogTitle>
                </DialogHeader>

                <DialogFooter className="mt-8">
                    <div>
                        <Button onClick={onClose} variant={"primary"} className="w-full text-[calc(var(--type-base-size)-3px)]" size={"lg"}>
                            Tiếp tục học
                        </Button>

                        <Button
                            onClick={() => {
                                onClose();
                                router.push({
                                    pathname: "/learn",
                                });
                            }}
                            variant={"dangerOutline"}
                            className="mt-1 w-full hover:bg-transparent text-[calc(var(--type-base-size)-3px)]"
                            size={"lg"}
                        >
                            Dừng lại
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
