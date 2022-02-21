
var gameDisplay = document.getElementById(`game-display`);
var gameScoreDisplay = document.getElementById(`game-score`);
var gameFields = document.getElementsByClassName(`field`);
var currentPlayer = `X`;
var gameState = [``, ``, ``, ``, ``, ``, ``, ``, ``];
var gameActive = true;
var gameScore = { X: 0, O: 0 };

var gameRules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



for (var i = 0; i < gameFields.length; i++) {
    var element = gameFields[i];
    element.setAttribute(`data-index`, i);
    element.addEventListener(`click`, gameFieldClicked)
}


function gameFieldClicked(event) {
    console.log(event.target);
    var selectedField = event.target;
    var selectedIndex = parseInt(selectedField.getAttribute(`data-index`));
    console.log(`selectedIndex`);

    if (gameState[selectedIndex] !== `` || !gameActive) {
        return;
    }

    updateGameState(selectedField, selectedIndex);
    checkGameRules();
    console.log(gameState);
}

function updateGameState(selectedField, index) {
    gameState[index] = currentPlayer;
    selectedField.innerHTML = currentPlayer;
}



function checkGameRules() {
    for (var i = 0; i < gameRules.length; i++) {
        var rule = gameRules[i];// 0,1,2
        var a = gameState[rule[0]];
        var b = gameState[rule[1]];
        var c = gameState[rule[2]];
        if (a === `` || b === `` || c === ``) {
            continue;
        }

        if (a === b && b === c) {
            gameDisplay.innerHTML = winMessage();
            gameActive = false;
            gameScore[currentPlayer] = gameScore[currentPlayer] + 1;
            gameScoreDisplay.innerHTML = `${currentPlayer}:${gameScore[currentPlayer]}`;
            return;
        }
    }

    var isDraw = !gameState.includes(``);
    if (isDraw) {
        gameDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    changePlayer();
}



function changePlayer() {
    currentPlayer = currentPlayer === `X` ? `O` : `X`;
    gameDisplay.innerHTML = playerTurn();
}


function playerTurn() {
    return `Player ${currentPlayer} je na potezu:`;
}

function winMessage() {
    return `Player ${currentPlayer} je na pobjedio`;
}

function drawMessage() {
    return `Neriješeno je, igra je gotova`;
}

function restartGame() {
    gameState = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    gameActive = true;
    currentPlayer = `X`;
    gameDisplay.innerHTML = playerTurn();
    for (var i = 0; i < gameFields.length; i++) {
        var element = gameFields[i];
        element.innerHTML = ``;
    }
}