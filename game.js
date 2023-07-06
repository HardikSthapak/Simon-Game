var userPattern = [];
var gamePattern = [];
var start = false;
var level = 0;
const btnColors = ["red", "blue", "green", "yellow"];
function nextSequence(){
    userPattern = [];
    $("h1").html("Level "+(++level));
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = btnColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor); 
    animatePress(randomColor);
}

$(".btn").click(function () {
    var userColor = this.id;
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userPattern.length-1);
})

function playSound(name) {
    new Audio("sounds/"+name+".mp3").play();
}

function animatePress(color) {
    $("#"+color).addClass("pressed");
    setTimeout( function(){
        $("#"+color).removeClass("pressed")
    }, 100);
}

$(document).keydown( function(){
    if(!start){
        start = true;
        $("h1").html("Level 0");
        nextSequence();
    }
});

function checkAnswer(level){
    if(userPattern[level]==gamePattern[level]){
        if(userPattern.length==gamePattern.length){
            setTimeout( function() {
                nextSequence()
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");
        setTimeout( function(){
            $("body").removeClass("game-over")
        }, 200);
        startOver();
    }
}

function startOver() {
    start = false;
    gamePattern = [];
    level = 0;
}
