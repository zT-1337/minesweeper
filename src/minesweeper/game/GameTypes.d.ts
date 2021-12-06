export type Cell = {
  index: number,
  clickState: 'clicked' | 'unclicked' | 'marked',
  isMine: boolean,
  mineNeighbourCounter: number
}

export type Field = {
  cells: Cell[],
  width: number,
  height: number,
  isLost: boolean
}

export type GenerateEmptyFieldRequest = {
  width: number,
  height: number
}

export type GenerateFieldWithMinesRequest = GenerateEmptyFieldRequest & {
  clickedCellIndex: number,
  mineCount: number
}
