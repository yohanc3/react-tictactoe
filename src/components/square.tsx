interface squareProps {
  value: string | null;
  onSquareClick(event: React.MouseEvent<HTMLButtonElement>): void;
  winnerData: number[] | undefined;
  squareNumber: number;
  currentReplayBox: number | null | undefined;
  isReplay: boolean;
}

export default function Square({
  value,
  onSquareClick,
  winnerData,
  squareNumber,
  currentReplayBox,
  isReplay,
}: squareProps) {
  let className: string = "square";
  if (winnerData !== undefined) {
    className = winnerData.includes(squareNumber) ? "winner-square" : "square";
  } else if (currentReplayBox === squareNumber && isReplay) {
    className = "replay-square";
  }

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}
