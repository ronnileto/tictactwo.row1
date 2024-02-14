let currentPlayer = 'X';
let gameBoard = Array(30).fill(''); 
let gameActive = true;
let playerXWins = 0;
let playerOWins = 0;
const roundsToWin = 5;

function startHumanVsComputer() {
    window.location.href = 'TIKTACTOE.html';
}

function makeMove(cell) {
    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function checkWinner() {
    const winPatterns = [
        // Rows
        [0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29,],
        // Columns
        [0, 6, 12, 18, 24,], [1, 7, 13, 19, 25], [2, 8, 14, 20, 26],
        [3, 9, 15, 21, 27], [4, 10, 16, 22, 28], [5, 11, 17, 23, 29],
        // Diagonals top-left - bot-right
        [1, 6], [2, 7, 12], [3, 8, 13, 18], [4, 9, 14, 19, 24], [5, 10, 15, 20, 25], 
		[11, 16, 21, 26], [17, 22, 27], [23, 28], 
        // Diagonals bot-left - top-right
		[18, 25], [12, 19, 26], [6, 13, 20, 27], [0, 7, 14, 21, 28], [1, 8 ,15 ,22, 29],
		[2, 9, 16, 23], [3, 10 ,17], [4, 11],  
    ];

    for (const pattern of winPatterns) {
        const cellsInPattern = pattern.map(index => gameBoard[index]);
        if (cellsInPattern[0] && cellsInPattern.every(cell => cell === cellsInPattern[0])) {
            document.getElementById('status').textContent = `${currentPlayer} wins!`;
            gameActive = false;
			
			updateScore();
        }
    }

function updateScore() {
    if (document.getElementById('status').textContent.includes('wins')) {
        if (currentPlayer === 'X') {
            playerXWins++;
        } else {
            playerOWins++;
        }
    }

    document.getElementById('score').textContent = `Player X: ${playerXWins} - Player 0: ${playerOWins}`;

    if (playerXWins === roundsToWin || playerOWins === roundsToWin) {
        document.getElementById('status').textContent = `${currentPlayer} wins the game!`;
        resetGame();
    }
}

    if (!gameBoard.includes('') && gameActive) {
        document.getElementById('status').textContent = 'It\'s a tie!';
        gameActive = false;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = Array(30).fill('');
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    document.getElementById('status').textContent = '';
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}