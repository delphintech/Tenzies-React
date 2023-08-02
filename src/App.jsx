import './style/index.scss'
import Die from "./die"
import React from "react"
import Confetti from 'react-confetti'
import Pop from './popup';

export default function App() {
  // Sate array of each die as object
  const [dice, setDice] = React.useState(() => {
    const list = []
    for (let i = 1; i <=10; i++ ) {
        const newDie = {id: i, value: 0, disabled: false}
        list.push(newDie)
    }
    return list
  })

  // State of the Best score recorded on local storage
  const [bestScore, setBestScore] = React.useState(() => JSON.parse(localStorage.getItem("tenzi")))

  // State for the winning status
  const [congrats, setCongrats] = React.useState(false)

  // state for the game timer
  const [timer, setTimer] = React.useState(() => Date.now())

  // Rolls all the dices once at the start of the app
  React.useEffect(() => { roll() } ,[])

  // Toggle the "disabled" parameter of each dice on click
  const toggleDisabled = (id) => {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return die.id === id ? {...die, disabled: !die.disabled} : die
      })
    })
  }

  // Roll the dice
  const roll = () => {
    // Reset the dice parameters and roll all of them if game in congrats state
    if (congrats) {
      setDice(prevDice => {
        return prevDice.map((die) => {
          return {...die, value: 0, disabled: false}
        })
      })
      dice.forEach((die) => {
        references[die.id].current.rollDice()
      })
    } else {
      // Roll all the dice except for the disabled ones
      dice.forEach((die) => {
        !die.disabled && references[die.id].current.rollDice()
      })
    }
  }

  // Store the result of each dice after rolling in its state object
  const results = (value, id) => {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return (die.id === id && !die.disable) ? {...die, value: value} : die
      })
    })
  }

  // Check the game status each time there is a change in the dice state objects
  React.useEffect(() => {
    // test if all the dice value are the same
    let test = 0
    const values = []
    dice.forEach((die) => { values.push(die.value) })
    // Check if every dice values are the same
    for (let i=0; i<9; i++) {
      if (values[i] !== values[i+1]) {
        test += 1
      }
    }
    // Check if all dice are disabled
    dice.find(die => die.disabled === false) && (test += 1)
    // test the winning conditions to change the winning state (congrats), stop the timer and calculate the playing time
    if (test === 0 && !values.find(el => el === 0)) {
      setCongrats(true)
      setTimer(oldTimer => ((Date.now() - oldTimer)/1000.0).toFixed(1))
    }
    else {
      setCongrats(false) }
  }, [dice])

  // Reset the timer when the congrats state comes from winning to playing.
  React.useEffect(() => { !congrats && setTimer(Date.now())}, [congrats])

  // List of all dice element
  const diceList = []

  // List of all forwarded references for each dice element
  const references = {};

  // Creating a dice element for each object in the state array and store it in the list
  dice.forEach((die) => {
    // Create a reference for each dice element and store it in the reference list
    const ref = React.createRef()
    references[die.id] = ref

    diceList.push(<Die
      key={die.id}
      ref={ref}
      results={results}
      id={die.id}
      toggleDisabled={toggleDisabled}
      disabled = { die.disabled }
    />)
  })

  return (
    <>
    {congrats &&
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <Pop
        seconds={timer}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
    </>
    }
    <div className="board" >
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
    </>
  )
}
