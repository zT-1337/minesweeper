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
    isLost: false
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
      clickState: i === request.clickedCellIndex ? 'clicked' : 'unclicked',
      isMine: minePositions.get(i) === true,
      mineNeighbourCounter: countMineNeighbours(i, minePositions, request.width, request.height)
    }
  }

  return {
    cells: cells,
    width: request.width,
    height: request.height,
    isLost: false
  }
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

function hasLeftNeighbour (index: number, width: number): boolean {
  return index % width === 0
}

function getLeftNeighbourPosition (index: number): number {
  return index - 1
}

function hasRightNeighbour (index: number, width: number): boolean {
  return index % width === width - 1
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
