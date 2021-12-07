import React, { CSSProperties, MouseEvent } from 'react'
import { Cell } from '../../game/GameTypes'

export type FieldCellPropType = {
  cell: Cell
  onLeftClick(index: number): void
  onRightClick(index: number): void
}

export function FieldCell (props: FieldCellPropType) {
  let style = unclickedStyle
  let content = <span></span>

  switch (props.cell.clickState) {
    case 'unclicked': {
      style = unclickedStyle
      content = <span></span>
      break
    }

    case 'marked': {
      style = markedStyle
      content = <span>F</span>
      break
    }

    case 'clicked': {
      if (props.cell.isMine) {
        style = clickedMineStyle
        content = <span>B</span>
      } else {
        style = clickedNotMineStyle
        content = <span>{props.cell.mineNeighbourCounter}</span>
      }
    }
  }

  const onLeftClick = (event: MouseEvent<HTMLDivElement>) => {
    props.onLeftClick(props.cell.index)
  }

  const onRightClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    props.onRightClick(props.cell.index)
  }

  return (
    <div style={style} onClick={onLeftClick} onContextMenu={onRightClick}>
      {content}
    </div>
  )
}

const unclickedStyle: CSSProperties = {
  backgroundColor: 'gray',
  border: '1px solid black',
  width: '100%',
  height: '100%'
}

const markedStyle: CSSProperties = {
  backgroundColor: 'gray',
  border: '1px solid black',
  width: '100%',
  height: '100%'
}

const clickedMineStyle: CSSProperties = {
  backgroundColor: 'red',
  border: '1px solid black',
  width: '100%',
  height: '100%'
}

const clickedNotMineStyle: CSSProperties = {
  backgroundColor: 'whitesmoke',
  border: '1px solid black',
  width: '100%',
  height: '100%'
}
