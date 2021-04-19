import React from 'react'

import SmartTextArea from './SmartTextArea'


function TextLayer(props) {
  const data = props.data ? props.data : {texts: []}
  const texts = data.texts
  return (
    <div>
      {texts.map((e, i) => <SmartTextArea textData={e}/>)}
    </div>
  )
}


export default TextLayer
