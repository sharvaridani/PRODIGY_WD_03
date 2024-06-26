document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = playerX;
    let board = ['', '', '', '', '', '', '', '', ''];
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

    const handleCellPlayed = (cell, index) => {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        statusText.innerText = `Player ${currentPlayer}'s turn`;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.innerText = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            statusText.innerText = 'Draw!';
            isGameActive = false;
            return;
        }

        handlePlayerChange();
        if (currentPlayer === playerO && isGameActive) {
            setTimeout(aiPlay, 500);
        }
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleResetGame = () => {
        currentPlayer = playerX;
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        statusText.innerText = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.innerText = '');
    };

    const aiPlay = () => {
        const emptyCells = board.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = cells[randomIndex];
        handleCellPlayed(cell, randomIndex);
        handleResultValidation();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);

    statusText.innerText = `Player ${currentPlayer}'s turn`;
});


