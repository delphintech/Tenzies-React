import Dice from 'react-dice-roll'
import React from "react"

const Die = React.forwardRef((props, ref) => {

    return (
      <div onClick={() => props.toggleDisabled(props.id)}>
        <Dice
          onRoll={(value) => props.results(value, props.id)}
          size={50}
          defaultValue={Math.floor(Math.random() * 6) + 1}
          triggers={[]}
          ref={ref}
          faceBg={props.color}
        />
      </div>
    )
  }
)

Die.displayName="Die"

export default Die
