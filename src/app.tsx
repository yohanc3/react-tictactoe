import { ButtonHTMLAttributes, useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface squareProps {
  value: string | null;
  onSquareClick(event: React.MouseEvent<HTMLButtonElement>): void;
  winnerData: number[] | undefined;
  squareNumber: number;
  currentReplayBox: number | null | undefined;
  isReplay: boolean;
}

interface coordsData {
  x: number | null;
  y: number | null;
  player: string | null;
  boxNumber: number | null;
}

interface BoardProps {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: Function;
  isReplay: boolean;
  currentReplayBox: number | null | undefined;
}

function Square({
  value,
  onSquareClick,
  winnerData,
  squareNumber,
  currentReplayBox,
  isReplay,
}: squareProps) {
  console.log(currentReplayBox);
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

export default function Game() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [isReversed, setReversed] = useState<boolean>(false);
  const [isReplay, setIsReplay] = useState<boolean>(false);
  const xIsNext = currentMove % 2 === 0;

  const currentSquares: Array<string | null> = history![currentMove];

  function handlePlay(nextSquares: Array<string | null>) {
    console.log(history, "CURRENT SQUARES");
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

  function findLastMoveData(
    actualBoard: Array<string | null>,
    previousBoard: Array<string | null>,
    move: number
  ) {
    let x: number = -1,
      y: number = -1,
      coords: coordsData,
      differentMove: number = -1,
      player: string | null;
    if (move === 0) return;

    for (let i = 0; i < 9; i++) {
      if (actualBoard[i] !== previousBoard[i]) {
        differentMove = i;
        console.log(differentMove, "DIFFERENT MOVE");
      }
      if (actualBoard[i] !== previousBoard[i] && i === 9) {
        differentMove = -1;
      }
    }

    if ([0, 3, 6].includes(differentMove)) y = 0;
    if ([1, 4, 7].includes(differentMove)) y = 1;
    if ([2, 5, 8].includes(differentMove)) y = 2;

    if ([0, 1, 2].includes(differentMove)) x = 0;
    if ([3, 4, 5].includes(differentMove)) x = 1;
    if ([6, 7, 8].includes(differentMove)) x = 2;

    player = actualBoard[differentMove];

    let boxNumber: number = -1;
    if (x && y) {
      boxNumber = x * 3 + y;
    }

    // console.log(x, y, boxNumber);
    coords = {
      x: x,
      y: y,
      player: player,
      boxNumber: boxNumber,
    };

    return coords;
  }

  function getMoves() {
    let moves = history.map((squares, move) => {
      let description: string = "";
      let playerFromCurrentMove: string | undefined = undefined;
      let coordsData: coordsData | undefined = findLastMoveData(
        squares,
        history[move - 1],
        move
      );
      let shouldShowButton;
      let button;

      let buttonText: string | undefined = undefined;

      let coords: string | undefined = undefined;

      if (coordsData !== undefined) {
        coords = `${coordsData.x}, ${coordsData.y}`;
      }

      let nextPlayer = !xIsNext ? "X" : "O";

      if (coords !== undefined && coordsData !== undefined) {
        if (typeof coordsData.player === "string" && coords) {
          playerFromCurrentMove = coordsData.player;
        } else {
          playerFromCurrentMove = " ";
        }
      } else {
        playerFromCurrentMove = undefined;
      }

      if (
        coords !== undefined &&
        coordsData !== undefined &&
        typeof coordsData.x === "number" &&
        typeof coordsData.y === "number"
      ) {
        coords = `${coordsData.x}, ${coordsData.y}`;
      } else {
        coords = undefined;
      }

      if (move === currentMove) {
        if (move === 0) {
          description = "You are at the beginning of the game";
        } else {
          description =
            "You are at move #" +
            currentMove +
            " -- (" +
            coords +
            ")" +
            " Player: " +
            nextPlayer;
        }
        button = description;
      } else if (move > 0 && move !== currentMove) {
        description = "Go to move #" + move;
      } else {
        description = "Go to game start";
        coords = "";
        button = (
          <button onClick={() => jumpTo(move)}>{`${description}`}</button>
        );
      }

      if (!button && !buttonText) {
        button = (
          <button onClick={() => jumpTo(move)}>
            {`${description} --- ${coords} Player: ${playerFromCurrentMove}`}
          </button>
        );
      }

      return <li key={move}>{button}</li>;
    });

    if (isReversed) {
      moves.sort((a, b) => Number(b.key) - Number(b.key));
    } else if (!isReversed) {
      moves.sort((a, b) => Number(a.key) - Number(b.key));
    }

    return moves;
  }

  function findCurrentReplayBox() {
    if (currentMove === 0) return;
    let replayBoxIndex: number | null = findLastMoveData(
      history[currentMove],
      history[currentMove - 1],

      currentMove
    )!.boxNumber;
    console.log(replayBoxIndex);
    return replayBoxIndex;
  }

  const gameMoves = getMoves();

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
        <ol className="game-moves">{gameMoves}</ol>
      </div>
    </div>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
  isReplay,
  currentReplayBox,
}: BoardProps) {
  function handleClick(squareIndex: number) {
    if (squares[squareIndex] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    if (xIsNext) newSquares[squareIndex] = "X";
    else if (!xIsNext) newSquares[squareIndex] = "O";

    onPlay(newSquares);
  }

  const winnerData = calculateWinner(squares);

  let winner: string | undefined | null = undefined;

  if (winnerData) {
    winner = winnerData?.winner;
  }

  let status: string;
  let winnerLines: number[] | undefined = undefined;

  if (squares.every((e) => e === "X" || e === "O") && !winner) {
    status = "Draw";
  } else if (winner) {
    status = "Winner: " + winner[0];
    winnerLines = winnerData!.winnerLines;
    console.log("WINNER DATA", winnerLines);
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let count: number = -1;

  function getBoard() {
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
                    onSquareClick={() => handleClick(secondCount)}
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

  const board = getBoard();

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

function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winnerLines: lines[i],
      };
    }
  }
  return null;
}
