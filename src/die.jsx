import Dice from 'react-dice-roll'
import React from "react"

const Die = React.forwardRef((props, ref) => {


    const faces = [
      "src/assets/face-1.png",
      "src/assets/face-2.png",
      "src/assets/face-3.png",
      "src/assets/face-4.png",
      "src/assets/face-5.png",
      "src/assets/face-6.png"
    ]

    const facesD = [
      "src/assets/face-1d.png",
      "src/assets/face-2d.png",
      "src/assets/face-3d.png",
      "src/assets/face-4d.png",
      "src/assets/face-5d.png",
      "src/assets/face-6d.png"
    ]

    return (
      <div onClick={() => props.toggleDisabled(props.id) } className="die">
        <Dice
          onRoll={(value) => props.results(value, props.id)}
          size={50}
          defaultValue={Math.floor(Math.random() * 6) + 1}
          triggers={[]}
          ref={ref}
          faceBg={props.disabled ? facesD : "none"}
          faces={props.disabled ? facesD : faces}
          rollingTime={500}
        />
      </div>
    )
  }
)

// props.disabled ? facesD : faces


Die.displayName="Die"

export default Die
