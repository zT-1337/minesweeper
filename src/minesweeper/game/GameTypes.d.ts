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
  mineCount: number,
  flaggedCounter: number,
}

export type GenerateEmptyFieldRequest = {
  width: number,
  height: number
}

export type GenerateFieldWithMinesRequest = GenerateEmptyFieldRequest & {
  clickedCellIndex: number,
  mineCount: number
}
