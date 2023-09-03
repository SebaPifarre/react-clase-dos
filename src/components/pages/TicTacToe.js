import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./TicTacToe.css";
import FancyButton from "../small/FancyButton";

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(["X", "O", ""]),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx("winner-card", { "winner-card--hidden": !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  // Esta propiedad decide si el componente se muestra o está oculto
  // También se podría mostrar el componente usando un if (&&), pero usamos esta prop para mostrar los estilos correctamente.
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(["X", "O", "inProgress"]),
  onRestart: PropTypes.func,
};

// const ChoosePlayer = ({ show, startGame = () => {} }) => {
//   return (
//     <div className={cx("winner-card", { "winner-card--hidden": !show })}>
//       <span className="winner-card-text">
//         Choose a Player
//       </span>
//       <FancyButton onClick={startGame}>X</FancyButton>
//       <FancyButton onClick={startGame}>O</FancyButton>
//     </div>
//   );
// };

const getWinner = (tiles) => {
  // calcular el ganador del partido a partir del estado del tablero
  // (existen varias formas de calcular esto, una posible es listar todos los
  // casos en los que un jugador gana y ver si alguno sucede)

  const winPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Horizontal wins
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Vertical wins
    [1, 5, 9], [3, 5, 7], // Diagonal wins
  ];

  // Check for a win
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (tiles[a] && tiles[a] === tiles[b] && tiles[b] === tiles[c]) {
      return tiles[a];
    }
  }

  // Check for a tie
  if (Object.values(tiles).every((mark) => mark)) {
    return "";
  }

  return "inProgress";
};

const useTicTacToeGameState = (initialPlayer) => {
  const [tiles, setTiles] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });
  const [currentPlayer, setCurrentPlayer] = React.useState(initialPlayer);
  const winner = getWinner(tiles);
  const [gameEnded, setGameEnded] = React.useState(false);

  const setTileTo = (tileIndex, player) => {
    // convertir el tile en la posición tileIndex al jugador seleccionado
    // ejemplo: setTileTo(0, 'X') -> convierte la primera casilla en 'X'
    if (tiles[tileIndex] === "") {
      setTiles({ ...tiles, [tileIndex]: player });
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    if (winner !== "inProgress") {
      setGameEnded(true);
    }
  });

  const restart = () => {
    // Reiniciar el juego a su estado inicial
    setTiles({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
    });
    setGameEnded(false);
  };

  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  // const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } =
    useTicTacToeGameState("X");

  return (
    <>
    <div className="tictactoe">
      <div className="tictactoe-grid">
        {/* Este componente debe contener la WinnerCard y 9 componentes Square, 
      separados en tres filas usando <div className="tictactoe-row">{...}</div> 
      para separar los cuadrados en diferentes filas */}
        {Object.entries(tiles).map(([i, value]) => {
          const setTileToCb = () => setTileTo(i, currentPlayer);
          return <Square value={value} onClick={setTileToCb} />;
        })}
        <WinnerCard show={gameEnded} winner={winner} onRestart={restart} />
      </div>
    </div>
    </>

  );
};
export default TicTacToe;
