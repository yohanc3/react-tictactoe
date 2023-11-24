import Square from "./Square";
import calculateWinner from "../util/calculateWinner";

type onPlayType = (nextSquares: Array<string | null>) => void;

interface GetBoardProps {
  winnerLines: number[] | undefined;
  squares: Array<string | null>;
  onPlay: onPlayType;
  isReplay: boolean;
  currentReplayBox: number | null | undefined;
  xIsNext: boolean;
  totalBoardSquares: number;
}

export default function getBoard({
  winnerLines,
  squares,
  onPlay,
  isReplay,
  currentReplayBox,
  xIsNext,
  totalBoardSquares,
}: GetBoardProps) {
  const boardLength = Math.sqrt(totalBoardSquares);
  if (boardLength % 0) return;

  let squareNumber: number = -1;

  const board = Array(boardLength)
    .fill(null)
    .map((value, index) => {
      return (
        <div key={index} className="board-row">
          {Array(boardLength)
            .fill(null)
            .map((v, i) => {
              squareNumber++;
              const squareNumberCopy: number = squareNumber + 0;

              return (
                <Square
                  key={squareNumberCopy}
                  squareNumber={squareNumberCopy}
                  winnerData={winnerLines}
                  value={squares[squareNumberCopy]}
                  onSquareClick={() =>
                    handleClick(squareNumberCopy, squares, xIsNext, onPlay)
                  }
                  isReplay={isReplay}
                  currentReplayBox={currentReplayBox}
                />
              );
            })}
        </div>
      );
    });

  return board;
}

function handleClick(
  squareIndex: number,
  squares: Array<string | null>,
  xIsNext: boolean,
  onPlay: Function
) {
  if (squares[squareIndex] || calculateWinner(squares)) return;

  const newSquares = squares.slice();
  if (xIsNext) newSquares[squareIndex] = "X";
  else if (!xIsNext) newSquares[squareIndex] = "O";

  onPlay(newSquares);
}
