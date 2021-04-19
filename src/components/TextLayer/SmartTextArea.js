import React, { useState } from 'react'

function SmartTextArea(props) {
  const [isDown, setIsDown] = useState(false)
  console.log(props.textData)
  

  function onMM(e) {
    if (!isDown) return
    props.changer(props.index, props.textData.text, ((e.clientY-20) | 0), ((e.clientX-20) | 0)) 
  }

  function onMU(e) {
    setIsDown(false)
  }

  function onMD(e) {
    setIsDown(true)
  }
  
  function changeHandler(e) {
    props.changer(props.index, e.target.value, props.textData.top, props.textData.left)
  }

  return (
    <textarea 
      onMouseMove={onMM}
      onMouseUp={onMU}
      onMouseDown={onMD}
      className="fixed bg-transparent resize"
      value={props.textData.text}
      style={{top: props.textData.top+'px', left: props.textData.left+'px'}}
      onChange={changeHandler}
    />
  )
}

export default SmartTextArea
