import './style/index.scss'
import Die from "./die"
import React from "react"
import Confetti from 'react-confetti'
import Pop from './popup';

export default function App() {
  const [dice, setDice] = React.useState(() => {
    const list = []
    for (let i = 1; i <= 10; i++ ) {
        const newDie = {id: i, value: 0, disabled: false}
        list.push(newDie)
    }
    return list
  })

  const [congrats, setCongrats] = React.useState(false)

  const [timer, setTimer] = React.useState(0)

  React.useEffect(() => { roll() } ,[])

  React.useEffect(() => {
    let test = 0
    const values = []
    dice.forEach((die) => { values.push(die.value)})
    for (let i=0; i<9; i++) {
      if (values[i] !== values[i+1]) {
        test = test + 1
      }
    }
    if (test === 0 && !values.find(el => el === 0)) {
      setCongrats(true) }
    else {
      setCongrats(false) }
  }, [dice])

  const toggleDisabled = (id) => {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return die.id === id ? {...die, disabled: !die.disabled} : die
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
      setDice(prevDice => {
        return prevDice.map((die) => {
          return {...die, disabled: false}
        })
      })
      dice.forEach((die) => {
        references[die.id].current.rollDice()
      })
    } else {
      dice.forEach((die) => {
        !die.disabled && references[die.id].current.rollDice()
      })
    }
  }

  const results = (value, id) => {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return (die.id === id && !die.disable) ? {...die, value: value} : die
      })
    })
  }

  const diceList = []

  dice.forEach((die) => {
    diceList.push(<Die
      key={die.id}
      ref={CreateRef(die.id)}
      results={results}
      id={die.id}
      toggleDisabled={toggleDisabled}
      disabled = { die.disabled }
    />)
  })


  return (
    <div className="board" >
      {congrats &&
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <Pop />
      </>
      }
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
