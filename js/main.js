/*----- constants -----*/

const playerSpot = {
    'null': 'white',
    '1': 'red',
    '-1': 'black'
};

const winningNums = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/

const boardEls = [...document.querySelectorAll('#board > div')];
const msgEl = document.querySelector('h1');
const btnEL = document.querySelector('button');

/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', playerMove)

btnEL.addEventListener('click', init);

/*----- functions -----*/
init();

// kick of our aplication
function init() {
    board = [
        null, null, null, // T row
        null, null, null, // M row
        null, null, null, // B row
    ];
    turn = 1;
    winner = null;
    render();
}

// Update all impacted state, then call render

function render() {
    renderBoard();
    renderMsg();
}

function renderBoard() {
    boardEls.forEach(function (boardEl, idx) {
        boardEl.style.backgroundColor = playerSpot[board[idx]];
    })
}

function playerMove(evt) {
    // check if player clicked a square
    if (!boardEls.includes(evt.target) || winner) return;
    // location is going to be the location of the spot
    let location = evt.target.id;
    if (board[location]) return;
    board[location] = turn;
    winner = getWinner();
    turn = turn * -1;
    render()
}

function renderMsg() {
    if (winner === "T") {
        msgEl.innerHTML = "Its a tie";
    } else if (winner) {
        msgEl.innerHTML = `${playerSpot[winner]} Wins!`;
    } else {
        msgEl.innerHTML = `${playerSpot[turn]}'s Turn`;
    }
}

function getWinner() { 
    for (let winCombo of winningNums) {
        let total = board[winCombo[0]] + board[winCombo[1]] + board[winCombo[2]];
        if (Math.abs(total) === 3) return turn; 
    }
    if (board.includes(null)) return null;
    return "T";
}
