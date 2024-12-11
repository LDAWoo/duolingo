import { create } from "zustand";
import { AvatarStateProps } from "@/lib/constant";

export const defaultStateAvatar: AvatarStateProps = {
    BackgroundColor: 1,
    Body: 1,
    ClothingColor: 1,
    Expression: 1,
    EyeColor: 1,
    FacialHair: 0,
    FacialHairColor: 1,
    Glasses: 0,
    GlassesColor: 1,
    Headwear: 0,
    HeadwearColor: 1,
    MainHair: 58,
    MainHairColor: 1,
    NosePiercing: 0,
    Piercings: 0,
    SkinTone: 15,
    Wrinkles: 0,
};

export const useAvatar = create<{
    avatar: AvatarStateProps;
    setAvatar: (updates: Partial<AvatarStateProps>) => void;
    resetAvatar: () => void;
}>((set) => ({
    avatar: defaultStateAvatar,
    setAvatar: (updates) =>
        set((state) => ({
            avatar: { ...state.avatar, ...updates },
        })),
    resetAvatar: () =>
        set(() => ({
            avatar: defaultStateAvatar,
        })),
}));
