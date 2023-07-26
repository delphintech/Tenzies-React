import './style/index.scss'

export default function App() {

  return (
    <div className="board">
      <h1>Tenzy</h1>
      <h4>Roll until all dice are the same.<br />Click each die to freeze it at its current value between rolls.</h4>
      <div className="game-area">

      </div>
      <button className="btn">Roll</button>
    </div>
  )
}
