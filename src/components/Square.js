import React from "react";

export default function Square({ value, onClick, highlight }) {
    return (
        <button
            className="square"
            onClick={onClick}
            style={{
                backgroundColor: highlight ? "#90ee90" : "white",
                fontWeight: highlight ? "bold" : "normal",
            }}
        >
            {value}
        </button>
    );
}
