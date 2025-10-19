import React, { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([
        { squares: Array(9).fill(null), location: null },
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [ascending, setAscending] = useState(true);

    const current = history[stepNumber];
    const winnerInfo = calculateWinner(current.squares);
    const winner = winnerInfo ? winnerInfo.winner : null;

    function handleClick(i) {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if (winner || squares[i]) return;

        squares[i] = xIsNext ? "X" : "O";
        const location = [Math.floor(i / 3) + 1, (i % 3) + 1];

        setHistory(newHistory.concat([{ squares, location }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    const moves = history.map((step, move) => {
        const desc = move
            ? `Go to move #${move} (${step.location?.join(", ")})`
            : "Go to game start";

        const isCurrent = move === stepNumber;
        return (
            <li key={move}>
                {isCurrent ? (
                    <span>
                        <b>You are at move #{move}</b>
                    </span>
                ) : (
                    <button onClick={() => jumpTo(move)}>{desc}</button>
                )}
            </li>
        );
    });

    if (!ascending) moves.reverse();

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (!current.squares.includes(null)) {
        status = "Draw!";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={handleClick}
                    winningLine={winnerInfo ? winnerInfo.line : null}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button onClick={() => setAscending(!ascending)}>
                    Sort {ascending ? "Descending" : "Ascending"}
                </button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

// determine winner
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
    for (let line of lines) {
        const [a, b, c] = line;
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return { winner: squares[a], line };
        }
    }
    return null;
}
