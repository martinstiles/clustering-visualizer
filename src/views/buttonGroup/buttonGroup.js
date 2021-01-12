import React, { useState } from 'react'
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import TransitionModal from './modal.js'
import MoreMenu from './moreMenu.js'

const ButtonGroup = (props) => {
  const style = {
    marginBottom: '2em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

  const selectStyle = {
    backgroundColor: '#FFE19C',
    minWidth: '10em',
    textAlign: 'left'
  }
  const selectKStyle = {
    backgroundColor: '#FFE19C',
    minWidth: '6em',
    textAlign: 'left'
  }

  // run states:
  const isEmpty = props.runState === 'empty'
  const isCustomized = props.runState === 'customized'
  const isRunning = props.runState === 'running'
  const isFinished = props.runState === 'finished'

  // ALGORITHM SELECT
  const [algorithm, setAlgorithm] = useState('')
  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value)
  }

  // SPEED SELECT
  const [speed, setSpeed] = useState('instant') // medium
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value)
    props.setSpeed(event.target.value)
  }

  // PLAY BUTTON
  const handlePlayClick = () => {
    props.runAlgorithm(algorithm, k)
  }

  // Select K
  const [k, setK] = useState(3)
  const handleKChange = (event) => {
    setK(event.target.value)
  }

  // <MenuItem value={'slow'}>Slow</MenuItem>
  //         <MenuItem value={'medium'}>Medium</MenuItem>
  //         <MenuItem value={'fast'}>Fast</MenuItem>

  return (
    <div style={style}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <FormControl variant="filled">
        <InputLabel>
          <div style={{color: 'black', fontStyle: 'italic'}}>Select algorithm</div>
        </InputLabel>
        <Select style={selectStyle} value={algorithm} onChange={handleAlgorithmChange} label="Algorithm" autoWidth={true}>
          <MenuItem value={'kMeans'}>K-Means</MenuItem>
        </Select>
      </FormControl>

      { algorithm === 'kMeans' &&
      <FormControl variant="filled" style={{marginLeft: '1em'}}>
        <InputLabel>
          <div style={{color: 'black', fontStyle: 'italic'}}>Select K</div>
        </InputLabel>
        <Select style={selectKStyle} value={k} onChange={handleKChange} label="Algorithm" autoWidth={true}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
      </FormControl>
      }

      <FormControl variant="filled" style={{marginLeft: '2em'}}>
        <InputLabel>
          <div style={{color: 'black', fontStyle: 'italic'}}>Speed</div>
        </InputLabel>
        <Select style={selectStyle} value={speed} onChange={handleSpeedChange} label="Speed" autoWidth={true}>
          <MenuItem value={'instant'}>Instant</MenuItem>
        </Select>
      </FormControl>

      <Button
        style={{marginLeft: '2em', color: 'black', backgroundColor: algorithm === '' || isRunning || isFinished ? 'gray' : '#63C132'}} 
        ariant="contained"
        disabled={algorithm === '' || isRunning || isFinished}
        onClick={handlePlayClick}
      >
        <PlayArrowIcon />
      </Button>

      <Button
        style={{marginLeft: '1em', color: 'black', backgroundColor: isEmpty || isRunning ? 'gray' : '#cf2e2e'}}
        variant="contained"
        disabled={isEmpty || isRunning}
        onClick={isCustomized ? props.resetPoints : props.resetAlgorithm}
      >
        { isEmpty || isCustomized ? <HighlightOffIcon /> : <ReplayIcon /> }
      </Button>
      </div>

      {/* <Button
        style={{marginLeft: '1em', color: 'black', backgroundColor: true ? 'gray' : '#cf2e2e'}} // true -> !isEmpty
        variant="contained"
        disabled={true} // true -> !isEmpty
        onClick={props.generatePoints}
      >
        { 'Generate Points '}
      </Button> */}

      <div style={{display: 'flex', flexDirection: 'row', fontSize: '2.65em'}}>
        <TransitionModal />
        <MoreMenu />
      </div>
    </div>
  )
}


//<MenuItem value={'aStar'}>A*</MenuItem>
//<MenuItem value={'bestFist'}>Best first (greedy)</MenuItem>
//<MenuItem value={'breadthFirst'}>Breadth First</MenuItem>

export default ButtonGroup