// Mapping for PC numpad layout (top: 7,8,9 → bottom: 1,2,3)
const PC_KEYPAD_MAP = {
  'Numpad7': 1, 'Numpad8': 2, 'Numpad9': 3,
  'Numpad4': 4, 'Numpad5': 5, 'Numpad6': 6,
  'Numpad1': 7, 'Numpad2': 8, 'Numpad3': 9
};

// Mapping for KaiOS 8110 keypad layout
const KAIOS_KEYPAD_MAP = {
  'Digit1': 1, 'Digit2': 2, 'Digit3': 3,
  'Digit4': 4, 'Digit5': 5, 'Digit6': 6,
  'Digit7': 7, 'Digit8': 8, 'Digit9': 9
};

// Choose which layout to test:
//const KEYPAD_MAP = PC_KEYPAD_MAP;
const KEYPAD_MAP = KAIOS_KEYPAD_MAP;

let tiles = [];
let pressSequence = [];
let pressedButtons = [];
let interval, flashTimeout;
let randomIndex = 0;
let score = 0;
let gameOn = false;
let gameOver = false;
let topScoresScreen = false;
let titleScreen = true
let infoScreen = false;
let intervalLength = 2000;
let intervalSteps = 30;

let adShownThisSession = false;

// INITIAL SETUP
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    e.stopPropagation();

    switch(e.key){
        case "SoftRight":
            handleSoftRight();
            break;
        case "SoftLeft":
            handleSoftLeft();
            break;
        case "Enter":
            handleSoftCenter();
            break;
    }

    //For debugging
    // switch(e.code){
    //     case "Enter":
    //         handleSoftRight();
    //         break;
    //     case "Escape":
    //         handleSoftLeft();
    //         break;
    // }

    if (KEYPAD_MAP[e.code]) {
        const tilePressed = KEYPAD_MAP[e.code];

    if (gameOn) {
        pressedButtons.push(tilePressed);
        checkButtonPress();
    } 
  }
}

function handleSoftRight(){
    if(titleScreen){
        setGameOn();
        return;
    }
    else{
        backToTitleScreen();
        return;
    }
}

function handleSoftLeft(){
    if(titleScreen){
        toTopScoresScreen();
        return;
    }
}

function handleSoftCenter(){
    if(titleScreen){
        toInfoScreen();
    }
}

//GAME LOGIC
function checkButtonPress() {
    const pressedCount = pressedButtons.length;
    if (pressedButtons[pressedCount - 1] === pressSequence[pressedCount - 1]) {
        score++;
        document.getElementById("scoreDisplay").textContent = "Score: " + score;
    } else {
        if (score > 0) {
            const { scores, rank } = addNewScore(score);
            updateTopScoresScreen();
            gameOverScreen(rank);
        } else {
            gameOverScreen();
        }
    }
}

function flashRandomTile() {
    randomIndex = Math.floor(Math.random() * 9) + 1;
    //For debugging
    //randomIndex = 1;
    pressSequence.push(randomIndex);

    const button = document.getElementById(`button${randomIndex}`);
    button.src = "images/button_RED.png";
    playBeep();

    flashTimeout = setTimeout(() => {
        button.src = "images/button_BLUE.png";
    }, 100);

    if (intervalSteps > 0) {
        if (intervalSteps > 25) intervalLength -= 100;
        else if (intervalSteps > 20) intervalLength -= 75;
        else if (intervalSteps > 15) intervalLength -= 50;
        else if (intervalSteps > 10) intervalLength -= 30;
        else if (intervalSteps > 5) intervalLength -= 20;
        else intervalLength -= 10;

        intervalSteps--;
    }

    clearInterval(interval);
    interval = setInterval(flashRandomTile, intervalLength);
}

