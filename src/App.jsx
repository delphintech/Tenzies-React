import './style/index.scss'
import Die from "./die"
import React from "react"


export default function App() {
  const [values, setValues] = React.useState({})
  const [disabled, setDisabled] = React.useState([])
  
  React.useEffect(() => {
    let test = 0
    for (let i=1; i<=9; i++) {
      if (values[i] !== values[i+1]) {
        test = test + 1
      }
    }
    test === 0 && Object.keys(values).length !== 0 && console.log("Win")
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
      (!disabled.find(el => el === parseInt(key)) && references[key].current.rollDice())
    }))
    console.log(values)
  }

  const results = (value, id) => {
    setValues(oldValues => {
      const newValue = {...oldValues}
      const ref = id.toString()
      if (!disabled.find(el => el === id )) {
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
      color = {disabled.find(el => el === i) ? "#659B91" : "white"}
    />)
  }


  return (
    <div className="board" >
      <h1>Tenzy</h1>
      <h4>Roll until all dice are the same.<br />Click each die to freeze it at its current value between rolls.</h4>
      <div className="game-area">
        {dice}
      </div>
      <button className="btn" onClick={roll} >Roll</button>
    </div>
  )
}
