var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var firstTime = true;

$(document).keypress(function() {
  if (firstTime == true) {
    $("#level-title").text("Level "+ level)
    nextSequence()
    firstTime = false;
  }
});

$(".btn").click(function() {
  var userChosenColour = this.id; // $(this).attr("id")
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //fade in out in
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      },1000)
    }
  } else {
    console.log("wrong");
    playSound("wrong")

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  firstTime = true;

}
// for (var i = 0; i < gamePattern.length; i++) {
//   var thisColor = gamePattern[i];
//   switch (thisColor) {
//     case "blue":
//       var audio = new Audio('sounds/blue.mp3');
//       audio.play();
//       break;
//     case "green":
//       var audio = new Audio('sounds/green.mp3');
//       audio.play();
//       break;
//     case "red":
//       var audio = new Audio('sounds/red.mp3');
//       audio.play();
//       break;
//     case "yellow":
//       var audio = new Audio('sounds/yellow.mp3');
//       audio.play();
//       break;
//     default:
//       var audio = new Audio('sounds/wrong.mp3');
//       audio.play();
//   }}
