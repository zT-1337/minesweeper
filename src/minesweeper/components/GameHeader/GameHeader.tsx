import React, { CSSProperties } from 'react'

export type GameHeaderPropType = {
  timer: number,
  onResetButton(): void,
  markedCounter: number,
  mineCount: number
}

export function GameHeader (props: GameHeaderPropType) {
  return (
    <div style={gameHeaderStyle}>
      <div style={timerAndMarkerStyle}>{props.timer}</div>
      <button style={resetButtonStyle} onClick={props.onResetButton}>Reset</button>
      <div style={timerAndMarkerStyle}>{`${props.markedCounter}/${props.mineCount}`}</div>
    </div>
  )
}

const gameHeaderStyle: CSSProperties = {
  display: 'flex',
  height: '50px',
  justifyContent: 'space-between',
  alignContent: 'center',
  backgroundColor: 'gray'
}

const timerAndMarkerStyle: CSSProperties = {
  display: 'flex',
  minWidth: '150px',
  alignItems: 'center',
  justifyContent: 'end',
  backgroundColor: 'black',
  color: 'red',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '22pt'
}

const resetButtonStyle: CSSProperties = {
  width: '150px',
  backgroundColor: 'black',
  color: 'red',
  border: '0px'
}
