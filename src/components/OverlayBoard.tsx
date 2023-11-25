import calculateWinner from "../util/calculateWinner";
import Square from "./Square";
import Board from "./GameBoard";

type OnPlayType = (nextSquares: Array<string | null>) => void;

interface BoardProps {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: OnPlayType;
  isReplay: boolean;
  currentReplayBox: number | null | undefined;
}

export default function OverlayBoard({
  xIsNext,
  squares,
  onPlay,
  isReplay,
  currentReplayBox,
}: BoardProps) {
  const winnerData = calculateWinner(squares);
  let winner: string | undefined | null = undefined;
  let status: string;
  let winnerLines: number[] | undefined = undefined;
  const totalBoardSquares = 9;

  if (winnerData) {
    winner = winnerData?.winner;
  }

  if (squares.every((e) => e === "X" || e === "O") && !winner) {
    status = "Draw";
  } else if (winner) {
    status = "Winner: " + winner[0];
    winnerLines = winnerData!.winnerLines;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const board = Board({
    winnerLines,
    squares,
    onPlay,
    isReplay,
    currentReplayBox,
    xIsNext,
    totalBoardSquares,
  });

  return (
    <>
      <div className="board-div">
        <div className="board">
          <div className="winnerStatus">{status}</div>
          <div className="squares-y-axis">
            <div>0</div>
            <div>1</div>
            <div>2</div>
          </div>
          <div className="box-squares">
            <div className="squares-x-axis">
              <div>0</div>
              <div>1</div>
              <div>2</div>
            </div>
            <div className="board-squares">{board}</div>
          </div>
        </div>
      </div>
    </>
  );
}
