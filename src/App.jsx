import './style/index.scss'
import Die from "./die"
import React from "react"


export default function App() {
  const [values, setValues] = React.useState([])

  const ref = React.useRef([]);

  const roll = () => {
    console.log(ref)
  }

  const dice = []

  for (let i = 0; i < 10; i++ ) {
    dice.push(<Die key={i} ref={ref} />)
  }

  return (
    <div className="board">
      <h1>Tenzy</h1>
      <h4>Roll until all dice are the same.<br />Click each die to freeze it at its current value between rolls.</h4>
      <div className="game-area">
        {dice}
      </div>
      <button className="btn" onClick={roll}>Roll</button>
    </div>
  )
}
