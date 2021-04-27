import React, { useState, useEffect } from 'react'
import './fancyScrollBars.css'

import {findNewIdx} from './utils/utils'

function SelectorPage(props) {
  const { setPageIndex, setShowingBook, font } = props

  const [pages, setPages] = useState([])
  const [redraw, setRedraw] = useState(true)

  useEffect(() => {
    const tmpPages = JSON.parse(localStorage.getItem('index'))
    if (tmpPages) {
      tmpPages.push({title: 'new page', index: findNewIdx(tmpPages)})
      setPages(tmpPages)
    } else {
      let tmp = []
      tmp.push({title: 'new page', index: findNewIdx(tmp)})
      setPages(tmp)
    }
  }, [])

  return (
    <div style={{fontFamily: font}} className="h-screen w-screen bg-back flex items-center text-ink">
      <div/>
      <div className="ml-12 mw flex flex-col h-1/2 bg-paper p-4 rounded shadow">
        <div className="p-1 bg-paper-shaded">
          Pages:
        </div>
        <div 
          className="flex flex-col justify-start h-full pt-0.5 px-1 overflow-auto border border-paper-shaded rounded-sm mt-0.5 fancy-scrollbar"
        >
          {pages.map((item, i) => 
            <div 
              key={i} 
              className="cursor-pointer rounded bg-paper-shaded p-1 mb-0.5 hover:text-ink-highlighted transition flex justify-between items-center"
            >
              <div className="flex items-center">
                <span
                  onClick={e=>{
                    if (i === pages.length - 1) {
                      let obj = pages
                      obj.pop()
                      obj.push({title: 'new page', index: findNewIdx(obj)})
                      localStorage.setItem('index', JSON.stringify(obj))
                    }
                    setPageIndex(item.index)
                    setShowingBook(true)
                  }}
                >
                -
                </span>
                <input 
                  value={item.title} 
                  name={i}
                  className="bg-transparent"
                  style={{width: 8*(item.title.length + 1) + 'px'}}
                  onChange={e=>{
                    const name = e.target.name
                    let obj = pages
                    obj[name].title = e.target.value
                    setPages(obj)
                    let cpy = JSON.parse(JSON.stringify(obj))
                    cpy.pop()
                    setRedraw(e => !e)
                    localStorage.setItem('index', JSON.stringify(cpy))
                  }}
                  readOnly={i===pages.length-1}
                />
              </div>

              {i !== pages.length-1 ? 
              <span
                onClick={e=>{
                  if (i === pages.length - 1) return
                  let obj = pages
                  obj.splice(i, 1)
                  setPages(obj)
                  let cpy = JSON.parse(JSON.stringify(obj))
                  cpy.pop()
                  localStorage.setItem('index', JSON.stringify(cpy))
                  setRedraw(e => !e)
                }}
              >
                <svg viewBox="0 0 32 32" width="1rem" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
                </svg>
              </span>:
              ''}
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default SelectorPage
