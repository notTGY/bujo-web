import React, {useEffect, useState} from 'react'

function Page(props) {
  const cellDPI = props.cellSize?props.cellSize*2:20


  const [cid, setCid] = useState('')
  const [c, setC] = useState({})

  useEffect(_ => {
    const val = 'canvas' + Math.floor(255*Math.random()).toString(16)
    setCid(val)
  }, [])

  useEffect(_ => {
    if (!cid) return
    setC(document.getElementById(cid))
  }, [cid])

  useEffect(_ => {
    if (!('id' in c)) return

    c.style.width = (28*cellDPI / 2) + 'px'
    c.style.height = (41*cellDPI / 2) + 'px'
    c.width = 28*cellDPI
    c.height = 41*cellDPI

    const ctx = c.getContext('2d')
    ctx.fillStyle = '#edbfb7'
    ctx.fillRect(0,0,c.width,c.height)
  }, [c])



  return (
    <div className='text-ink'>
      <canvas id={cid}/>
    </div>
  )
}


export default Page