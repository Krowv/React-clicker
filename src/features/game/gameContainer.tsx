import {useEffect, useReducer} from "react";
import {gameReducer, initialGameState} from "./gameReducer";
//import {usePersistedReducer} from "../../hooks/usePersistReducer.ts";

export const GameContainer = () => {
    /* Uncomment for localStorage
         const [state, dispatch] = usePersistedReducer(gameReducer, initialGameState, 'save');
     */
    const [state, dispatch] = useReducer(gameReducer, initialGameState);


    useEffect(() => {
        if (state.incrementAuto <= 0) return;

        const interval = setInterval(() => {
            dispatch({ type: 'AUTO_INCREMENT'});
        }, 1000)

        return () => clearInterval(interval)
    }, [dispatch, state.incrementAuto]);

    return (
        <div className="card">
            <p>Score: <strong>{state.count}</strong></p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>
                Click to increment (+{state.incrementPerClick})
            </button>

            <hr />

            <section>
                <button
                    disabled={state.count < state.priceToUpgradeClick}
                    onClick={() => dispatch({ type: 'UPGRADE_CLICK', price: state.priceToUpgradeClick })}
                >
                    Upgrade Click
                </button>
                <p>Cost: {state.priceToUpgradeClick}</p>
            </section>

            <section>
                <button
                    disabled={state.count < state.priceToUpgradeAuto}
                    onClick={() => dispatch({ type: 'UPGRADE_AUTO', price: state.priceToUpgradeAuto })}
                >
                    Upgrade Auto-Click (+{state.incrementAuto}/s)
                </button>
                <p>Cost: {state.priceToUpgradeAuto}</p>
            </section>
        </div>
    );
}