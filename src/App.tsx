import {useEffect, useReducer} from 'react'
import './App.css'

const initialStates = {
    count: 0,
    incrementPerClick: 1,
    incrementAuto: 0,
    priceToUpgradeClick: 10,
    priceToUpgradeAuto: 50
}

function App() {

    type State = {
        count: number
        incrementPerClick: number
        incrementAuto: number
        priceToUpgradeClick: number
        priceToUpgradeAuto: number
    }

    type Action =
        | { type: 'Increment' }
        | { type: 'UpgradePointsPerClick'; price: number }
        | { type: 'UpgradePointsAuto'; price: number }
        | { type: 'AutoIncrement' }


    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case 'Increment':
                return {
                    ...state,
                    count: state.count + state.incrementPerClick
                }
            case 'UpgradePointsPerClick':
                return {
                    ...state,
                    count: state.count - action.price,
                    incrementPerClick: state.incrementPerClick + 1,
                    priceToUpgradeClick: Math.floor(state.priceToUpgradeClick * 1.25)
                }
            case 'UpgradePointsAuto':
                return {
                    ...state,
                    count: state.count - action.price,
                    incrementAuto: state.incrementAuto + 1,
                    priceToUpgradeAuto: Math.floor(state.priceToUpgradeAuto * 1.25)
                }
            case 'AutoIncrement':
                return {
                    ...state,
                    count: state.count + state.incrementAuto
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialStates)

    useEffect(() => {
        if (state.incrementAuto <= 0) return

        const interval = setInterval(() => {
            dispatch({
                type: 'AutoIncrement',
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [state.incrementAuto])

    return (
        <>
          <div className="card">
              <p>{state.count}</p>
              <button onClick={() => dispatch({
                  type: 'Increment'
              })}>
                Click to increment
              </button>
              <br/>
              <button disabled={ state.count < state.priceToUpgradeClick } onClick={() => dispatch({
                  type: 'UpgradePointsPerClick',
                  price: state.priceToUpgradeClick
              })}>
                  Augment points/click
              </button>
              <p>cost : {state.priceToUpgradeClick}</p>
              <button disabled={ state.count < state.priceToUpgradeAuto } onClick={() => dispatch({
                  type: 'UpgradePointsAuto',
                  price: state.priceToUpgradeAuto
              })}>
                  Augment points Auto
              </button>
              <p>cost : {state.priceToUpgradeAuto}</p>

          </div>
        </>
  )
}

export default App
