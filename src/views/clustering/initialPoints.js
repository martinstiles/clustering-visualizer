const getInitialPoints = () => {
  const numRows = 22 // 18
  const numCols = 40 // 34
  const points = []
  // Initialize the points
  for (let row = 0; row < numRows; row++) {
    const currentRow = []
    for (let col = 0; col < numCols; col++) {
      currentRow.push(
        { type: 'normal',
          rowIndex: row,
          colIndex: col,
          color: '',
          prevType: ''
          // closestCentroid: undefined,
        }
      )
    }
    points.push(currentRow)
  }
  return points
}

export default getInitialPoints