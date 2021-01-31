import { getMarkedPoints, getEuclidianDistance } from './utils.js'
// import { visualize } from './visualize'

const isInACluster = (point, clusters, currentCluster) => {
  var isInACluster
  clusters.forEach((cluster) => {
    cluster.forEach((point2) => {
      if (point.rowIndex === point2.rowIndex && point.colIndex === point2.colIndex) isInACluster = true
    })
  })
  currentCluster.forEach((point2) => {
    if (point.rowIndex === point2.rowIndex && point.colIndex === point2.colIndex) isInACluster = true
  })
  return isInACluster
}

const pointIsInList = (point, neighboors) => {
  var isNotInList = false
  neighboors.forEach((neighboor) => {
    if (point.rowIndex === neighboor.rowIndex && point.colIndex === neighboor.colIndex) isNotInList = true
  })
  return isNotInList
}

const expandCluster = (point, points, neighboors, cluster, clusters, eps, minPts) => {
  for (let i = 0; i < neighboors.length; i++) {
    const point2 = neighboors[i]
    if (point2 !== 'visited' && point2 !== 'noise') {
      point2.type = 'visited'
      const neighboors2 = getNeighboorsDBSCAN(point2, points, eps)
      if (neighboors2.length >= minPts) {
        neighboors2.forEach((neighboor2) => {
          if (!pointIsInList(neighboor2, neighboors)) neighboors.push(neighboor2)
        })
      }
    }
    if (!isInACluster(point2, clusters, cluster)) {
      cluster.push(point2)
    }
  }
}

export const DBSCAN = (eps, minPts, table, speed, setRunState, setNumClusters, changeHook, setChangeHook) => {

  const points = getMarkedPoints(table)

  //const cluster = undefined
  const clusters = []

  // marked points => unvisited points
  points.forEach((point) => {
    if (point.type !== 'visited' && point.type !== 'noise') {
      point.type = 'visited'
      const neighboors = getNeighboorsDBSCAN(point, points, eps)
      if (neighboors.length < minPts) point.type = 'noise'
      else {
        const cluster = []
        expandCluster(point, points, neighboors, cluster, clusters, eps, minPts)
        clusters.push(cluster)
      }
    }
  })

  var c = 0
  clusters.forEach((cluster) => {
    cluster.forEach((point) => {
      table[point.rowIndex][point.colIndex].color = `${c}`
    })
    c++
  })

  setNumClusters(clusters.length)
  setChangeHook(!changeHook)
  setRunState('finished')
}

const getNeighboorsDBSCAN = (point, points, eps) => {
  const neighboors = []
  points.forEach((potentialNeighboor) => {
    const distance = getEuclidianDistance(point, potentialNeighboor)
    if (distance <= eps) {
      neighboors.push(potentialNeighboor)
    }
  })
  return neighboors
}
