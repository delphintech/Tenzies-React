import './style/index.scss'
import Die from "./die"
import React from "react"
import Confetti from 'react-confetti'


export default function App() {
  const [dices, setDices] = React.useState(() => {
    const list = []
    for (let i = 1; i <= 10; i++ ) {
        const newDice = {id: i, value: 0, disabled: false}
        list.push(newDice)
    }
    return list
  })

  const [congrats, setCongrats] = React.useState(false)

  React.useEffect(() => { roll() } ,[])

  React.useEffect(() => {
    let test = 0
    const values = []
    dices.forEach((dice) => { values.push(dice.value)})
    for (let i=0; i<9; i++) {
      if (values[i] !== values[i+1]) {
        test = test + 1
      }
    }
    if (test === 0 && !values.find(el => el === 0)) {
      setCongrats(true) }
    else {
      setCongrats(false) }
  }, [dices])

  const toggleDisabled = (id) => {
    setDices(prevDices => {
      return prevDices.map((dice) => {
        return dice.id === id ? {...dice, disabled: !dice.disabled} : dice
      })
    })
  }

  const references = {};

  const CreateRef = (id) => {
    const ref = React.createRef()
    references[id] = ref
    return ref
  }

  const roll = () => {
    if (congrats) {
      setDices(prevDice => {
        return prevDice.map((die) => {
          return {...die, disabled: false}
        })
      })
      dices.forEach((die) => {
        references[die.id].current.rollDice()
      })
    } else {
      dices.forEach((dice) => {
        !dice.disabled && references[dice.id].current.rollDice()
      })
    }
  }

  const results = (value, id) => {
    setDices(prevDices => {
      return prevDices.map((dice) => {
        return (dice.id === id && !dice.disable) ? {...dice, value: value} : dice
      })
    })
  }

  const diceList = []

  dices.forEach((dice) => {
    diceList.push(<Die
      key={dice.id}
      ref={CreateRef(dice.id)}
      results={results}
      id={dice.id}
      toggleDisabled={toggleDisabled}
      disabled = { dice.disabled }
    />)
  })


  return (
    <div className="board" >
      {congrats && <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      />}
      <h1>Tenzy</h1>
      <h4>Roll until all dice are the same.<br />
      Click each die to freeze it at its current value between rolls.</h4>
      <div className="game-area">
        {diceList}
      </div>
      {congrats ?
        <button className="btn" onClick={roll} >Reset</button>
        : <button className="btn" onClick={roll} >Roll</button>
      }
    </div>
  )
}
