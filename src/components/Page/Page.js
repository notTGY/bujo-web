import React, { useCallback, useState, useEffect } from 'react'

import './Page.css'

import { redrawCanvas, drawPath } from '../../utils/utils'


function Page(props) {
  const cellDPI = props.cellSize ? props.cellSize * 2 : 20

  const [canvas, setCanvas] = useState(null)
  const [stylus, setStylus] = useState(null)
  const [painting, setPainting] = useState(false)
  const [currentPath, setCurrentPath] = useState([])
  const [screenshot, setScreenshot] = useState(null)
  
  const [isStylusShown, setIsStylusShown] = useState(false)


  const cRef = useCallback(c => {
    if (c === null) return

    setCanvas(c)

    c.style.width = (28*cellDPI / 2) + 'px'
    c.style.height = (41*cellDPI / 2) + 'px'
    c.width = 28*cellDPI
    c.height = 41*cellDPI
    const ctx = c.getContext('2d')
    
    redrawCanvas(c, ctx, props.data, props.pageIndex)
  }, [cellDPI, props.data, props.pageIndex])

  useEffect(_ => {
    if (canvas === null) return

    const ctx = canvas.getContext('2d')
    
    redrawCanvas(canvas, ctx, props.data, props.pageIndex)
  }, [props.redraw, canvas, props.data, props.pageIndex])

  const sRef = useCallback(s => setStylus(s), [])


  function mouseMoveHandler(e) {
    requestAnimationFrame(_ => {
      if (stylus === null) return

      if (painting && props.mode === 'line') {
        const relX = (e.clientX - canvas.offsetLeft) / cellDPI
        const relY = (e.clientY - canvas.offsetTop) / cellDPI

        const ctx = canvas.getContext('2d')
        ctx.putImageData(screenshot, 0, 0)
        drawPath(canvas, ctx, [...currentPath, {x: relX, y: relY}], props.pageIndex)
      }

      if (props.mode !== 'pen') return

      setIsStylusShown(true)
      stylus.style.top = Math.floor(e.clientY-2) + 'px'
      stylus.style.left = Math.floor(e.clientX-2) + 'px'
      if (painting) {
        const relX = (e.clientX - canvas.offsetLeft) / cellDPI
        const relY = (e.clientY - canvas.offsetTop) / cellDPI

        setCurrentPath(e => [...e, {x: relX, y: relY}])
        const ctx = canvas.getContext('2d')
        drawPath(canvas, ctx, currentPath, props.pageIndex)

      }

    })
  }

  function mouseDownHandler(e) {
    if (props.mode === 'pen') {
      if (!painting) {
        setPainting(true)

        const relX = (e.clientX - canvas.offsetLeft) / cellDPI
        const relY = (e.clientY - canvas.offsetTop) / cellDPI

        setCurrentPath([{type: 'pen', pageIndex: props.pageIndex}, {x: relX, y: relY}])
        const ctx = canvas.getContext('2d')
        drawPath(canvas, ctx, [{type: 'pen', pageIndex: props.pageIndex}, {x: relX, y: relY}], props.pageIndex)
      }
    } else if (props.mode === 'line') {
    }
  }

  function mouseUpHandler(e) {
    if (props.mode === 'pen') {
      if (painting) {
        setPainting(false)

        props.setData(e => {
          let res = e
          res.paths.push(currentPath)
          return res
        })

        setCurrentPath([])
        const ctx = canvas.getContext('2d')
        redrawCanvas(canvas, ctx, props.data, props.pageIndex)
      }
    } else if (props.mode === 'line') {
      if (!painting) {
        setPainting(true)
        const ctx = canvas.getContext('2d')
        setScreenshot(ctx.getImageData(0, 0, canvas.width, canvas.height))
        
        const relX = (e.clientX - canvas.offsetLeft) / cellDPI
        const relY = (e.clientY - canvas.offsetTop) / cellDPI

        setCurrentPath([{type: 'line', pageIndex: props.pageIndex}, {x: relX, y: relY}])
        drawPath(canvas, ctx, [{type: 'line', pageIndex: props.pageIndex}, {x: relX, y: relY}], props.pageIndex)
      } else {
        setPainting(false)

        const relX = (e.clientX - canvas.offsetLeft) / cellDPI
        const relY = (e.clientY - canvas.offsetTop) / cellDPI

        props.setData(e => {
          let res = e
          res.paths.push([...currentPath, {x: relX, y: relY}])
          return res
        })

        setCurrentPath([])
        const ctx = canvas.getContext('2d')
        redrawCanvas(canvas, ctx, props.data, props.pageIndex)
      }
    }
  }

  function mouseLeaveHandler(e) {
    setPainting(false)
    setIsStylusShown(false)
    props.setData(e => { 
      let res = e
      res.paths.push(currentPath)
      return res
    })

    setCurrentPath([])
  }

  return (
    <div 
      className="text-ink shadow-2xl"
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      <canvas 
        ref={cRef}
        id="c"
      />
      <svg 
        viewBox="-8 -8 16 16" 
        fill="currentcolor" 
        style={{display: isStylusShown?'block':'none'}}
        className="stylus" 
        ref={sRef}
      >
        <circle x="8" y="8" r="4"></circle>
      </svg>
    </div>
  )
}


export default Page
