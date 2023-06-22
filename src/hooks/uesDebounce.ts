import { useCallback, useEffect, useRef } from 'react';

function useDebounce(fn: Function, delay: number, dep = []) {
    const { current } = useRef<{ fn: Function; time: NodeJS.Timeout | null }>({ fn, time: null });
    useEffect(() => {
        current.fn = fn;
    }, [fn]);

    return useCallback(
        (...args: any) => {
            if (current.time) {
                clearTimeout(current.time);
            }
            current.time = setTimeout(() => {
                current.fn(...args);
            }, delay);
        },
        [dep]
    );
}

export default useDebounce;
