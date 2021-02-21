import React, {useState} from 'react'
import { isInteger } from '../../algorithms/utils'
import './animations.css'

const typeToColorMap = {
  marked: `rgb(${[220,220,220]})`,
  normal: '',
  unmarked: '',
  centroid: '#cf2e2e',
  '0': '#e3afbc', // pink
  '1': '#3feee6', // blue
  '2': '#cf2e2e', // red
  '3': '#ffe400', // yellow
  '4': '#e98074', // purple
  '5': '#308580', // green
  '6': '#daad86', // brown
  '7': '#ff652f', // orange
}

const Point = (props) => {
  const [type, setType] = useState(props.type)
  const runState = props.hooks.runState

  const updateType = (newType) => {
    setType(newType)
    props.setTypeInPoint(newType, props.coordinates)
  }

  const style = {
    height: '1.5em',
    width: '1.5em',
    border: `1px solid rgb(${[60,60,60]})`,
    backgroundColor: typeToColorMap[props.color || type],
    ...(isInteger(type) && {borderRadius: '50%'}) // if it is a number, aka centroid
  }

  const onMouseDown = () => {
    if ( runState !== 'empty' && runState !== 'customized' ) return
    if ( type === 'marked' ) {
      updateType('unmarked')
      return
    }
    updateType('marked')
    props.hooks.setRunState('customized')
  }

  return (
    <div key={props.key} className={type === 'marked' || isInteger(type) ? 'marked-point' : ''} style={style} onMouseDown={onMouseDown}/>
  )
}

export default Point