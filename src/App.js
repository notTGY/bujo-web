import React, { useState } from 'react'

import Main from './Main'
import SelectorPage from './SelectorPage'


export default App

function App() {
  const [pageIndex, setPageIndex] = useState(0)
  const [showingBook, setShowingBook] = useState(false)
  const fonts = [ 
    "Comic Sans MS",
    "'Courgette', cursive",
    "'Pacifico', cursive",
    "'Yellowtail', cursive"
  ]
  const font = fonts[0]
 
  if (!showingBook) return <SelectorPage setPageIndex={setPageIndex} setShowingBook={setShowingBook} font={font} />

  return <Main page={pageIndex} setPageIndex={setPageIndex} setShowingBook={setShowingBook} font={font} />
}