function setGameOn() {

    gameOn = true;
    gameOver = false;
    titleScreen = false;
    topScoresScreen = false;
    score = 0;
    document.getElementById("scoreDisplay").textContent = "Score: " + score;
    intervalLength = 2000;
    intervalSteps = 30;
    pressedButtons = [];
    pressSequence = [];

    //Make sure all buttons are blue at the start
    for (let i = 1; i <= 9; i++) {
        document.getElementById("button" + i).src = "images/button_BLUE.png";
    }


    document.getElementById("topScoresScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("infoScreen").style.display = "none";

    document.getElementById("gameScreen").style.display = "grid";


    clearInterval(interval);
    interval = setInterval(flashRandomTile, intervalLength);
    updateSoftKeyTexts("","","Back");
}

function gameOverScreen(rank) {

    if (!adShownThisSession) {
        loadKaiAd();
        adShownThisSession = true;
    }

    gameOver = true;
    gameOn = false;
    titleScreen = false;
    topScoresScreen = false;
    clearInterval(interval);
    clearTimeout(flashTimeout);

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("topScoresScreen").style.display = "none";
    document.getElementById("infoScreen").style.display = "none";

    document.getElementById("gameOverScreen").style.display = "flex";

    let finalText = "Your score: " + score;
    if (rank) {
        finalText += `\nNew High Score #${rank}`;
    }
    document.getElementById("finalScoreText").innerText = finalText;

    updateSoftKeyTexts("","","Back");
}

function backToTitleScreen() {
    gameOver = false;
    gameOn = false;
    topScoresScreen = false;
    titleScreen = true;
    clearInterval(interval);
    clearTimeout(flashTimeout);

    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("topScoresScreen").style.display = "none";
    document.getElementById("infoScreen").style.display = "none";

    document.getElementById("startScreen").style.display = "flex";

    updateSoftKeyTexts("Top Scores","Info","New Game");
}

function toTopScoresScreen(){
    gameOver = false;
    gameOn = false;
    titleScreen = false;
    topScoresScreen = true;
    clearInterval(interval);
    clearTimeout(flashTimeout);

    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("infoScreen").style.display = "none";

    document.getElementById("topScoresScreen").style.display = "block";
    updateTopScoresScreen();

    updateSoftKeyTexts("","","Back");
}

function toInfoScreen(){
    gameOver = false;
    gameOn = false;
    titleScreen = false;
    topScoresScreen = false;
    infoScreen = true;

    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("topScoresScreen").style.display = "none";

    document.getElementById("infoScreen").style.display = "flex";
    updateSoftKeyTexts("","","Back");
}

function updateSoftKeyTexts(leftKey,center, rightKey){
    document.getElementById("softkey-left").textContent = leftKey || ""
    document.getElementById("softkey-center").textContent = center || "";
    document.getElementById("softkey-right").textContent = rightKey || ""
}

//AUDIO FEEDBACK
function playBeep() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "square";
    osc.frequency.value = 600;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

//SCORE STORAGE
function loadTopScores() {
    return JSON.parse(localStorage.getItem("topScores")) || [];
}

function saveTopScores(scores) {
    localStorage.setItem("topScores", JSON.stringify(scores));
}

function addNewScore(newScore) {
    let scores = loadTopScores();
    const prevScores = [...scores];

    scores.push(newScore);
    scores.sort((a, b) => b - a);

    const tooMany = scores.length > 5;
    const lowestScore = scores[4];

    if (prevScores.length >= 5 && newScore === prevScores[prevScores.length - 1]) {
        return { scores: prevScores, rank: null };
    }

    scores = scores.slice(0, 5);
    saveTopScores(scores);

    const rank = scores.indexOf(newScore) + 1;
    const validRank = rank <= 5 ? rank : null;

    return { scores, rank: validRank };
}

function updateTopScoresScreen() {
    const scores = loadTopScores();
    const listDiv = document.getElementById("scoresList");
    listDiv.innerHTML = "";
    for (let i = 0; i < scores.length; i++) {
        const rank = i + 1;
        const scoreText = `${rank} - ${scores[i]} pts`;
        const p = document.createElement("p");
        p.textContent = scoreText;
        listDiv.appendChild(p);
    }
}

//App closing
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        handleAppHidden();
    }
});

function handleAppHidden() {
    if (gameOn) {
        backToTitleScreen()
    }
}

//KaiAds
function loadKaiAd() {
    try {
        getKaiAd({
            publisher: 'test',
            app: 'TapTiles2',
            slot: 'default',
            onerror: err => console.error('KaiAd error:', err),
            onready: ad => {ad.call('display');
            }
        });
    } catch (e) {
        console.log('KaiAd load failed', e);
    }
}