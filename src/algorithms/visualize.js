import { isInteger } from './utils'

// VISUALIZE:
export const visualize = (changedPointsInOrder, table, points, copyOfInitialCentroids, speed, setIterations, setRunState, changeHook, setChangeHook) => {
  console.log(changedPointsInOrder)
  setIterations(0)
  var iterations = 1
  var i = 1

  // instant
  // if (speed === 0) {
  //   changedNodesInOrder.map((helperNode) => {
  //     const node = nodes[helperNode.rowIndex][helperNode.colIndex]
  //     node.type = helperNode.type
  //     if (node.type !== 'shortestPath') setNodesVisited(nodesVisited++)
  //     if (node.type === 'shortestPath') setNodesInPath(nodesInPath++)
  //   })
  //   setRunState('finished')
  //   return
  // }
  setTimeout(() => {
    copyOfInitialCentroids.forEach((centroid) => {
      var wasMarked = false
      points.forEach((point) => { if (centroid.rowIndex === point.rowIndex && centroid.colIndex === point.colIndex) wasMarked = true })
      const point = table[centroid.rowIndex][centroid.colIndex]
      point.type = centroid.id
      point.prevType = wasMarked ? 'marked' : ''
      point.color = centroid.id
    })
    console.log('now')
  }, speed*i)
  i++

  changedPointsInOrder.map((elem) => {
    setTimeout(() => {
      // Pause
      if (elem === 'iterate') {
        setIterations(iterations++)
      }
      // Update color according to cluster
      else if (elem.length === 1) {
        const helperPoint = elem[0]
        const point = table[helperPoint.rowIndex][helperPoint.colIndex]
        point.color = helperPoint.color
      }
      // Update centroids
      else if (elem.length > 1) {
        // Remove previous points
        points.forEach((helperPoint) => {
          if (isInteger(helperPoint.type)) {
            const point = table[helperPoint.rowIndex][helperPoint.colIndex]
            if (point.prevType === 'marked') {
              point.type = 'marked'
              // keeps color
            } else {
              point.type = 'normal'
              point.color = ''
            }
          }
        })
        elem.forEach((centroid) => {
          var wasMarked = false
          points.forEach((point) => { if (centroid.rowIndex === point.rowIndex && centroid.colIndex === point.colIndex) wasMarked = true })
          const point = table[centroid.rowIndex][centroid.colIndex]
          point.type = centroid.id
          point.prevType = wasMarked ? 'marked' : ''
          point.color = centroid.id
        })
      }
      setChangeHook(!changeHook) // TO FORCE RERENDER
      console.log('now')
    }, speed*i)
    i++
  })

  setTimeout(() => {
    setRunState('finished')
    // console.log('FINISHED :D')
  }, speed*i)
}
