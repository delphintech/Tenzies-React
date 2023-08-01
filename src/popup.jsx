import Popup from 'reactjs-popup';

export default function Pop() {

  return (
    <Popup
      open={true}
      position={["top center"]}
    >
      <div className="popup">
        <h1>🥳 Congratulation 🥳</h1>
      </div>
    </Popup>
  )
}
