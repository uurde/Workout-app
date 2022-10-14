import { useEffect, useRef, useState } from "react";


export function useCountDown(id: number, initialCount: number) {
    const [countDown, setCountDown] = useState(initialCount);
    const intervalRef = useRef<number>();

    useEffect(() => {
        if (id === -1) return;

        intervalRef.current = window.setInterval(() => {
            setCountDown((count) => {
                return count - 1;
            });
        }, 1000)

        return cleanUp;
    }, [id]);

    useEffect(() => {
        setCountDown(initialCount);
    }, [initialCount]);

    useEffect(() => {
        if (countDown === 0) {
            cleanUp();
        }
    }, [countDown]);

    const cleanUp = () => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    }

    return countDown;
}