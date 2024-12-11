import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

type Props = {
    title: string;
};

const Header = ({ title }: Props) => {
    return (
        <div className="sticky top-0 bg-white pb-4 lg:pt-[35px] border-b-2 mb-[14px] text-neutral-400 lg:z-50">
            <Link href={"/courses"} className="flex items-center">
                <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
                <h1 className="leading-[27px] font-bold text-[calc(var(--type-base-size)+4px)] ml-4">{title}</h1>
            </Link>
        </div>
    );
};

export default Header;
