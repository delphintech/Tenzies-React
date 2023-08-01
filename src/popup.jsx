import Popup from 'reactjs-popup';
import React from "react"

export default function Pop( { seconds, bestScore, setBestScore } ) {
  const [top, setTop] = React.useState(false)

  let score = ""

  if (seconds < 10) {
    score = "🐱‍👤 TENZI Master 🐱‍👤"
  } else if (seconds < 20) {
    score = "🐲 Dice Dragon 🐲"
  }else if (seconds < 30) {
    score = "🤘 Rockin' Roller 🤘"
  }
  else if (seconds < 40) {
    score = "👩‍🎓 Tumbler in Training 👩‍🎓"
  }
  else {
    score = "🐣 Cubie Newbie 🐣"
  }

  let gif = ""

  top ?
  gif = "https://media3.giphy.com/media/o75ajIFH0QnQC3nCeD/200.webp?cid=ecf05e47ldj1wlgdery6q5fqm2e76yxuykwv0jlmn2um7f2w&ep=v1_gifs_search&rid=200.webp&ct=g"
  : gif = "https://media2.giphy.com/media/26tPplGWjN0xLybiU/giphy.gif?cid=ecf05e47cdajmou3231hlpy96yxeey3s6mbj9lov8lyausk8&ep=v1_gifs_search&rid=giphy.gif&ct=g"

  React.useEffect(() => {
    if ( seconds > 1 && (!bestScore || seconds < bestScore) ) {
      setTop(true)
      setBestScore(seconds)
      localStorage.setItem("tenzi", seconds)
    }
    else {
      setTop(false)
    }
  }, [])

  return (
    <Popup
      open={true}
      position={["top center"]}
    >
      <div className="popup">
        { top ?
        <>
          <h3>🥳<span>NEW HIGH SCORE</span>🥳</h3>
          <h3><span>{score}</span></h3>
        </>
         :
        <>
          <h3><span>{score}</span></h3>
          <h3><span>{seconds}</span> seconds</h3>
        </>

        }
        <img src={gif} alt="winning gif" />
        <h3>High score: <span>{top ? seconds : bestScore}</span> seconds</h3>
      </div>
    </Popup>
  )
}
