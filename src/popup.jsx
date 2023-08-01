import Popup from 'reactjs-popup';

export default function Pop( { seconds } ) {
  let score = ""
  
  if (seconds < 10) {
    score = "TENZI Master !!"
  } else if (seconds < 20) {
    score = "Dice Dragon"
  }else if (seconds < 30) {
    score = "Rockin' Roller"
  }
  else if (seconds < 40) {
    score = "Tumbler in Training"
  }
  else {
    score = "Cubie Newbie"
  }

  return (
    <Popup
      open={true}
      position={["top center"]}
    >
      <div className="popup">
        <h1>🥳 {score} 🥳</h1>
        <h3>Your time: {seconds} seconds</h3>
      </div>
    </Popup>
  )
}
