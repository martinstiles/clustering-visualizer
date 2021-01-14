import { getCentroids, getMarkedPoints, getUniformCentroids, getEuclidianDistance, getAverageOfCluster, getCopyOfCentroids, compareCentroids } from './utils.js'
import { visualize } from './visualize'

export const KMeans = (k, centroidType, table, speed, setRunState, setIterations, setVariance, changeHook, setChangeHook) => {
  // ChangedNodesInOrder contains every update to visualize
  // For elem in changedNodesInOrder:
  // 1. [{id: "0", rowIndex: 19, colIndex: 9, cluster: Array(0)}, {...}] --> Update all centroids and remove previous ones --> if elem.length > 1
  // 2. [{rowIndex: 2, colIndex: 4, closestCentroid: {…}, color: "0"}] --> const point = table[rowIndex][colIndex] --> 
  // 3. 'iterate' --> add iteration --> elem === 'iterate'
  // 4. 
  const changedNodesInOrder = []
  // const helperTable = getHelperTable(table)
  var iterations = 0

  const points = getMarkedPoints(table) // MUST BE CHANGED TO HELPER TABLE (?)

  const centroids = centroidType === 'random' ? getCentroids(k) : getUniformCentroids(k)
  // const copyOfInitialCentroids = getCopyOfCentroids(centroids)

  var centroidsAreChanging = true

  while(centroidsAreChanging) {
    var prevCentroids = getCopyOfCentroids(centroids)
    centroids.forEach((c) => {
      c.cluster = []
    })

    // Assert each point to a cluster -> one of the centroids
    points.forEach((point) => {
      var closestCentroid = undefined
      var distanceToClosestCentroid = Infinity
      centroids.forEach((centroid) => {
        const currentDistance = getEuclidianDistance(point, centroid)
        if (currentDistance < distanceToClosestCentroid) {
          closestCentroid = centroid
          distanceToClosestCentroid = currentDistance
        }
      })
      point.closestCentroid = closestCentroid
      point.color = closestCentroid.id
      closestCentroid.cluster.push(point)
      changedNodesInOrder.push([point])
    })
  
    // Assert new coordinates to the centroids
    centroids.forEach((centroid) => {
      const newCoordinates = getAverageOfCluster(centroid.cluster)
      if (!Number.isNaN(newCoordinates.rowIndex)) centroid.rowIndex = newCoordinates.rowIndex
      if (!Number.isNaN(newCoordinates.colIndex)) centroid.colIndex = newCoordinates.colIndex
    })
    changedNodesInOrder.push(centroids)

    const areCentroidsEqual = compareCentroids(centroids, prevCentroids)
    centroidsAreChanging = !areCentroidsEqual
    changedNodesInOrder.push('iterate')
    iterations += 1
    if (iterations > 150) break // FAIL SAFE
  }


  // // TEMP VISUALIZING:
  centroids.forEach((c) => {
    var wasMarked = false
    points.forEach((p) => { if (c.rowIndex === p.rowIndex && c.colIndex === p.colIndex) wasMarked = true })
    const row = c.rowIndex
    const col = c.colIndex
    const point = table[row][col]
    point.type = c.id
    point.prevType = wasMarked ? 'marked' : ''
    point.color = c.id
  })

  var variance = 0
  centroids.forEach((c) => {
    // console.log(c)
    c.cluster.forEach((point) => {
      variance += getEuclidianDistance(c, point)
    })
  })

  points.forEach((p) => {
    table[p.rowIndex][p.colIndex].color = p.color
  })

  setIterations(iterations)
  setVariance(Math.round(variance * 100) / 100)
  setChangeHook(!changeHook)
  setRunState('finished')
  // visualize(changedNodesInOrder, table, points, copyOfInitialCentroids, speed, setIterations, setRunState, changeHook, setChangeHook)
  // console.log('')
}
