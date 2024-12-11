"use client";
import { useModal } from "@/providers/modal-provider";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const AuthenticationModal = () => {
    const { isOpen, type, onClose } = useModal();

    const isModalOpen = isOpen && type === "authentication";

    if (!isModalOpen) return null;

    const handleAuthGoogle = () => {
        signIn("auth0");
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-background z-[310] overflow-y-scroll">
            <div className="flex flex-col items-center justify-center min-h-screen w-full p-[30px]">
                <div
                    onClick={() => {
                        onClose();
                    }}
                    className="absolute left-[30px] top-[30px] right-auto z-10 cursor-pointer"
                >
                    <Image src={"/close.svg"} alt="Close" width={16} height={16} />
                </div>

                <div className="absolute right-[30px] top-[30px] left-auto z-10">
                    <Button variant={"primaryOutline"} className="h-[50px] px-4 text-[calc(var(--type-base-size)-3px)]">
                        Đăng ký
                    </Button>
                </div>

                <form className="w-[375px] text-center">
                    <h1 className="text-[calc(var(--type-base-size)+8px)] mt-[10px] mb-[15px] font-bold">Đăng nhập</h1>
                    <div></div>

                    <Button className="w-full text-[calc(var(--type-base-size)-3px)]" variant={"primary"} size={"lg"}>
                        Đăng nhập
                    </Button>

                    <p className="grid grid-cols-2 gap-[15px] mt-5">
                        <Button variant={"primaryOutline"} size={"lg"}>
                            <Image src={"/facebook.svg"} alt="Facebook" width={12} height={22} className="mr-[10px]" />
                            <span className="text-[rgb(59,89,152)] text-[calc(var(--type-base-size)-3px)]">Facebook</span>
                        </Button>

                        <Button variant={"primaryOutline"} onClick={handleAuthGoogle} size={"lg"}>
                            <Image src={"/google.svg"} alt="Google" width={20} height={21} className="mr-[10px]" />
                            <span className="text-[rgb(59,89,152)] text-[calc(var(--type-base-size)-3px)]">Google</span>
                        </Button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default React.memo(AuthenticationModal);
