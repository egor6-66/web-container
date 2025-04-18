import { DependencyList, useEffect } from 'react';

import useTimeoutFn from '../useTimeoutFn';

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounce(fn: () => void, ms = 0, deps: DependencyList = []): UseDebounceReturn {
    const { isReady, clear, reset } = useTimeoutFn(fn, ms);
    useEffect(reset, deps);

    return [isReady, clear];
}
