// GAME VARIABLES

let actualPlayer = null;

const tempScore = {
    "PLAYER1":0,
    "PLAYER2":0
}

const totalScore = {
    "PLAYER1":0,
    "PLAYER2":0 
}

let turnNumber = 0;

let dontPlay = false;

onload = () => {
    init();
}

function init() {
    document.getElementById("throw1").addEventListener("click", () => rollDices("PLAYER1"));
    document.getElementById("throw2").addEventListener("click", () => rollDices("PLAYER2"));
    document.getElementById("stop1").addEventListener("click", () => endTurn("PLAYER1"));
    document.getElementById("stop2").addEventListener("click", () => endTurn("PLAYER2"));
    startTurn();
}

//GAME ACTIONS

function startTurn() {
    //handle which player is playing and make it visible
    var player = getActualPlayer();

    if(player) {
        document.getElementById(player).classList.remove("playing");
        document.getElementById("turnScore" + player).innerText = 0;
    }

    switch (player) {
        case 'PLAYER1':
            actualPlayer = 'PLAYER2';
            break;
        case 'PLAYER2':
            actualPlayer = 'PLAYER1';
            break;
        default:
            actualPlayer = 'PLAYER1';
    }
    document.getElementById(actualPlayer).classList.add('playing');
}

function endTurn(playerButtonPushed) {
    var player = getActualPlayer();

    if(playerButtonPushed === player && !dontPlay) {
        totalScore[player] = totalScore[player] + tempScore[player];
        document.getElementById("score" + player).innerText = totalScore[player];
        tempScore[player] = 0;
        //increment turn counter
        if (player === "PLAYER2") {
            turnNumber++;
        }
        if(turnNumber < 2) {
            startTurn();
        } else {
            endGame();
        }
    }
    
}

function setScore(player, score) {
        if(score !== 7) {
            tempScore[player] = tempScore[player] + score;
            document.getElementById("turnScore" + player).innerText = tempScore[player];
        }
        else {
                tempScore[player] = 0;
                totalScore[player] = 0;
                endTurn(player);
        }
        
}

function endGame() {
    let resultText = document.getElementById("resultText");
    let resultContainer = document.getElementById("result");

    dontPlay = true;
    if(totalScore["PLAYER1"] > totalScore["PLAYER2"]) {
        resultText.innerText = "PLAYER 1 WIN !";
    } else if(totalScore["PLAYER1"] < totalScore["PLAYER2"]) {
        resultText.innerText = "PLAYER 2 WIN !";
    } else {
        resultText.innerText = "Player 1 and 2 are equal !";
    }

    setTimeout(() => {
        resultText.innerText = "RESTART ?";
        resultContainer.classList.add("restartable");
        resultContainer.addEventListener("click", () => {
            location.reload();
        })
    }, 2000)
}

//TOOLS

function getActualPlayer() {
    return actualPlayer;
}

function rollhDices(playerButton) {
    var player = getActualPlayer();
    let dicesImg = document.getElementById("dicesImg");
    let resultText = document.getElementById("resultText");

    if(playerButton == player && !dontPlay) {

        //get a random number between 2 and 12
        let score = Math.floor(Math.random() * Math.floor(11)) + 2;

        //use gif while rolling the dices, then stop it and display the result
        dicesImg.src = "/rollingDices.gif";
        dontPlay = true;
        setTimeout(() => {
            dicesImg.src = "/noMoveDices.png";
            resultText.innerText = "You had a " + score + (score === 7 ? " ..." : " !");
            
            if(score === 7) {
                resultText.classList.add("bad");
            }
            setTimeout(() => {
                resultText.innerText = " ";
                resultText.classList.remove("bad");
                dontPlay = false;
                setScore(player, score);
            }, 1000) 
        }, 1500)
    }
}

