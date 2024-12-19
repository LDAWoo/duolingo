import { useCallback, useEffect, useState } from "react";

interface Dimension {
    width: number;
    height: number;
}

export const useDimensions = (ref: { current: HTMLElement | null }): Dimension => {
    const [dimensions, setDimensions] = useState<Dimension>({
        width: 0,
        height: 0,
    });

    const handleDimensions = useCallback(() => {
        const element = ref.current && ref.current.getBoundingClientRect();
        setDimensions({ width: element?.width || 0, height: element?.height || 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current]);

    useEffect(() => {
        handleDimensions();
        window.addEventListener("resize", handleDimensions);
        return () => {
            window.removeEventListener("resize", handleDimensions);
        };
    }, [handleDimensions]);

    return { width: dimensions.width, height: dimensions.height };
};
