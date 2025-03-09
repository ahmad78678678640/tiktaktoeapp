const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetGameButton = document.getElementById("resetGame");
const resetScoreButton = document.getElementById("resetScore");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let scores = { X: 0, O: 0 };

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!isGameActive || cell.textContent !== "") return;
        
        const index = cell.dataset.index;
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Player X is Blue, Player O is Green
        cell.style.color = currentPlayer === "X" ? "#007BFF" : "#28A745";

        if (checkWinner()) {
            statusText.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
            isGameActive = false;
            highlightWinningCells();
            scores[currentPlayer]++;
            updateScoreboard();
        } else if (!board.includes("")) {
            statusText.textContent = "🤝 It's a Draw!";
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    });
});

resetGameButton.addEventListener("click", () => {
    resetBoard();
});

resetScoreButton.addEventListener("click", () => {
    scores.X = 0;
    scores.O = 0;
    updateScoreboard();
});

function resetBoard() {
    board.fill("");
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.background = "white";
    });
}

function checkWinner() {
    return winningCombinations.some(combo => {
        return combo.every(index => board[index] === currentPlayer);
    });
}

function highlightWinningCells() {
    winningCombinations.forEach(combo => {
        if (combo.every(index => board[index] === currentPlayer)) {
            combo.forEach(index => {
                cells[index].style.background = "#FFCC00"; // Highlight Winning Cells
            });
        }
    });
}

function updateScoreboard() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}
