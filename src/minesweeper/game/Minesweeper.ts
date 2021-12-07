import { getRandomInt } from '../../util/random'
import { Cell, GenerateFieldWithMinesRequest, Field, GenerateEmptyFieldRequest } from './GameTypes'

export function generateEmptyField (request: GenerateEmptyFieldRequest): Field {
  const cellCount = request.width * request.height
  const cells: Cell[] = new Array(cellCount)

  for (let i = 0; i < cellCount; ++i) {
    cells[i] = {
      index: i,
      clickState: 'unclicked',
      isMine: false,
      mineNeighbourCounter: 0
    }
  }

  return {
    cells: cells,
    width: request.width,
    height: request.height,
    mineCount: 0,
    markedCounter: 0,
    winningStatus: 'ongoing'
  }
}

export function generateFieldWithMines (request: GenerateFieldWithMinesRequest): Field {
  const cellCount = request.width * request.height
  const cells: Cell[] = new Array(cellCount)
  const minePositions = new Map<number, boolean>()

  while (minePositions.size < request.mineCount) {
    const nextPosition = getRandomInt(0, cellCount)

    if (nextPosition !== request.clickedCellIndex) {
      minePositions.set(nextPosition, true)
    }
  }

  for (let i = 0; i < cellCount; ++i) {
    cells[i] = {
      index: i,
      clickState: 'unclicked',
      isMine: minePositions.get(i) === true,
      mineNeighbourCounter: countMineNeighbours(i, minePositions, request.width, request.height)
    }
  }

  return clickCell({
    cells: cells,
    width: request.width,
    height: request.height,
    mineCount: request.mineCount,
    markedCounter: 0,
    winningStatus: 'ongoing'
  }, request.clickedCellIndex)
}

export function clickCell (field: Field, index: number): Field {
  if (field.cells[index].clickState !== 'unclicked') {
    return field
  }

  const copiedField: Field = {
    cells: copyCells(field.cells),
    width: field.width,
    height: field.height,
    mineCount: field.mineCount,
    markedCounter: field.markedCounter,
    winningStatus: field.winningStatus
  }

  clickCellWithoutCopying(copiedField, index)

  return copiedField
}

function clickCellWithoutCopying (field: Field, index: number): void {
  if (field.cells[index].clickState !== 'unclicked') return

  const clickedCell = field.cells[index]
  clickedCell.clickState = 'clicked'

  if (clickedCell.mineNeighbourCounter !== 0 || clickedCell.isMine) return

  const neighbours = getNeighbours(field, index)

  for (const neighbour of neighbours) {
    clickCellWithoutCopying(field, neighbour.index)
  }
}

export function markCell (field: Field, index: number): Field {
  if (field.cells[index].clickState === 'clicked') {
    return field
  }

  const copiedCells = copyCells(field.cells)
  const markedCell = copiedCells[index]
  const wasUnmarked = markedCell.clickState === 'unclicked'

  markedCell.clickState = wasUnmarked ? 'marked' : 'unclicked'

  return {
    cells: copiedCells,
    width: field.width,
    height: field.height,
    mineCount: field.mineCount,
    markedCounter: wasUnmarked ? field.markedCounter + 1 : field.markedCounter - 1,
    winningStatus: 'ongoing'
  }
}

function copyCells (cells: Cell[]): Cell[] {
  return cells.map((cell: Cell) => Object.assign({}, cell))
}

function countMineNeighbours (index: number, minePositions: Map<number, boolean>, width: number, height: number): number {
  let counter = 0

  if (hasLeftNeighbour(index, width) && minePositions.get(getLeftNeighbourPosition(index))) {
    counter += 1
  }

  if (hasRightNeighbour(index, width) && minePositions.get(getRightNeighbourPosition(index))) {
    counter += 1
  }

  if (hasTopNeighbour(index, width) && minePositions.get(getTopNeighbourPosition(index, width))) {
    counter += 1
  }

  if (hasBottomNeighbour(index, width, height) && minePositions.get(getBottomNeighbourPosition(index, width))) {
    counter += 1
  }

  if (hasTopLeftNeighbour(index, width) && minePositions.get(getTopLeftNeighbourPosition(index, width))) {
    counter += 1
  }

  if (hasTopRightNeighbour(index, width) && minePositions.get(getTopRightNeighbourPosition(index, width))) {
    counter += 1
  }

  if (hasBottomLeftNeighbour(index, width, height) && minePositions.get(getBottomLeftNeighbourPosition(index, width))) {
    counter += 1
  }

  if (hasBottomRightNeighbour(index, width, height) && minePositions.get(getBottomRightNeighbourPosition(index, width))) {
    counter += 1
  }

  return counter
}

function getNeighbours (field: Field, index: number): Cell[] {
  const result: Cell[] = []

  if (hasLeftNeighbour(index, field.width)) {
    result.push(field.cells[getLeftNeighbourPosition(index)])
  }

  if (hasRightNeighbour(index, field.width)) {
    result.push(field.cells[getRightNeighbourPosition(index)])
  }

  if (hasBottomNeighbour(index, field.width, field.height)) {
    result.push(field.cells[getBottomNeighbourPosition(index, field.width)])
  }

  if (hasTopNeighbour(index, field.width)) {
    result.push(field.cells[getTopNeighbourPosition(index, field.width)])
  }

  if (hasBottomLeftNeighbour(index, field.width, field.height)) {
    result.push(field.cells[getBottomLeftNeighbourPosition(index, field.width)])
  }

  if (hasBottomRightNeighbour(index, field.width, field.height)) {
    result.push(field.cells[getBottomRightNeighbourPosition(index, field.width)])
  }

  if (hasTopLeftNeighbour(index, field.width)) {
    result.push(field.cells[getTopLeftNeighbourPosition(index, field.width)])
  }

  if (hasTopRightNeighbour(index, field.width)) {
    result.push(field.cells[getTopRightNeighbourPosition(index, field.width)])
  }

  return result
}

function hasLeftNeighbour (index: number, width: number): boolean {
  return index % width !== 0
}

function getLeftNeighbourPosition (index: number): number {
  return index - 1
}

function hasRightNeighbour (index: number, width: number): boolean {
  return index % width !== width - 1
}

function getRightNeighbourPosition (index: number): number {
  return index + 1
}

function hasTopNeighbour (index: number, width: number): boolean {
  return index - width > -1
}

function getTopNeighbourPosition (index: number, width: number): number {
  return index - width
}

function hasBottomNeighbour (index: number, width: number, height: number): boolean {
  return index + width < width * height
}

function getBottomNeighbourPosition (index: number, width: number): number {
  return index + width
}

function hasTopLeftNeighbour (index: number, width: number): boolean {
  return hasLeftNeighbour(index, width) && hasTopNeighbour(index, width)
}

function getTopLeftNeighbourPosition (index: number, width: number): number {
  return index - width - 1
}

function hasTopRightNeighbour (index: number, width: number): boolean {
  return hasRightNeighbour(index, width) && hasTopNeighbour(index, width)
}

function getTopRightNeighbourPosition (index: number, width: number): number {
  return index - width + 1
}

function hasBottomLeftNeighbour (index: number, width: number, height: number): boolean {
  return hasLeftNeighbour(index, width) && hasBottomNeighbour(index, width, height)
}

function getBottomLeftNeighbourPosition (index: number, width: number): number {
  return index + width - 1
}

function hasBottomRightNeighbour (index: number, width: number, height: number): boolean {
  return hasRightNeighbour(index, width) && hasBottomNeighbour(index, width, height)
}

function getBottomRightNeighbourPosition (index: number, width: number): number {
  return index + width + 1
}
