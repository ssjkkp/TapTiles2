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
var intervalLengthTest=2000;
var intervalStepsTest=30;
var start;
var end;
var start2;
var end2;

document.addEventListener('keydown', logKey);


function logKey(e) {
    console.log(e.code);
    e.stopPropagation();
     //if(e.code.startsWith("Digit")){
        if(e.code.startsWith("Numpad")){
        if(gameOn){
            //console.log("Game is on");
            //pressedButtons.push(e.code.substr(5));
            pressedButtons.push(e.code.substr(6));
            console.log(e.code.substr(6));
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
        // var scoreText=document.getElementById("scoreText");
        // scoreText.innerText=score.toString();
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
                // var scoreText=document.getElementById("scoreText");
                // scoreText.innerText=tiles[i].text.toString();
                button.src="images/button_RED.png";
                end = new Date().getTime();
                var time = end - start;
                //console.log('Execution time Interval2: ' + time);
                interval2=setInterval(function() { setColorBack(button); },70);
            }
        }
        if(intervalStepsTest>0){
            console.log(intervalStepsTest);
            if(intervalStepsTest>25){
                intervalLengthTest=intervalLengthTest-100;
                console.log(-100);
            }
            else if(intervalStepsTest>20){
                intervalLengthTest=intervalLengthTest-75;
                console.log(-75);
            }
            else if(intervalStepsTest>15){
                intervalLengthTest=intervalLengthTest-50;
                console.log(-50);
            }
            else if(intervalStepsTest>10){
                intervalLengthTest=intervalLengthTest-30;
                console.log(-30);
            }
            else if(intervalStepsTest>5){
                intervalLengthTest=intervalLengthTest-20;
                console.log(-20);
            }
            else if(intervalStepsTest>0){
                intervalLengthTest=intervalLengthTest-10;
                console.log(-10);
            }
            intervalStepsTest=intervalStepsTest-1;
            console.log("Intervalli lyhennetty "+intervalStepsTest+" " + intervalLengthTest);
        }
        clearInterval(interval);
        interval=setInterval(blinkButtonColors, intervalLengthTest);
    }

    interval=setInterval(blinkButtonColors, intervalLengthTest);
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
    //For testing purposes only
    console.log(value);
}

function setGameOn(){
    gameOn=true;
    var gameScreen = document.getElementById("gameScreen");  
    gameScreen.style.display="";
    var startScreen = document.getElementById("startScreen");  
    startScreen.style.display="none";
    score=0;
    intervalLengthTest=2000;
    intervalStepsTest=30;
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
    intervalLengthTest=2000;
    intervalStepsTest=30;

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