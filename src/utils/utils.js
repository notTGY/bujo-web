function redrawCanvas(c, ctx, data, pageIndex) {
  const bgColor = '#edbfb7'
  const dotsColor = '#c7e8f3'
  const inkColor = '#2f2235'

  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, c.width, c.height)
  
  ctx.fillStyle = dotsColor

  const size = c.width / 28
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 40; j++) {
        ctx.fillRect(size*(1+i)-1, size*(1+j)-1, 2, 2)
    }
  }



  if ('paths' in data) {
    data.paths.forEach(path => drawPath(c, ctx, path, pageIndex))
  }

}


function drawPath(c, ctx, path, pageIndex) {
  if (pageIndex !== path[0].pageIndex) return
  const bgColor = '#edbfb7'
  const dotsColor = '#c7e8f3'
  const inkColor = '#2f2235'

  const size = 2 * c.width / 28
  const lineWidth = 4

  ctx.fillStyle = inkColor
  ctx.strokeStyle = inkColor
  ctx.lineWidth = lineWidth
  ctx.lineJoin = 'round'
  

  ctx.beginPath()
  path.forEach((e, i) => {
    if (i === 0) return
    if (i === 1) ctx.moveTo(e.x*size, e.y*size)
    if (i !== 1) ctx.lineTo(e.x*size, e.y*size)
  })
  ctx.stroke()

  if (path[0].type === 'pen') {
    path.forEach((e, i) => {
      if (i === 0) return

      ctx.beginPath()
      ctx.arc(e.x*size, e.y*size, lineWidth/2, 0, 2*Math.PI)
      ctx.fill()
    })
  }

}

export { redrawCanvas, drawPath }