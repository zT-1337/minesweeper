import React, { useRef, useState } from 'react'
import { Field } from '../../game/GameTypes'
import { clickCell, generateEmptyField, generateFieldWithMines, markCell } from '../../game/Minesweeper'
import { FieldContainer } from '../GameField/FieldContainer'
import { GameHeader } from '../GameHeader/GameHeader'

export function GameContainer () {
  const [isGenerated, setIsGenerated] = useState(false)
  const [field, setField] = useState(generateEmptyField({
    width: 32,
    height: 17
  }))

  const [timer, setTimer] = useState(0)
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined)
  const timerRef = useRef<number>(0)
  timerRef.current = timer

  const onResetButton = () => {
    setTimer(0)

    const nextFieldState = generateEmptyField({
      width: 32, height: 17
    })
    setField(nextFieldState)
    setIsGenerated(false)
    clearTimer()
  }

  const clearTimer = () => {
    if (intervalId === undefined) return

    clearInterval(intervalId)
    setIntervalId(undefined)
  }

  const countUp = () => {
    setTimer(timerRef.current + 1)
  }

  const onFirstCellLeftClick = (index: number) => {
    setField(generateFieldWithMines({
      width: 32,
      height: 17,
      mineCount: 170,
      clickedCellIndex: index
    }))

    setIsGenerated(true)

    setIntervalId(window.setInterval(countUp, 1000))
  }

  const onCellLeftClick = (index: number) => {
    if (field.winningStatus === 'lost') return

    const nextState = clickCell(field, index)
    setField(nextState)
    handleTurnFinished(nextState)
  }

  const handleTurnFinished = (field: Field) => {
    if (field.winningStatus === 'ongoing') return

    clearTimer()
  }

  const onCellRightClick = (index: number) => {
    if (!isGenerated || field.winningStatus === 'lost') return

    const nextState = markCell(field, index)
    setField(nextState)
    handleTurnFinished(nextState)
  }

  return (
    <div>
      <GameHeader
        timer={timer}
        mineCount={field.mineCount}
        markedCounter={field.markedCounter}
        onResetButton={onResetButton}
      />
      <FieldContainer
        field={field}
        onCellLeftClick={isGenerated ? onCellLeftClick : onFirstCellLeftClick}
        onCellRightClick={onCellRightClick}
      />
    </div>
  )
}
