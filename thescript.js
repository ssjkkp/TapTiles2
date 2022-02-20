var timerOn=false;
var interva;
var interval2;
var buttons=[];
setButtons();
pressedButtons=[];
console.log(buttons);
var pressSequence=[1,1,2,2,3,3,7,8,9]
function myFunction() {
//    doBlink(900);
    timerOn=!timerOn;
    console.log(timerOn);
    if(timerOn){


    function blinkButtonColors() {
        var index= Math.floor(Math.random() * 9);
        console.log(index);
        for(var i=0; i< buttons.length;i++){
            if(buttons[i].id-1==index){
                console.log(buttons[i].text)
                var button=document.getElementById(buttons[i].text);
                console.log(button);
                button.style.backgroundColor="red";
                //console.log(buttons[i].square);
                interval2=setInterval(function() { test(button); },50);
            }
        }
    }
    interval=setInterval(blinkButtonColors, 2000);
    }
    else{
        clearInterval(interval);
    }
}
function playerPress(button){
    console.log(button);
}
// function doBlink(value) {
//     var time = value/3;
//     blink(pressSequence[0], time);
// }
// function blink(id, time) {
//     var counter = 0;
//     var interval = setInterval(function () {
//         var button=document.getElementById("button"+id);
//         button.style.backgroundColor="red";
//        // console.log(button);
//        counter += 50;
//        console.log("counter: "+counter+" time: "+time)
//             if (counter >= time && id < pressSequence.length) {
//                 button.style.backgroundColor="blue";
//                 clearInterval(interval);
//                 id++;
//                 console.log(id);
//                 blink(pressSequence[id], time);
//             }
//     }, 100);
// }


function test(buttontest){
    buttontest.style.backgroundColor="blue";
}
function setButtons() {
    var button1={
        id:1,
        text:"button1",
        square:document.getElementById("square1")
    };
    var button2={
        id:2,
        text:"button2",
        square:document.getElementById("square2")
    };
    var button3={
        id:3,
        text:"button3",
        square:document.getElementById("square3")
    };
    var button4={
        id:4,
        text:"button4",
        square:document.getElementById("square4")
    };
    var button5={
        id:5,        
        text:"button5",
        square:document.getElementById("square5")
    };
    var button6={
        id:6,
        text:"button6",
        square:document.getElementById("square6")
    };
    var button7={
        id:7,
        text:"button7",
        square:document.getElementById("square7")
    };
    var button8={
        id:8,
        text:"button8",
        square:document.getElementById("square8")
    };
    var button9={
        id:9,
        text:"button9",
        square:document.getElementById("square9")
    };
    buttons.push(button1);
    buttons.push(button2);
    buttons.push(button3);
    buttons.push(button4);
    buttons.push(button5);
    buttons.push(button6);
    buttons.push(button7);
    buttons.push(button8);
    buttons.push(button9);
}