window.addEventListener('DOMContentLoaded',() =>{
const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

let board = ['','','','','','','','',''];
let currentplayer = "x";
let isGameActive = true;

const playerx_won = 'playerx_won';
const playero_won = 'playero_won';
const TIE = 'TIE';

const winningconditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleResultValidation(){
    let roundWon = false;
    for(let i = 0;i <= 7; i++){
        const winCondition = winningconditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if(a ===''|| b ==='' || c ===''){
            continue;
        }
        if (a ===b && b===c){
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        announce(currentplayer ==='x'? playerx_won:playero_won);
        isGameActive = false;
        return;
    }
    if(!board.includes(''))
    announce (TIE);
}

const announce = (type) =>{
    switch(type){
        case playero_won:
            announcer.innerHTML = 'player <span class="playero">o</span> won';
            break;
            case playerx_won:
                announcer.innerHTML = 'player <span class="playerx">x</span> won';
                break;
                case TIE:
                    announcer.innerHTML = 'TIE';
    }
    announcer.classList.remove('hide');
};

const isValidAction = (tile)=>{
    if(tile.innerText==='x' || tile.innerText ==='o'){
        return false;
    }
    return true;
};

const updateBoard = (index)=>{
    board[index] = currentplayer;
}

const changePlayer = ()=>{
    playerDisplay.classList.remove(`player${currentplayer}`);
    currentplayer = currentplayer ==='x'? 'o' : 'x';
    playerDisplay.innerText = currentplayer;
    playerDisplay.classList.add(`player${currentplayer}`);
}

const uesrAction = (tiles,index) =>{
    if(isValidAction(tiles)&& isGameActive){
        tiles.innerText = currentplayer;
        tiles.classList.add(`player${currentplayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

const resetBoard =()=>{
    board=['','','','','','','','',''];
    isGameActive = true;
    announcer.classList.add('hide');
    if(currentplayer ==='o'){
        changePlayer();
    }
    tiles.forEach(tile =>{
        tile.innerText = '';
        tile.classList.remove('playerx');
        tile.classList.remove('playero');
    });
}

    tiles.forEach((tile,index) =>{
    tile.addEventListener('click',() => uesrAction(tile,index));
});
    resetButton.addEventListener('click',resetBoard);
});