import Square from "../components/square";
import calculateWinner from "./calculateWinner";

type onPlayType = (nextSquares: Array<string | null>) => void;

interface getBoardProps {
  winnerLines: number[] | undefined;
  squares: Array<string | null>;
  onPlay: onPlayType;
  isReplay: boolean;
  currentReplayBox: number | null | undefined;
  xIsNext: boolean;
}

export default function getBoard({
  winnerLines,
  squares,
  onPlay,
  isReplay,
  currentReplayBox,
  xIsNext,
}: getBoardProps) {
  let count: number = -1;
  let board = Array(3)
    .fill(null)
    .map((value, index) => {
      return (
        <div key={index} className="board-row">
          {Array(3)
            .fill(null)
            .map((v, i) => {
              count++;
              let secondCount: number = count + 0;

              return (
                <Square
                  key={i}
                  squareNumber={secondCount}
                  winnerData={winnerLines}
                  value={squares[count]}
                  onSquareClick={() =>
                    handleClick(secondCount, squares, xIsNext, onPlay)
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
