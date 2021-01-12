export const isInteger = (str) => /^\d+$/.test(str)

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}
// getRandomCentroids
export const getCentroids = (k) => {
  const centroids = []
  for(let i = 0; i < k; i++) {
    centroids.push(
      {
        id: `${i}`,
        rowIndex: getRandomInt(22),
        colIndex: getRandomInt(40),
        cluster: [],
      }
    )
    // IDEA: Check if there are a certain distance between the centroids, and if not, try again (?)
  }
  return centroids
}

export const getUniformCentroids = (k) => {
  const numRows = 22
  const numCols = 40
  const tableSize = numRows * numCols
  const interval = Math.floor(tableSize / (k + 1))

  const centroids = []
  for(let i = 0; i < k; i++) {
    const currentSize = interval * (i + 1)
    centroids.push(
      {
        id: `${i}`,
        rowIndex: Math.floor(currentSize / numCols),
        colIndex: Math.floor(currentSize / numRows),
        cluster: [],
      }
    )
  }
  return centroids
}

export const getEuclidianDistance = (u, v) => {
  return Math.sqrt((u.rowIndex - v.rowIndex)**2 + (u.colIndex - v.colIndex)**2)
}

export const getHelperTable = (table) => {
  const helperNodes = []
  table.map((row) => {
    const helperRow = []
    row.map((point) => {
        helperRow.push(
          {
            type: point.type,
            rowIndex: point.rowIndex,
            colIndex: point.colIndex,
            color: point.color,
            closestCentroid: undefined,
          }
        )
    })
    helperNodes.push(helperRow)
  })
  return helperNodes
}

export const getCopyOfCentroids = (centroids) => {
  const copyOfCentroids = []
  centroids.forEach((centroid) => {
    copyOfCentroids.push({
      rowIndex: centroid.rowIndex,
      colIndex: centroid.colIndex,
      id: centroid.id,
    })
  })
  return copyOfCentroids
}

// Returns true if they are equal
export const compareCentroids = (centroids, prevCentroids) => {
  var isEqual = true
  centroids.forEach((centroid) => {
    var hasOneEqual = false
    prevCentroids.forEach((prevCentroid) => {
      if (centroid.rowIndex === prevCentroid.rowIndex && centroid.colIndex === prevCentroid.colIndex){
        hasOneEqual = true
      }
    })
    if (!hasOneEqual) isEqual = false
  })
  return isEqual
}

export const getMarkedPoints = (table) => {
  const points = []
  table.map((row) => {
    row.map((point) => {
      if (point.type === 'marked') points.push({rowIndex: point.rowIndex, colIndex: point.colIndex})
    })
  })
  return points
}

export const getAverageOfCluster = (cluster) => {
  var rowIndexSum = 0
  var colIndexSum = 0
  cluster.forEach((point) => {rowIndexSum = rowIndexSum + point.rowIndex})
  cluster.forEach((point) => {colIndexSum = colIndexSum + point.colIndex})
  const rowIndex = Math.floor(rowIndexSum / cluster.length)
  const colIndex = Math.floor(colIndexSum / cluster.length)
  return {rowIndex, colIndex}
}



export const getArrow = (coordinates) => {
  //
}

export const getNeighboors = (nodes, node) => {
  const neighboors = []
  const row = node.rowIndex
  const col = node.colIndex

  // UP
  if (row > 0) {
    const upNode = nodes[row - 1][col]
    if (upNode.type === 'unvisited' || upNode.type === 'goal') {
      neighboors.push(upNode) 
    }
  }
  // RIGHT 49
  if (col < 20) {
    const rightNode = nodes[row][col + 1]
    if (rightNode.type === 'unvisited' || rightNode.type === 'goal') {
      neighboors.push(rightNode) 
    }
  }
  // DOWN
  if (row < 10) {
    const downNode = nodes[row + 1][col]
    if (downNode.type === 'unvisited' || downNode.type === 'goal') {
      neighboors.push(downNode) 
    }
  }
  // LEFT
  if (col > 0) {
    const leftNode = nodes[row][col - 1]
    if (leftNode.type === 'unvisited' || leftNode.type === 'goal') {
      neighboors.push(leftNode) 
    }
  }

  return neighboors
}
