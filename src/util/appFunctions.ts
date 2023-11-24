import findLastMoveData from "./findLastMoveData";

export function handlePlay(nextSquares: Array<string | null>) {
  const nextHistory: Array<Array<string | null>> = [
    ...history.slice(0, currentMove + 1),
    nextSquares,
  ];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
  setIsReplay(false);
}

export function jumpTo(nextMove: number) {
  setCurrentMove(nextMove);
  setIsReplay(true);
}

export function reverseMoves() {
  setReversed(!isReversed);
}

export function findCurrentReplayBox() {
  if (currentMove === 0) return;
  let replayBoxIndex: number | null = findLastMoveData(
    history[currentMove],
    history[currentMove - 1],
    currentMove
  )!.boxNumber;
  return replayBoxIndex;
}
