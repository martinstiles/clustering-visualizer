import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Point from './point.js'
import ButtonGroup from '../buttonGroup/buttonGroup.js'
import getInitialPoints from './initialPoints.js'
import { KMeans } from '../../algorithms/kMeans.js'
import { getRandomInt, isInteger } from '../../algorithms/utils'

const speedLabelToSpeedMap = {
  slow: 200,
  medium: 1000,
  fast: 60,
  instant: 0
}
var key = 0
const Table = () => {
  const [table, setTable] = useState([])
  const [runState, setRunState] = useState('empty') // empty | customized | running | finished
  const [speed, setSpeed] = useState('instant') // medium
  const [iterations, setIterations] = useState(0)
  const [variance, setVariance] = useState(0)
  const [changeHook, setChangeHook] = useState(false)

  const hooks = {
    runState,
    setRunState
  }

  // basicly componentDidMount()
  useEffect(() => {
    const initialPoints = getInitialPoints()
    setTable(initialPoints)
  }, [])

  const setTypeInPoint = (type, coordinates) => {
    const row = coordinates[0]
    const col = coordinates[1]
    const point = table[row][col]
    point.type = type
    if (isInteger(type)) point.prevType = 'marked'
  }

  const resetPoints = useCallback(() => {
    const initialPoints = getInitialPoints() // clears the grid
    setTable(initialPoints)
    setRunState('empty')
  }, [])

  const labelToAlgorithm = useMemo(() => {
    return {
      kMeans: KMeans
    }
  }, [])

  const runAlgorithm = (currentAlgorithm, k=3) => {
    const Algorithm = labelToAlgorithm[currentAlgorithm]
    const currentSpeed = speedLabelToSpeedMap[speed]
    setRunState('running')
    Algorithm(k, table, currentSpeed, setRunState, setIterations, setVariance, changeHook, setChangeHook)
  }

  const resetAlgorithm = () => {
    var isCustomized = false
    table.map((row) => {
      row.map((point) => {
        const isOrWasMarked = point.type ==='marked' || point.prevType === 'marked'
        point.type = isOrWasMarked ? 'marked' : 'normal'
        point.color = ''
        if (isOrWasMarked && !isCustomized) isCustomized = true
      })
    })
    setRunState(isCustomized ? 'customized' : 'empty')
  }

  const generateRandomPoints = (numOfPoins=10) => {
    const randomPoints = []
    for (let i = 0; i < numOfPoins; i++) {
       randomPoints.push({
         rowIndex: getRandomInt(22),
         colIndex: getRandomInt(40),
       })
    }
    randomPoints.forEach((point) => setTypeInPoint('marked', [point.rowIndex, point.colIndex]))
    setChangeHook(changeHook)
  }

  return (
    <div style={{textAlign: 'center'}}>
      <ButtonGroup runState={runState} runAlgorithm={runAlgorithm} setSpeed={setSpeed} resetPoints={resetPoints} resetAlgorithm={resetAlgorithm} generatePoints={generateRandomPoints} />
      <div style={{border: `1px solid rgb(${[220,220,220]})`}}>
        {table.map((row, rowIndex) => {
          return <div key={rowIndex} style={{display: 'flex', flexDirection: 'row'}}>
            {row.map((point, colIndex) =>
              <Point
                key={key++}
                type={point.type}
                color={point.color}
                hooks={hooks}
                setTypeInPoint={setTypeInPoint}
                coordinates={[rowIndex, colIndex]}
              />
            )}
          </div>
        })}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h1> Iterations: {iterations || '--'} </h1>
        <h1> Variance: {variance || '--'} </h1>
      </div>
    </div>
  )
}

export default Table