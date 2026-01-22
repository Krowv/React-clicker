import {useEffect, useReducer} from "react";
import {gameReducer, initialGameState} from "./gameReducer";
//import {usePersistedReducer} from "../../hooks/usePersistReducer.ts";
import DisplayData from "../../components/DisplayData.tsx";

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
        <div className="bg-gray-100">
            <div className="flex align-items-center justify-around pt-10">
                <div className="flex flex-col justify-center items-center">
                    <DisplayData title="Money" description={state.count.toString()} variant="blue"/>
                    <button className="border shadow-md p-1 m-2 w-50 rounded-2xl " onClick={() => dispatch({ type: 'INCREMENT' })}>
                        Click to increment
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <DisplayData title="User(s) / day" description={state.incrementPerClick.toString()} variant="ocean" cost={state.priceToUpgradeClick}/>
                    <button
                        className="border shadow-xl p-1 m-2 w-50 rounded-2xl "
                        disabled={state.count < state.priceToUpgradeClick}
                        onClick={() => dispatch({ type: 'UPGRADE_CLICK', price: state.priceToUpgradeClick })}
                    >
                        Upgrade Click
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <DisplayData title="Adds contrats" description={state.incrementAuto.toString()} variant="sunset" cost={state.priceToUpgradeAuto}/>
                    <button
                        className="border shadow-xl p-1 m-2 w-50 rounded-2xl "
                        disabled={state.count < state.priceToUpgradeAuto}
                        onClick={() => dispatch({ type: 'UPGRADE_AUTO', price: state.priceToUpgradeAuto })}
                    >
                        Upgrade Auto-Click (+{state.incrementAuto}/s)
                    </button>
                </div>
                <div className="flex flex-col">
                    <DisplayData title="Price to bring user(s) / day(s)" description={state.priceToUpgradeClick.toString()} variant="purple"/>
                </div>
            </div>
        </div>
    );
}