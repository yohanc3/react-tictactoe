import { useState } from "react";
import Board from "./components/OverlayBoard";
import findLastMoveData from "./util/findLastMoveData";
import MovesHistoryPane from "./components/MovesHistoryPane";
import "./App.css";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null) as (string | null)[]]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isReversed, setReversed] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const squares = history![currentMove];

  function onPlay(nextSquares: (string | null)[]) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsReplay(false);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setIsReplay(true);
  }

  function reverseMoves() {
    setReversed(!isReversed);
  }

  function findCurrentReplayBox() {
    if (currentMove === 0) return;
    return findLastMoveData(history[currentMove], history[currentMove - 1], currentMove)!.boxNumber;
  
  }

  return (
    <div className="game">
      <button onClick={() => reverseMoves()}>Reverse</button>
      <div className="game-board">
        <Board
          {...{xIsNext, squares, onPlay, isReplay}} currentReplayBox={findCurrentReplayBox()}
        />
      </div>
      <div className="game-info">
        <ol className="game-moves"> <MovesHistoryPane {...{history, currentMove, jumpTo, isReversed}}/> </ol>
      </div>
    </div>
  );
}
