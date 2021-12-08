import React, { FormEvent, useState } from 'react'

export type GameFooterPropType = {
  width: number,
  height: number,
  mineCount: number,
  onRegenerate(width: number, height: number, mineCount: number): void,
  inputError: string | undefined
}

export function GameFooter (props: GameFooterPropType) {
  const [width, setWidth] = useState(props.width)
  const [height, setHeight] = useState(props.height)
  const [mineCount, setMineCount] = useState(props.mineCount)

  const onWidthInputChanged = (event: FormEvent<HTMLInputElement>) => {
    fieldValueChanged(event.currentTarget.value, setWidth)
  }

  const onHeightInputChanged = (event: FormEvent<HTMLInputElement>) => {
    fieldValueChanged(event.currentTarget.value, setHeight)
  }

  const onMineCountInputChanged = (event: FormEvent<HTMLInputElement>) => {
    fieldValueChanged(event.currentTarget.value, setMineCount)
  }

  const onRegenerateClicked = () => {
    props.onRegenerate(width, height, mineCount)
  }

  return (
    <div>
      <div>
        <label htmlFor='widthInput'>Width:</label>
        <input id='widthInput' type='text' name='widthInput' onChange={onWidthInputChanged} value={width}/>
      </div>
      <div>
        <label htmlFor='heightInput'>Height:</label>
        <input id='heightInput' type='text' name='heightInput' onChange={onHeightInputChanged} value={height}/>
      </div>
      <div>
        <label htmlFor='mineCountInput'>Mine Count:</label>
        <input id='mineCountInput' type='text' name='mineCountInput' onChange={onMineCountInputChanged} value={mineCount}/>
      </div>
      <button onClick={onRegenerateClicked}>Regenerate</button>
      <div>{props.inputError !== undefined && props.inputError}</div>
    </div>
  )
}

function fieldValueChanged (value: string, setValue: (value: number) => void) {
  const number = Number.parseInt(value)
  if (isNaN(number)) return

  if (number < 1) {
    return
  }

  if (!Number.isInteger(number)) {
    return
  }

  setValue(number)
}
