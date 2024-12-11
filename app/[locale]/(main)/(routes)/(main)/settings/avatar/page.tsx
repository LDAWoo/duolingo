import Header from "./header";
import AvatarContainer from "./avatar-container";
import { currentUser } from "@/lib/current-user";
import { Button } from "@/components/ui/button";
const AvatarPage = async () => {
    const user = await currentUser();
    return (
        <div className="flex max-w-[1056px] mx-auto w-full device:pt-6">
            <div className="device:p-[0_24px] flex w-full">
                <div className="flex-1 min-w-0 z-0">
                    <div className="flex flex-col h-auto">
                        <Header href={`/profile/${user?.username}`} title="Chỉnh sửa Ảnh đại diện" />
                        <AvatarContainer />

                        <div className="self-end min-w-[136px] mt-8">
                            <Button disabled={true} variant={"locked"} className="w-full" size={"lg"}>
                                Hoàn tất
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarPage;
