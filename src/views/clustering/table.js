import React, { useState, useEffect, useCallback } from 'react'
import Point from './point.js'
import ButtonGroup from '../buttonGroup/buttonGroup.js'
import getInitialPoints from './initialPoints.js'
import { KMeans } from '../../algorithms/kMeans.js'
import { DBSCAN } from '../../algorithms/dbscan'
import { getRandomInt } from '../../algorithms/utils'

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
  const [algorithm, setAlgorithm] = useState('')
  const [numClusters, setNumClusters] = useState(0)

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
  }

  const resetPoints = useCallback(() => {
    const initialPoints = getInitialPoints() // clears the grid
    setTable(initialPoints)
    setRunState('empty')
  }, [])

  const runAlgorithm = (currentAlgorithm, additionalInfo={}) => {
    const currentSpeed = speedLabelToSpeedMap[speed]
    setRunState('running')
    if (currentAlgorithm === 'kMeans') {
      const k = additionalInfo.k
      const type = additionalInfo.centroidType
      KMeans(k, type, table, currentSpeed, setRunState, setIterations, setVariance, changeHook, setChangeHook)
    }
    if (currentAlgorithm === 'dbscan') {
      const eps = additionalInfo.eps
      const minPts = additionalInfo.minPts
      DBSCAN(eps, minPts, table, currentSpeed, setRunState, setNumClusters, changeHook, setChangeHook)
    }
  }

  const resetAlgorithm = () => {
    var isCustomized = false
    table.forEach((row) => {
      row.forEach((point) => {
        const isOrWasMarked = point.type ==='marked' || point.prevType === 'marked'
        point.type = isOrWasMarked ? 'marked' : 'normal'
        point.color = ''
        if (isOrWasMarked && !isCustomized) isCustomized = true
      })
    })
    setRunState(isCustomized ? 'customized' : 'empty')
  }

  const generateRandomPoints = (numOfPoins=10) => {
    for (let i = 0; i < numOfPoins; i++) {
      const rowIndex = getRandomInt(22)
      const colIndex = getRandomInt(40)
      setTypeInPoint('marked', [rowIndex, colIndex])
    }
    setRunState('customized')
    setChangeHook(!changeHook)
  }

  return (
    <div style={{textAlign: 'center'}}>
      <ButtonGroup runState={runState} runAlgorithm={runAlgorithm} setSpeed={setSpeed} resetPoints={resetPoints} resetAlgorithm={resetAlgorithm} generatePoints={generateRandomPoints} setAlgorithm={setAlgorithm} />
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
      { 
        algorithm === 'kMeans'
        &&
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <h1> Iterations: {iterations || '--'} </h1>
          <h1> Variance: {variance || '--'} </h1>
        </div>
      }
      {
        algorithm === 'dbscan'
        &&
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <h1> Clusters found: {numClusters || '--'} </h1>
        </div>
      }
    </div>
  )
}

export default Table