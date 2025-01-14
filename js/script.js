const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');



const cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;



const checkWinner = () => {
    const winningCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 4, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombination){
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
            return cells[a]
        }
    }
    return cells.includes(null) ? null : 'Draw'
};


const handleClick = (e) => {
    const cellIndex = e.target.dataset.index;

    if(!gameActive || cells[cellIndex]) return;

    cells[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    const result = checkWinner();

    if(result){
        gameActive = false;
        winnerDisplay.textContent = result === 'Draw' ? 'It\'s a Draw!' : `${result} Wins!`
    } else{
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const initBoard = () => {
    board.innerHTML = '';
    cells.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    winnerDisplay.textContent = '';

    for (let i = 0; i < 9; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
};

initBoard();