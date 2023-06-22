import { useState } from 'react';
import './index.less';

function Square({ value, onSquareClick }) {
    return (
        <td className="square" onClick={onSquareClick}>
            {value}
        </td>
    );
}

function Board({ squares, xIsNext, onPlay, handleRestart }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'x';
        } else {
            nextSquares[i] = 'o';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner is ${winner}`;
    } else {
        status = `next play is ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <>
            <h2>{status}</h2>
            {winner && <button onClick={handleRestart}>restart</button>}
            <table cellSpacing={0}>
                <tbody>
                    <tr className="board-row">
                        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                    </tr>
                    <tr className="board-row">
                        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                    </tr>
                    <tr className="board-row">
                        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                    </tr>
                </tbody>
            </table>
        </>
    );
}

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const move = history.map((item, move) => {
        let description;
        if (move > 0) {
            description = `Go to move ${move}`;
        } else {
            description = `Go to game start`;
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    function handleRestart() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={currentSquares}
                    xIsNext={xIsNext}
                    onPlay={handlePlay}
                    handleRestart={handleRestart}
                />
            </div>
            <div className="game-info">
                <ol>{move}</ol>
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
