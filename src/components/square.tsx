interface SquareProps {
  children: React.ReactNode;
  winnerData: number[] | undefined;
  squareNumber: number;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  currentReplayBox: number | null | undefined;
  isReplay: boolean;
}

export default function Square({ children, onClick, winnerData, squareNumber, currentReplayBox, isReplay }: SquareProps) {
  const className = winnerData?.includes(squareNumber) ? "winner-square" : currentReplayBox === squareNumber && isReplay ? "replay-square" : "square";

  return <button {...{ onClick, className }}>{children}</button>;
}
