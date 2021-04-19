import React, { useState, useEffect, useCallback } from 'react'

import Page from './components/Page/Page'
import Sidebar from './components/Sidebar/Sidebar'
import TextLayer from './components/TextLayer/TextLayer'


export default App

function App() {
  const root = document.getElementById('root')

  const [size, setSize] = useState(root.offsetHeight / 42)
  const [redraw, setRedraw] = useState(true)
  const [relativeCords, setRelativeCords] = useState({})


  const corner = useCallback(elem => {
    console.log(elem)
    const top = elem.offsetTop
    const left = elem.offsetLeft
    setRelativeCords({top, left})
  }, [])

  useEffect(_ => {
    setSize(root.offsetHeight / 42)
  }, [root.offsetHeight])

  const [data, setData] = useState({
    paths: [],
    texts: [
      {top: 0, left: 0, text: 'hello'}
    ], 
    templateLeft: 'blank', 
    templateRight: 'blank'
  })



  const [mode, setMode] = useState('none')

  function undoLastPath() {
    setData(e => {
      let res = e
      res.paths.pop()
      return res
    })
    setRedraw(e => !e)
  }


  useEffect(_ => {
    window.addEventListener('keyup', e => {
      if (e.ctrlKey && e.key === 'z') undoLastPath()
    })
  }, [])


  function changeText(index, text, top, left) {
    setData(e => {
      let res = e
      res.texts[index] = {
        text, 
        top: (top - relativeCords.top) / size, 
        left: (left - relativeCords.left) / size
      }
      return res
    })
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-center flex-row text-ink bg-back h-full w-full fixed top-0 left-0">
        <div className="pl-0.5 bg-book-shade">
          <div className="p-1 bg-book-cover flex flex-row">
            <div className="pl-0.5 bg-paper-shaded">
              <div ref={corner}>
                <Page redraw={redraw} cellSize={size} data={data} pageIndex={0} setData={setData} mode={mode} />
              </div>
            </div>

            <div className="w-0.5" />

            <Page redraw={redraw} cellSize={size} data={data} pageIndex={1} setData={setData} mode={mode} />
          </div>
        </div>
      </div>

      <div className="flex flex-row fixed top-0 left-0 items-center h-full">
        <Sidebar mode={mode} modeSetter={setMode} undoing={undoLastPath}/>
      </div>

      <TextLayer data={data} size={size} changeText={changeText} relativeCords={relativeCords} />
    </div>
  )
}

