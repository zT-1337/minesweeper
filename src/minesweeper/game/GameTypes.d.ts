export type Cell = {
  index: number,
  clickState: 'clicked' | 'unclicked' | 'marked',
  isMine: boolean,
  mineNeighbourCounter: number
}

export type WinningStatus = 'won' | 'lost' | 'ongoing'

export type Field = {
  cells: Cell[],
  width: number,
  height: number,
  mineCount: number,
  markedCounter: number,
  winningStatus: WinningStatus
}

export type GenerateEmptyFieldRequest = {
  width: number,
  height: number
}

export type GenerateFieldWithMinesRequest = GenerateEmptyFieldRequest & {
  clickedCellIndex: number,
  mineCount: number
}
