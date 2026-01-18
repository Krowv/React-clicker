import { useReducer, useEffect, type Dispatch, type Reducer } from 'react';

export const usePersistedReducer = <S, A>(
    reducer: Reducer<S, A>,
    initialState: S,
    storageKey: string
): [S, Dispatch<A>] => {

    // Init : Trying to get localStorage, either we're taking the initial one
    const [state, dispatch] = useReducer(reducer, initialState, (defaultState) => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                return { ...defaultState, ...JSON.parse(saved) };
            } catch {
                return defaultState;
            }
        }
        return defaultState;
    });

    // Sync : When state is changing, we save
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state, storageKey]);

    return [state, dispatch];
}