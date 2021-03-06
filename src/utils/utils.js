function redrawCanvas(c, ctx, data, pageIndex) {
  const bgColor = '#edbfb7'
  const dotsColor = '#c7e8f3'

  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, c.width, c.height)
  
  ctx.fillStyle = dotsColor

  const size = c.width / 28
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 40; j++) {
        ctx.fillRect(size*(1+i)-1, size*(1+j)-1, 3, 3)
    }
  }


  if ('paths' in data) data.paths.forEach(path => drawPath(c, ctx, path, pageIndex))
}


function drawPath(c, ctx, path, pageIndex) {
  if (!path) return
  if (!path.length) return
  if (pageIndex !== path[0].pageIndex) return
  const inkColor = '#2f2235'
  const inkColorFaded = '#2f223590'

  const size = 2 * c.width / 28
  const lineWidth = 4

  ctx.strokeStyle = inkColorFaded
  ctx.lineWidth = lineWidth
  ctx.lineJoin = 'round'
  
  ctx.beginPath()
  path.forEach((e, i) => {
    if (i === 0) return
    if (i === 1) ctx.moveTo(e.x*size, e.y*size)
    if (i !== 1) ctx.lineTo(e.x*size, e.y*size)
  })
  ctx.stroke()

  ctx.strokeStyle = inkColor
  ctx.lineWidth = lineWidth/2

  ctx.beginPath()
  path.forEach((e, i) => {
    if (i === 0) return
    if (i === 1) ctx.moveTo(e.x*size, e.y*size)
    if (i !== 1) ctx.lineTo(e.x*size, e.y*size)
  })
  ctx.stroke()

  if (path[0].type === 'pen') {
    ctx.fillStyle = inkColorFaded
    path.forEach((e, i) => {
      if (i === 0) return

      ctx.beginPath()
      ctx.arc(e.x*size, e.y*size, lineWidth/2, 0, 2*Math.PI)
      ctx.fill()
    })
    ctx.fillStyle = inkColor
    path.forEach((e, i) => {
      if (i === 0) return

      ctx.beginPath()
      ctx.arc(e.x*size, e.y*size, lineWidth/4, 0, 2*Math.PI)
      ctx.fill()
    })
  }

}


function openPage(index) {
  let res = JSON.parse(localStorage.getItem('page'+index)) 
  if (res) return res
  return {
    paths: [],
    texts: [
      {top: 0, left: 0, text: 'Apr 2021'}
    ], 
    templateLeft: 'blank', 
    templateRight: 'blank'
  }
}

function savePage(index, data) {
  console.log('saving')
  localStorage.setItem('page'+index, JSON.stringify(data))
}

function pathIntersects(x, y, path, size) {
  let doWeIntersect = false
  let prevDot = null

  path.forEach((item, i) => {
    if (prevDot !== null) {
      const {k, a} = getAAndKOfLine(prevDot.x, prevDot.y, item.x, item.y)
      const aPrime = y - x * k
      const diff = Math.abs(a - aPrime)
      if (diff < 4/size) {
        doWeIntersect = true
      }
    }

    if (((item.x - x)**2 + (item.y - y)**2) < (4/size)**2) {
      doWeIntersect = true
    }

    prevDot = item
  })

  return doWeIntersect
}

function getAAndKOfLine(x1, y1, x2, y2) {
  let k = (y2 - y1) / (x2 - x1)
  let a = y1 - x1 * k
  return {k, a}
}

function findNewIdx(array) {
  let idx = 0
  let found = false
  while (!found) {
    found = true
    array.forEach(e => {
      if (e.index === idx) found = false
    })
    idx++
  }
  return idx
}

export { redrawCanvas, drawPath, openPage, savePage, pathIntersects, findNewIdx }
