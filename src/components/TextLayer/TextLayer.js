import React from 'react'

function TextLayer(props) {
        const {
          item, 
          i, 
          data, 
          setData, 
          setRedrawTexts, 
          setCurText, 
          font,
          size,
          corner
        } = props

        const leftEffective = corner.left + item.left*size
        const topEffective = corner.top + item.top*size
        const minSize = size

        function changeText(e) {
          data.texts[i].text = e.target.value
          setData(data)
          setRedrawTexts(e => !e)
        }
        function abortHandler(e) {
          if (data.texts[i].text !== '') return
          data.texts.splice(i, 1)
          setData(data)
          setRedrawTexts(e => !e)
        }

        function onMouseDown(e) {
          if (e.clientX > leftEffective + minSize/2 || e.clientY > topEffective + minSize/2) return
          setCurText(i)
          setRedrawTexts(e => !e)
        }

        function onMouseUp(e) {
          setCurText(-1)
          setRedrawTexts(e => !e)
        }

        return <textarea 
          className="fixed resize bg-transparent text-ink"
          style={{
            left: leftEffective+'px', 
            top: topEffective+'px', 
            minWidth: minSize + 'px', 
            minHeight: minSize + 'px',
            fontFamily: font
          }}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
          value={item.text}
          onBlur={abortHandler}
          onChange={changeText} 
        />
}


export default TextLayer
