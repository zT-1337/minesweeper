import React, { CSSProperties } from 'react'
import { Field, WinningStatus } from '../../game/GameTypes'
import { FieldCell } from './FieldCell'

export type FieldContainerPropType = {
  field: Field
  onCellLeftClick(index: number): void
  onCellRightClick(index: number): void
}

export function FieldContainer (props: FieldContainerPropType) {
  const fieldStyle = createFieldStyle(props.field.width, props.field.height)
  const fieldContainerStyle = createFieldContainerStyle(props.field.winningStatus)

  return (
    <div style={fieldContainerStyle}>
      <div style={fieldStyle}>
        {props.field.cells.map((cell) =>
          <FieldCell
            key={`fieldCell-${cell.index}`} cell={cell}
            onLeftClick={props.onCellLeftClick}
            onRightClick={props.onCellRightClick}
          />
        )}
      </div>
    </div>
  )
}

const fieldCellSizeInPx: number = 32

function createFieldContainerStyle (winningStatus: WinningStatus): CSSProperties {
  let backgroundColor = 'gray'

  if (winningStatus === 'won') {
    backgroundColor = 'green'
  }

  if (winningStatus === 'lost') {
    backgroundColor = 'red'
  }

  return {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor
  }
}

function createFieldStyle (width: number, height: number): CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns: `${fieldCellSizeInPx}px `.repeat(width),
    gridTemplateRows: `${fieldCellSizeInPx}px `.repeat(height)
  }
}
