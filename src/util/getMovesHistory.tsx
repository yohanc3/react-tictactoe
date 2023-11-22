import findLastMoveData from "./findLastMoveData";

interface coordsData {
  x: number | null;
  y: number | null;
  player: string | null;
  boxNumber: number | null;
}

export default function getMoves(
  history: Array<Array<string | null>>,
  xIsNext: boolean,
  currentMove: number,
  jumpTo: Function,
  isReversed: boolean
) {
  let moves = history.map((squares: Array<string | null>, move: number) => {
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
      button = <button onClick={() => jumpTo(move)}>{`${description}`}</button>;
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
    moves.sort((a, b) => Number(b.key) - Number(a.key));
  } else if (!isReversed) {
    moves.sort((a, b) => Number(a.key) - Number(b.key));
  }

  return moves;
}
