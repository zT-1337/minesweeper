import React, { useRef, useState } from 'react'
import { Field } from '../../game/GameTypes'
import { clickCell, generateEmptyField, generateFieldWithMines, markCell } from '../../game/Minesweeper'
import { FieldContainer } from '../GameField/FieldContainer'
import { GameFooter } from '../GameFooter/GameFooter'
import { GameHeader } from '../GameHeader/GameHeader'

export function GameContainer () {
  const [fieldWidth, setFieldWidth] = useState(32)
  const [fieldHeight, setFieldHeight] = useState(17)
  const [mineCount, setMineCount] = useState(170)
  const [inputFieldError, setInputFieldError] = useState<string | undefined>(undefined)

  const [isGenerated, setIsGenerated] = useState(false)
  const [field, setField] = useState(generateEmptyField({
    width: fieldWidth,
    height: fieldHeight
  }))

  const [timer, setTimer] = useState(0)
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined)
  const timerRef = useRef<number>(0)
  timerRef.current = timer

  const onResetButton = () => {
    setTimer(0)

    const nextFieldState = generateEmptyField({
      width: fieldWidth, height: fieldHeight
    })
    setField(nextFieldState)
    setIsGenerated(false)
    clearTimer()
  }

  const onRegenerate = (width: number, height: number, mineCount: number) => {
    if (mineCount > width * height - 1) {
      setInputFieldError('Too many mines')
      return
    }

    setFieldWidth(width)
    setFieldHeight(height)
    setMineCount(mineCount)
    onResetButton()
    setInputFieldError(undefined)
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
      width: fieldWidth,
      height: fieldHeight,
      mineCount: mineCount,
      clickedCellIndex: index
    }))

    setIsGenerated(true)

    setIntervalId(window.setInterval(countUp, 1000))
  }

  const onCellLeftClick = (index: number) => {
    if (field.winningStatus !== 'ongoing') return

    const nextState = clickCell(field, index)
    setField(nextState)
    handleTurnFinished(nextState)
  }

  const handleTurnFinished = (field: Field) => {
    if (field.winningStatus === 'ongoing') return

    clearTimer()
  }

  const onCellRightClick = (index: number) => {
    if (!isGenerated || field.winningStatus !== 'ongoing') return

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
      <GameFooter
        width={fieldWidth}
        height={fieldHeight}
        mineCount={mineCount}
        onRegenerate={onRegenerate}
        inputError={inputFieldError}
      />
    </div>
  )
}
