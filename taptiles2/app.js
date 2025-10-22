// Mapping for PC numpad layout (top: 7,8,9 → bottom: 1,2,3)
const PC_KEYPAD_MAP = {
  'Numpad7': 1, 'Numpad8': 2, 'Numpad9': 3,
  'Numpad4': 4, 'Numpad5': 5, 'Numpad6': 6,
  'Numpad1': 7, 'Numpad2': 8, 'Numpad3': 9
};

// Mapping for KaiOS 8110 keypad layout
const KAIOS_KEYPAD_MAP = {
  'Numpad1': 1, 'Numpad2': 2, 'Numpad3': 3,
  'Numpad4': 4, 'Numpad5': 5, 'Numpad6': 6,
  'Numpad7': 7, 'Numpad8': 8, 'Numpad9': 9
};

// Choose which layout to test:
const KEYPAD_MAP = PC_KEYPAD_MAP;
// const KEYPAD_MAP = KAIOS_KEYPAD_MAP;

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
let intervalLength = 2000;
let intervalSteps = 30;

// === INITIAL SETUP ===
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    e.stopPropagation();
    console.log(e.code);
    // --- Handle softkeys for navigation ---
    if (e.code === "SoftRight") {
        // Only act if the game is running or game over
        if (gameOn || gameOver) {
            backToTitleScreen();
            return;
        }
        else{
            setGameOn();
        }
    }

    if (e.code === "SoftLeft") {
        //if (gameOn || gameOver) {
            toTopScoresScreen();
            return;
        //}
    }

    if (e.code === "Enter") {
        if (gameOn || gameOver || topScoresScreen) {
            backToTitleScreen();
            return;
        }
        else{
            setGameOn();
        }
    }
    if (e.code === "Escape") {
        if (titleScreen) {
            toTopScoresScreen();
            return;
        }
    }

  if (KEYPAD_MAP[e.code]) {
    const tilePressed = KEYPAD_MAP[e.code];

    console.log("gameOn: "+gameOn+", gameOver: "+gameOver+", titleScreen: "+titleScreen);
    if (gameOn) {
        pressedButtons.push(tilePressed);
        checkButtonPress();
    } else if (gameOver) {
        backToTitleScreen();
    } else if(titleScreen){
        setGameOn();
    } else{
        setGameOn();
    }
  }
}

// === GAME LOGIC ===
function checkButtonPress() {
    const pressedCount = pressedButtons.length;
    if (pressedButtons[pressedCount - 1] === pressSequence[pressedCount - 1]) {
        score++;
    } else {
        gameOverScreen();
    }
}

function flashRandomTile() {
    randomIndex = Math.floor(Math.random() * 9) + 1;
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
    console.log("setGameOn");
    gameOn = true;
    gameOver = false;
    titleScreen = false;
    topScoresScreen = false;
    score = 0;
    intervalLength = 2000;
    intervalSteps = 30;
    pressedButtons = [];
    pressSequence = [];

    document.getElementById("topScoresScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";

    document.getElementById("gameScreen").style.display = "grid";

    clearInterval(interval);
    interval = setInterval(flashRandomTile, intervalLength);
}

function gameOverScreen() {
    gameOver = true;
    gameOn = false;
    titleScreen = false;
    topScoresScreen = false;
    clearInterval(interval);
    clearTimeout(flashTimeout);

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("topScoresScreen").style.display = "none";

    document.getElementById("gameOverScreen").style.display = "flex";
    document.getElementById("finalScoreText").innerText = "Your score: " + score;
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

    document.getElementById("startScreen").style.display = "flex";
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
    document.getElementById("topScoresScreen").style.display = "flex";
}

// === AUDIO FEEDBACK ===
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
