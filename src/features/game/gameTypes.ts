export interface GameState {
    count: number;
    incrementPerClick: number;
    incrementAuto: number;
    priceToUpgradeClick: number;
    priceToUpgradeAuto: number;
}

export type GameAction =
    | { type: 'INCREMENT' }
    | { type: 'UPGRADE_CLICK'; price: number }
    | { type: 'UPGRADE_AUTO'; price: number }
    | { type: 'AUTO_INCREMENT' }