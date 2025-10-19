import React from "react";
import Square from "./Square";

export default function Board({ squares, onClick, winningLine }) {
    const renderSquare = (i) => {
        const highlight = winningLine && winningLine.includes(i);
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                highlight={highlight}
            />
        );
    };

    const boardSize = 3;
    const board = [];

    for (let row = 0; row < boardSize; row++) {
        const rowSquares = [];
        for (let col = 0; col < boardSize; col++) {
            const index = row * boardSize + col;
            rowSquares.push(renderSquare(index));
        }
        board.push(
            <div className="board-row" key={row}>
                {rowSquares}
            </div>,
        );
    }

    return <div>{board}</div>;
}
