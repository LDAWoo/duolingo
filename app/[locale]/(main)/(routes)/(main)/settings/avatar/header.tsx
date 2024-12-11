import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import React from "react";

type Props = {
    href: string;
    title: string;
};

const Header = ({ href, title }: Props) => {
    return (
        <div>
            <Link href={href} className="flex items-center mb-6 text-muted-foreground">
                <ArrowLeft className="h-8 w-8 stroke-2" />
                <h1 className="leading-[27px] font-bold text-[calc(var(--type-base-size)+6px)] ml-4">{title}</h1>
            </Link>
        </div>
    );
};

export default React.memo(Header);
