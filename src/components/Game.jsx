import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[currentMove];

  const handleSquareClick = (i) => {
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }

    const newSquares = [...currentSquares];
    newSquares[i] = xIsNext ? 'X' : 'O';

    setHistory(history.slice(0, currentMove + 1).concat([newSquares]));
    setCurrentMove(currentMove + 1);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (currentMove === 9) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={handleSquareClick} xIsNext={xIsNext} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

export default Game;
