import React, { useState, useEffect } from 'react'

import Page from './components/Page/Page'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  const root = document.getElementById('root')

  const [size, setSize] = useState(root.offsetHeight / 42)
  const [redraw, setRedraw] = useState(true)

  useEffect(_ => {
    setSize(root.offsetHeight / 42)
  }, [root.offsetHeight])

  const [data, setData] = useState({paths: [], texts: [], templateLeft: 'blank', templateRight: 'blank'})



  let [mode, setMode] = useState('none')

  function undoLastPath() {
    setData(e => {
      let res = e
      res.paths.pop()
      return res
    })
    setRedraw(e => !e)
  }

  function keyUpHandler(e) {
    if (e.ctrlKey && e.key === 'z') undoLastPath()
  }

  useEffect(_ => {
    window.addEventListener('keyup', keyUpHandler)
  }, [])

  return (
    <div className="h-full">
      <div className="flex items-center justify-center flex-row text-ink bg-back h-full w-full fixed top-0 left-0">
        <div className="pl-0.5 bg-book-shade">
          <div className="p-1 bg-book-cover flex flex-row">
            <div className="pl-0.5 bg-paper-shaded">
              <Page redraw={redraw} cellSize={size} data={data} pageIndex={0} setData={setData} mode={mode} />
            </div>

            <div className="w-0.5" />

            <Page redraw={redraw} cellSize={size} data={data} pageIndex={1} setData={setData} mode={mode} />
          </div>
        </div>
      </div>

      <div className="flex flex-row fixed top-0 left-0 items-center h-full">
        <Sidebar mode={mode} modeSetter={setMode} undoing={undoLastPath}/>
      </div>

    </div>
  )
}

export default App
