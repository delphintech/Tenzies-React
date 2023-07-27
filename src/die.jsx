import Dice from 'react-dice-roll'
import React from "react"

const Die = React.forwardRef((props, ref) => (
    <Dice
      onRoll={(value) => props.results(value)}
      size={50}
      defaultValue={Math.floor(Math.random() * 6) + 1}
      triggers={[]}
      ref={ref}
    />
))

Die.displayName="Die"

export default Die
