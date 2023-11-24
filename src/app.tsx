import { ButtonHTMLAttributes, useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Square from "./components/Square";
import Board from "./components/overlayBoard";
import findLastMoveData from "./util/findLastMoveData";
import getMovesHistory from "./components/getMovesHistory";
import "./App.css";

export default function Game() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [isReversed, setReversed] = useState<boolean>(false);
  const [isReplay, setIsReplay] = useState<boolean>(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares: Array<string | null> = history![currentMove];
  //moves is the history of past moves sidebar
  const moves = getMovesHistory(
    history,
    xIsNext,
    currentMove,
    jumpTo,
    isReversed
  );

  function handlePlay(nextSquares: Array<string | null>) {
    const nextHistory: Array<Array<string | null>> = [
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
    let replayBoxIndex: number | null = findLastMoveData(
      history[currentMove],
      history[currentMove - 1],

      currentMove
    )!.boxNumber;
    return replayBoxIndex;
  }

  return (
    <div className="game">
      <button onClick={() => reverseMoves()}>Reverse</button>
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          isReplay={isReplay}
          currentReplayBox={findCurrentReplayBox()}
        />
      </div>
      <div className="game-info">
        <ol className="game-moves">{moves}</ol>
      </div>
    </div>
  );
}
