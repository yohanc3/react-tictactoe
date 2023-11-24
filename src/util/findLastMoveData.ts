interface CoordsData {
  x: number | null;
  y: number | null;
  player: string | null;
  boxNumber: number | null;
}

export default function findLastMoveData(
  actualBoard: Array<string | null>,
  previousBoard: Array<string | null>,
  move: number
) {
  let x: number = -1,
    y: number = -1,
    coords: CoordsData,
    differentMove: number = -1,
    player: string | null;
  if (move === 0) return;

  for (let i = 0; i < 9; i++) {
    if (actualBoard[i] !== previousBoard[i]) {
      differentMove = i;
    }
    if (actualBoard[i] !== previousBoard[i] && i === 8) {
      differentMove = 8;
    }
  }

  if ([0, 3, 6].includes(differentMove)) y = 0;
  if ([1, 4, 7].includes(differentMove)) y = 1;
  if ([2, 5, 8].includes(differentMove)) y = 2;

  if ([0, 1, 2].includes(differentMove)) x = 0;
  if ([3, 4, 5].includes(differentMove)) x = 1;
  if ([6, 7, 8].includes(differentMove)) x = 2;

  player = actualBoard[differentMove];

  let boxNumber: number = -1;
  if (x !== -1 || y !== -1) {
    boxNumber = x * 3 + y;
  }

  coords = {
    x: x,
    y: y,
    player: player,
    boxNumber: boxNumber,
  };

  return coords;
}
