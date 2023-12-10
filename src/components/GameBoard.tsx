import Square from "./Square";
import calculateWinner from "../util/calculateWinner";

interface GetBoardProps { 
  winnerData: number[] | undefined;
  squares: Array<string | null>;
  onPlay: (nextSquares: (string | null)[]) => void;
  isReplay: boolean;
  currentReplayBox: number | null | undefined;
  xIsNext: boolean;
  totalBoardSquares: number;
}

export default function GameBoard({ winnerData, squares, onPlay, isReplay, currentReplayBox, xIsNext, totalBoardSquares }: GetBoardProps) {
  const length = Math.sqrt(totalBoardSquares);

  return Array.from({ length }, (value, rowIndex) => {
    return (
      <div key={rowIndex} className="board-row">
        {Array.from({ length }, (v, colIndex) => {
          const squareNumber = rowIndex * length + colIndex;
          const key = squareNumber;
          const onClick = () => handleClick(squareNumber, squares, xIsNext, onPlay);

          return <Square {...{ key, squareNumber, winnerData, onClick, isReplay, currentReplayBox }}> {squares[squareNumber] }</Square>;
        })}
      </div>
    );
  });
}

function handleClick(squareIndex: number, squares: Array<string | null>, xIsNext: boolean, onPlay: Function) {
  if (squares[squareIndex] || calculateWinner(squares)) return;

  const newSquares = squares.slice();
  if (xIsNext) newSquares[squareIndex] = "X";
  else if (!xIsNext) newSquares[squareIndex] = "O";

  onPlay(newSquares);
}
