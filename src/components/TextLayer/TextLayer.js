import React, { useState, useEffect } from 'react'

import SmartTextArea from './SmartTextArea'


function TextLayer(props) {
  const [data, setData] = useState({texts: []})
  const texts = data.texts

  useEffect(_ => {
    setData(props.data)
  }, [props.data])


  function translateCords(obj) {
    const {text, top, left} = obj
    return {
      text,
      top: props.relativeCords.top + props.size * top,
      left: props.relativeCords.left + props.size * left
    }
  }
  
  return (
    <div>
      {texts.map((e, i) => 
        <SmartTextArea 
          key={i} 
          index={i} 
          textData={translateCords(e)} 
          changer={props.changeText} 
        />
      )}
    </div>
  )
}


export default TextLayer
