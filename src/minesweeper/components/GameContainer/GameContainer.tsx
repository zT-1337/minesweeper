import React, { useState } from 'react'
import { clickCell, generateEmptyField, generateFieldWithMines, markCell } from '../../game/minesweeper'
import { FieldContainer } from '../GameField/FieldContainer'

export function GameContainer () {
  const [isGenerated, setIsGenerated] = useState(false)
  const [field, setField] = useState(generateEmptyField({
    width: 32,
    height: 17
  }))

  const onFirstCellLeftClick = (index: number) => {
    setField(generateFieldWithMines({
      width: 32,
      height: 17,
      mineCount: 170,
      clickedCellIndex: index
    }))

    setIsGenerated(true)
  }

  const onCellLeftClick = (index: number) => {
    setField(clickCell(field, index))
  }

  const onCellRightClick = (index: number) => {
    if (!isGenerated) return

    setField(markCell(field, index))
  }

  return (
    <FieldContainer
      field={field}
      onCellLeftClick={isGenerated ? onCellLeftClick : onFirstCellLeftClick}
      onCellRightClick={onCellRightClick}
    />
  )
}
