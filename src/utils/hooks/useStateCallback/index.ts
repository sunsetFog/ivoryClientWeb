import {useRef, useCallback} from 'react';
import {useSetState, useUpdateEffect} from 'ahooks';

export function useStateCallback<T>(init?: T) {
    const [state, setState] = useSetState(init as any);
    const [key, update] = useSetState({});
    const handlers = useRef(new Set()).current;

    useUpdateEffect(() => {
        handlers.forEach((h: any): void => h(state));
        handlers.clear();
    }, [key]);

    const result: [T, any] = [
        state,
        useCallback((s: any, callback: Function) => {
            callback && handlers.add(callback);
            setState(s);

            // 每次state更新都是强制执行， 防止两次state值一样， callback不执行的情况
            update({});
        }, [])
    ];
    return result;
}
