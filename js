const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] || !isGameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    gameState[index] = currentPlayer;

    checkResult();
}

function checkResult() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            isGameActive = false;
            message.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameState.includes(null)) {
        isGameActive = false;
        message.textContent = "It's a draw!";
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    gameState = Array(9).fill(null);
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
