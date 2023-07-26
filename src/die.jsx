import Dice from 'react-dice-roll'
import React from "react"

const Die = React.forwardRef(function Die(props, ref) {
  return (
    <Dice
      onRoll={(value) => value}
      size={50}
      defaultValue={Math.floor(Math.random() * 6) + 1}
      triggers={["Enter","click"]}
      ref={ref}
    />
  )
})

export default Die
