import { useState, useEffect } from "react";

const useScroll = (callback = () => {}) => {
    const [scrollY, setScrollY] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
            setIsScroll(window.scrollY > 0);
            callback();
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            setIsScroll(false);
        };
    }, []);

    return { scrollX, scrollY, isScroll };
};

export default useScroll;
