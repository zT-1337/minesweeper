import React, { CSSProperties } from 'react'
import { Field } from '../../game/GameTypes'
import { FieldCell } from './FieldCell'

export type FieldContainerPropType = {
  field: Field
  onCellLeftClick(index: number): void
  onCellRightClick(index: number): void
}

export function FieldContainer (props: FieldContainerPropType) {
  const fieldContainerStyle = createFieldContainerStyle(props.field.width, props.field.height)

  return (
    <div style={fieldContainerStyle}>
      {props.field.cells.map((cell) =>
        <FieldCell
          key={`fieldCell-${cell.index}`} cell={cell}
          onLeftClick={props.onCellLeftClick}
          onRightClick={props.onCellRightClick}
        />
      )}
    </div>
  )
}

const fieldCellSizeInPx: number = 32

function createFieldContainerStyle (width: number, height: number): CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns: `${fieldCellSizeInPx}px `.repeat(width),
    gridTemplateRows: `${fieldCellSizeInPx}px `.repeat(height)
  }
}
