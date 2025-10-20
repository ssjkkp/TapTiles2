var timerOn=false;

var tiles=[];
var interval;
var interval2;
var pressedButtons=[];
var pressSequence=[];
var randomIndex=0;
var score=0;
var gameOn=false;
var gameOver=false;
var intervalLength=2000;
var intervalSteps=30;
var start;
var end;
var start2;
var end2;

document.addEventListener('keydown', logKey);

// Mapping for PC numpad layout
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

const KEYPAD_MAP = PC_KEYPAD_MAP;
// const KEYPAD_MAP = KAIOS_KEYPAD_MAP;

function logKey(e) {
    console.log(e.code);
    e.stopPropagation();
            if(gameOn){
                const tilePressed = KEYPAD_MAP[e.code]
                pressedButtons.push(tilePressed);
                // console.log("e.code.substr(6): " + e.code.substr(6));
                // console.log("tilePressed: " + tilePressed)
                checkButtonPress();
            }
            else if(gameOver){
                backToTitleScreen()
            }
            else if(!gameOn && !gameOver){
                setGameOn();
            }
}
function checkButtonPress(){
    var pressedCount=pressedButtons.length;
    if(pressedButtons[pressedCount-1]==pressSequence[pressedCount-1]){
        score++;
    }
    else{
        gameOverScreen();
    }
}

function setStartSCreen(){
}

function myFunction() {
    function blinkButtonColors() {
        end2 = new Date().getTime();
        var time2 = end - start;
        console.log('Execution time Interval1: ' + time2);
        clearInterval(interval2);


        randomIndex=Math.floor(Math.random()*8)+1;

        console.log(randomIndex);
        pressSequence.push(randomIndex);
        for(var i=0; i< tiles.length;i++){
            if(tiles[i].id==randomIndex){
                var button=document.getElementById(tiles[i].text);
                button.src="images/button_RED.png";
                end = new Date().getTime();
                var time = end - start;
                interval2=setInterval(function() { setColorBack(button); },70);
            }
        }
        if(intervalSteps>0){
            console.log(intervalSteps);
            if (intervalSteps > 25) intervalLength -= 100;
            else if (intervalSteps > 20) intervalLength -= 75;
            else if (intervalSteps > 15) intervalLength -= 50;
            else if (intervalSteps > 10) intervalLength -= 30;
            else if (intervalSteps > 5) intervalLength -= 20;
            else intervalLength -= 10;

            intervalSteps--;
            console.log("Intervalli lyhennetty "+intervalSteps+" " + intervalLength);
        }
        clearInterval(interval);
        interval = setInterval(blinkButtonColors, intervalLength);
    }

    interval=setInterval(blinkButtonColors, intervalLength);
    start2 = new Date().getTime();
}

function setColorBack(button){
    start = new Date().getTime();
    button.src="images/button_BLUE.png";
}

function setButtons() {
    for(var i=1;i<=9;i++){
        var tile={
            id:i,
            text:"button"+i,
        };
        tiles.push(tile);
    }
}

function playerPress(value){
    console.log(value);
}

function setGameOn(){
    gameOn=true;
    var gameScreen = document.getElementById("gameScreen");  
    gameScreen.style.display="";
    var startScreen = document.getElementById("startScreen");  
    startScreen.style.display="none";
    score=0;
    intervalLength=2000;
    intervalSteps=30;
    setButtons();
    myFunction();
}

function gameOverScreen(){
    gameOver=true;
    gameOn=false;
    tiles=[];
    pressedButtons=[];
    pressSequence=[];
    randomIndex=0;
    intervalLength=2000;
    intervalSteps=30;

    var gameScreen = document.getElementById("gameScreen");  
    gameScreen.style.display="none";
    var gameOverScreen = document.getElementById("gameOverScreen");  
    gameOverScreen.style.display="block";

    clearInterval(interval);
    clearInterval(interval2);
    var text = document.getElementById("finalScoreText");   
    text.innerText="Your score: "+score;
}

function backToTitleScreen(){
    gameOver=false;
    gameOn=false;
    var gameOverScreen = document.getElementById("gameOverScreen");  
    gameOverScreen.style.display="none";
    var startScreen = document.getElementById("startScreen");  
    startScreen.style.display="block";
}