import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [incrementPerClick, setIncrementPerClick] = useState(1)
    const [incrementAuto, setIncrementAuto] = useState(0)
    const [priceToUpdate, setPriceToUpdate] = useState(10)
    const [priceToUpdateAuto, setPriceToUpdateAuto] = useState(50)

    const handleIncrementationClick = () => {
        setCount(count - priceToUpdate)
        setIncrementPerClick(incrementPerClick + 1)
        setPriceToUpdate(priceToUpdate * 10)
    }

    const handleIncrementationClickAuto = () => {
        setCount(count - priceToUpdateAuto)
        setIncrementAuto(incrementAuto + 1)
        setPriceToUpdateAuto(Math.round(priceToUpdateAuto * 1.25))
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(prev => prev + incrementAuto)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [incrementAuto])

    return (
        <>
          <div className="card">
              <p>{count}</p>
              <button onClick={() => setCount((count) => count + incrementPerClick)}>
                Click to increment
              </button>
              <br/>
              <button disabled={ count < priceToUpdate } onClick={handleIncrementationClick}>
                Augment points/click
              </button>
              <p>Cost {priceToUpdate}</p>
              <br/>
              <button disabled={ count < priceToUpdateAuto } onClick={handleIncrementationClickAuto}>
                  Augment AutoClicker
              </button>
              <p>Cost {priceToUpdateAuto}</p>

          </div>
        </>
  )
}

export default App
