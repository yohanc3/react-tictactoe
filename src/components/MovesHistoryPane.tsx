import { ReactNode } from "react";
import findLastMoveData from "../util/findLastMoveData";
import "../App.css"

interface MovesPaneProps {
  history: (string | null)[][];
  currentMove: number;
  jumpTo: (to: number) => void;
  isReversed: boolean;
}

export default function MovesHistoryPane({ history, currentMove, jumpTo, isReversed }: MovesPaneProps) {
  return history
    .map((squares, move) => {
      const coordsData = findLastMoveData(squares, history[move - 1], move);
      const coords = coordsData ? `(${coordsData.x}, ${coordsData.y})` : null;
      const playerFromCurrentMove = coordsData?.player ?? "";
      const onClick = () => jumpTo(move);

      if (move === 0)
        return currentMove ? (
          <li className="movesPaneButton" key={move}> 
            <button onClick={onClick}> Go to game start </button>
          </li>
        ) : (
          <li className="movesPaneButton" key={move}> You are at the beginning of the game</li>
        );
      if (move === currentMove)
        return (
          <li className="movesPaneButton">
            You are at move #{move} -- {coords} Player: {playerFromCurrentMove}
          </li>
        );

      return (
        <button className="movesPaneButton" onClick={onClick}>
          Go to move {move} -- coords: {coords} Player: {playerFromCurrentMove}
        </button>
      );
    })
    .sort((a, b) => (isReversed ? Number(b.key) - Number(a.key) : Number(a.key) - Number(b.key)));
}
