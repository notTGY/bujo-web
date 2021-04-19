import React from 'react'
import './Sidebar.css'

function Sidebar(props) {
  if (!props.modeSetter || !props.mode) return <div>info is not provided</div>


  function homeButtonCallback() { 
  }

  function penButtonCallback() {
    if (props.mode === 'pen') props.modeSetter('none')
    else props.modeSetter('pen')
  }

  function lineButtonCallback() {
    if (props.mode === 'line') props.modeSetter('none')
    else props.modeSetter('line')
  }

  function textButtonCallback() {
    if (props.mode === 'text') props.modeSetter('none')
    else props.modeSetter('text')
  }

  function backButtonCallback() {
    if (props.undoing) props.undoing()
  }

  function settingsButtonCallback() {
  }



  return (
    <div className="flex flex-col items-center justify-center sidebar-container">
      <button
        onClick={homeButtonCallback}
        className="sidebar-button"
      >
        Home
      </button>

      <button
        onClick={penButtonCallback}
        className="sidebar-button"
      >
        Pen
      </button>

      <button
        onClick={lineButtonCallback}
        className="sidebar-button"
      >
        Line
      </button>

      <button
        onClick={textButtonCallback}
        className="sidebar-button"
      >
        Text
      </button>

      <button
        onClick={backButtonCallback}
        className="sidebar-button"
      >
        Back
      </button>

      <button
        onClick={settingsButtonCallback}
        className="sidebar-button"
      >
        Settings
      </button>
    </div>
  )
}




export default Sidebar
