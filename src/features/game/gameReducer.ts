import type {GameState, GameAction} from "./gameTypes.ts";

export const initialGameState: GameState = {
    count: 0,
    incrementPerClick: 1,
    incrementAuto: 0,
    priceToUpgradeClick: 10,
    priceToUpgradeAuto: 50
}

export const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + state.incrementPerClick
            }
        case 'UPGRADE_CLICK':
            return {
                ...state,
                count: state.count - action.price,
                incrementPerClick: state.incrementPerClick + 1,
                priceToUpgradeClick: Math.floor(state.priceToUpgradeClick * 1.25)
            }
        case 'UPGRADE_AUTO':
            return {
                ...state,
                count: state.count - action.price,
                incrementAuto: state.incrementAuto + 1,
                priceToUpgradeAuto: Math.floor(state.priceToUpgradeAuto * 1.25)
            }
        case 'AUTO_INCREMENT':
            return {
                ...state,
                count: state.count + state.incrementAuto
            }
        default:
            return state
    }
}