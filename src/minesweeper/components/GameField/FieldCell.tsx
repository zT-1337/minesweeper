import React, { CSSProperties, MouseEvent } from 'react'
import { Cell } from '../../game/GameTypes'

export type FieldCellPropType = {
  cell: Cell,
  onLeftClick(index: number): void
}

export function FieldCell (props: FieldCellPropType) {
  if (props.cell.clickState === 'unclicked') {
    return <Unclicked onLeftClick={props.onLeftClick} index={props.cell.index}/>
  }

  if (props.cell.clickState === 'marked') {
    return <Marked />
  }

  if (props.cell.clickState === 'clicked' && props.cell.isMine) {
    return <ClickedMine/>
  }

  return <ClickedNotMine mineNeighbourCounter={props.cell.mineNeighbourCounter}/>
}

type UnclickedPropType = {
  index: number,
  onLeftClick(index: number): void
}

function Unclicked (props: UnclickedPropType) {
  const onLeftClick = (event: MouseEvent<HTMLDivElement>) => {
    props.onLeftClick(props.index)
  }

  return <div style={unclickedStyle} onClick={onLeftClick}/>
}

const unclickedStyle: CSSProperties = {
  backgroundColor: 'gray',
  border: '1px solid black',
  width: '100%',
  height: '100%'
}

function Marked () {
  return (
    <div className={'fieldCell marked'}>
      <span>F</span>
    </div>
  )
}

function ClickedMine () {
  return (
    <div className={'fieldCell clickedMine'}>
      <span>M</span>
    </div>
  )
}

function ClickedNotMine (props: {mineNeighbourCounter: number}) {
  return (
    <div style={clickedNotMineStyle}>
      <span>{props.mineNeighbourCounter}</span>
    </div>
  )
}

const clickedNotMineStyle: CSSProperties = {
  backgroundColor: 'whitesmoke',
  border: '1px solid black',
  width: '100%',
  height: '100%'
}
