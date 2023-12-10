import calculateWinner from "../util/calculateWinner";
import Square from "./Square";
import Board from "./GameBoard";


interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay:  (nextSquares: (string | null)[]) => void;
  isReplay: boolean;
  currentReplayBox: number | null | undefined;
}

export default function OverlayBoard({ xIsNext, squares, onPlay, isReplay, currentReplayBox }: BoardProps) {
  const winnerData = calculateWinner(squares);
  const totalBoardSquares = 9;
  const winner = winnerData?.winner;
  const status = winner ? "Winner: " + winner : squares.every((e) => e) ? "Draw" : "Next player: " + (xIsNext ? "X" : "O");


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
            <div className="board-squares"><Board {...{ winnerData: winnerData?.winnerLines, squares, onPlay, isReplay, currentReplayBox, xIsNext, totalBoardSquares, }} /></div>
          </div>
        </div>
      </div>
    </>
  );
}
