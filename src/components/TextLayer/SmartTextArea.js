import React, { useState } from 'react'

function SmartTextArea(props) {
  const [isDown, setIsDown] = useState(false)
  
  function onMM(e) {
    if (!isDown) return
    e.target.style.left = ((e.clientX-20) | 0) + 'px'
    e.target.style.top = ((e.clientY-20) | 0) + 'px'
  }

  function onMU(e) {
    setIsDown(false)
  }

  function onMD(e) {
    setIsDown(true)
  }


  return (
    <textarea 
      onMouseMove={onMM}
      onMouseUp={onMU}
      onMouseDown={onMD}
      className="fixed top-5 left-5 bg-transparent resize"
      style={{draggable: true}}
      draggable="true"
    >
    </textarea>
  )
}

export default SmartTextArea
