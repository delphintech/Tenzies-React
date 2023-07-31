import './style/index.scss'
import Die from "./die"
import React from "react"
import Confetti from 'react-confetti'


export default function App() {
  const [values, setValues] = React.useState({})
  const [disabled, setDisabled] = React.useState([])
  const [congrats, setCongrats] = React.useState(false)

  const reset = () => {
    location.reload()
  }

  const relaunch = (paused) => {
    paused && roll()
  }

  React.useEffect(() => {roll()},[])

  React.useEffect(() => {
    let test = 0
    for (let i=1; i<=9; i++) {
      if (values[i] !== values[i+1]) {
        test = test + 1
      }
    }
    if (test === 0 && Object.keys(values).length !== 0)
    { setCongrats(true) }
    else {
      setCongrats(false)
    }
  }, [values])

  const toggleDisabled = (id) => {
    if (disabled.find(el => el === id)) {
      setDisabled(oldDisabled => oldDisabled.filter(item => item !== id)) }
    else {
      setDisabled(oldDisabled => {
        const newDisabled = [...oldDisabled]
        newDisabled.push(id)
        return newDisabled
      })
    }
  }

  const references = {};

  const CreateRef = (id) => {
    const ref = React.createRef()
    references[id] = ref
    return ref
  }

  const roll = () => {
    const keys = Object.keys(references)
    keys.forEach((key => {
      (disabled && !disabled.find(el => el === parseInt(key)) && references[key].current.rollDice())
    }))
    console.log(values)
  }

  const results = (value, id) => {
    setValues(oldValues => {
      const newValue = {...oldValues}
      const ref = id.toString()
      if (disabled && !disabled.find(el => el === id )) {
        newValue[ref] = value
      }
      return newValue
    })
  }

  const dice = []

  for (let i = 1; i <= 10; i++ ) {
    dice.push(<Die
      key={i}
      ref={CreateRef(i)}
      results={results}
      id={i}
      toggleDisabled={toggleDisabled}
      disabled = {disabled.find(el => el === i) ? true : false}
    />)
  }


  return (
    <div className="board" >
      <Confetti
        className={congrats ? "" : "hide"}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <h1>Tenzy</h1>
      <h4>Roll until all dice are the same.<br />
      Click each die to freeze it at its current value between rolls.</h4>
      <div className="game-area">
        {dice}
      </div>
      {congrats ?
        <button className="btn" onClick={reset} >Reset</button>
        : <button className="btn" onClick={roll} >Roll</button>
      }
    </div>
  )
}
