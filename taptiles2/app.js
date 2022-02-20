var timerOn=false;

var tiles=[];
var interva;
var interval2;
var pressedButtons=[];
var pressSequence=[];
var randomIndex=0;
var score=0;
var gameOn=false;
var gameOver=false;
//Digit1-9
//wakelock = navigator.requestWakeLock('screen');
//wakelock.unlock();

document.addEventListener('keydown', logKey);


function logKey(e) {

    console.log(e.code);
    if(e.code.startsWith("Digit")){
        if(gameOn){
            console.log("Game is on");
            pressedButtons.push(e.code.substr(5));
            checkButtonPress();
        }
        else if(gameOver){
            console.log("Game is over");
            backToTitleScreen()
        }
        else if(!gameOn && !gameOver){
            console.log("Game is not on or over");
            setGameOn();
        }

    }

}
function checkButtonPress(){
    var pressedCount=pressedButtons.length;
    if(pressedButtons[pressedCount-1]==pressSequence[pressedCount-1]){
        score++;
        var scoreText=document.getElementById("scoreText");
        scoreText.innerText=score.toString();
    }
    else{
        //clearInterval(interval);
        //var inputText=document.getElementById("inputText");
        //inputText.innerText="Fail! Score: "+score.toString();
        //if(!gameOver){
            gameOverScreen();
            console.log(pressedButtons);
            console.log(pressSequence);
       // }
    }
}


function setStartSCreen(){

}

function myFunction() {
    function blinkButtonColors() {
        clearInterval(interval2);
        randomIndex=(randomIndex+1) % 9;
        pressSequence.push(randomIndex);
        for(var i=0; i< tiles.length;i++){
            if(tiles[i].id==randomIndex){
                var button=document.getElementById(tiles[i].text);
                button.style.backgroundColor="red";
                interval2=setInterval(function() { setColorBack(button); },50);
            }
        }
    }
    interval=setInterval(blinkButtonColors, 2000);
}

function setColorBack(buttontest){
    buttontest.style.backgroundColor="blue";
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
    //Turha
    console.log(value);
}
function setGameOn(){
    gameOn=true;

    var gameScreen = document.getElementById("gameScreen");  
    gameScreen.style.display="block";
    var startScreen = document.getElementById("startScreen");  
    startScreen.style.display="none";
    score=0;
    var scoreText=document.getElementById("scoreText");
    scoreText.innerText=score.toString();
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
//window.onload = myFunction();