import findLastMoveData from "../util/findLastMoveData";

interface CoordsData {
  x: number | null;
  y: number | null;
  player: string | null;
  boxNumber: number | null;
}

export default function movesPane(
  history: Array<Array<string | null>>,
  xIsNext: boolean,
  currentMove: number,
  jumpTo: Function,
  isReversed: boolean
) {
  let moves = history.map((squares: Array<string | null>, move: number) => {
    let description: string = "";
    let playerFromCurrentMove: string | undefined = undefined;
    let coordsData: CoordsData | undefined = findLastMoveData(
      squares,
      history[move - 1],
      move
    );

    let coords: string | undefined = undefined;

    if (coordsData !== undefined) {
      coords = `${coordsData.x}, ${coordsData.y}`;
    }

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
      coords = `${coordsData.y}, ${coordsData.x}`;
    } else {
      coords = undefined;
    }

    let button: React.Node | string;
    let nextPlayer: string = !xIsNext ? "X" : "O";

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
      button = <button onClick={() => jumpTo(move)}>{`${description}`}</button>;
    }

    if (!button) {
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
