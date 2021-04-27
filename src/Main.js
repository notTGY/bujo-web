import React, { useState, useEffect } from 'react'

import Page from './components/Page/Page'
import Sidebar from './components/Sidebar/Sidebar'
import TextLayer from './components/TextLayer/TextLayer'

import { openPage, savePage } from './utils/utils'


export default Main

function Main(props) {
  const root = document.getElementById('root')
  const font = props.font
  const setShowingBook = props.setShowingBook

  const [size, setSize] = useState(root.offsetHeight / 42)
  const [redraw, setRedraw] = useState(true)
  // eslint-disable-next-line
  const [_, setRedrawTexts] = useState(true)
  const [corner, setCorner] = useState({left: 0, top: 0})

  const [mode, setMode] = useState('none')

  const [data, setData] = useState({
    paths: [],
    texts: [
      {top: 0, left: 0, text: 'Apr 2021'}
    ], 
    templateLeft: 'blank', 
    templateRight: 'blank'
  })
  

  const [curText, setCurText] = useState(-1)

  useEffect(_ => { 
    root.onmousemove = (event) => {
      if (curText === -1) return
      if (curText === 0) return
      data.texts[curText].top = (event.y - corner.top)/size
      data.texts[curText].left = (event.x - corner.left)/size
      setData(data)
      updateStorage(data)
      setRedrawTexts(e => !e)
    }
  // eslint-disable-next-line
  }, [curText, root, corner, size, data])

  useEffect(_ => {
    setSize(root.offsetHeight / 42)
  }, [root.offsetHeight])

  function undoLastPath() {
    let res = data
    res.paths.pop()
    setData(res)
    updateStorage(res)
    setRedraw(e => !e)
  }

  function updateStorage(data) {
    savePage(props.page, data)
  }

  useEffect(_ => {
    window.addEventListener('keyup', e => {
      if (e.ctrlKey && e.keyCode === 90) undoLastPath()
    })
    window.addEventListener('keydown', e => {
      if (e.ctrlKey && e.keyCode === 90) {
        e.preventDefault()
        return false
      }
    })
  // eslint-disable-next-line
  }, [])


  useEffect(_ => {
    setData(openPage(props.page))
  }, [props.page])
  return (
    <div className="h-full">
      <div className="flex items-center justify-center flex-row text-ink bg-back h-full w-full fixed top-0 left-0">
        <div className="pl-0.5 bg-book-shade">
          <div className="p-1 bg-book-cover flex flex-row">
            <div className="pl-0.5 bg-paper-shaded">
              <Page 
                redraw={redraw} 
                cellSize={size} 
                data={data} 
                pageIndex={0} 
                setData={setData} 
                mode={mode} 
                setCorner={setCorner} 
                updateStorage={updateStorage} 
              />
            </div>

            <div className="w-0.5" />

            <Page 
              redraw={redraw} 
              cellSize={size} 
              data={data} 
              pageIndex={1} 
              setData={setData} 
              mode={mode} 
              setCorner={e => e} 
              updateStorage={updateStorage} 
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row fixed top-0 left-0 items-center h-full">
        <Sidebar 
          mode={mode} 
          modeSetter={setMode} 
          setRedrawTexts={setRedrawTexts} 
          undoing={undoLastPath}
          setData={setData}
          setShowingBook={setShowingBook}
        />
      </div>
      
      {data.texts.map((item, i) => 
        <TextLayer 
          font={font}
          item={item} 
          size={size}
          key={i} 
          i={i} 
          data={data} 
          setData={setData} 
          updateStorage={updateStorage}
          setRedrawTexts={setRedrawTexts} 
          setCurText={setCurText}
          corner={corner}
          mode={mode}
        /> 
      )}

    </div>
  )
}

