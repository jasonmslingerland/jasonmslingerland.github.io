/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wtheirhes. Each result get added to their ROUND score
- BUT, if the player rolls a 1, all their ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLBAL score. After that, it's the next player's turn
- The first player to reach 20 points on GLOBAL score wins the game

Additions: 
- Add two dice
- If you roll 2 6s in a row or on the same roll, you lose the game
- Add input for score to win

*/

var scores, scoreToWin, roundScore, activePlayer, dice, gamePlaying, previousRoll1, previousRoll2;

init(); //setup on refresh
scoreToWin = 20;

// roll dice button
document.querySelector(".btn-roll").addEventListener("click", function() {
  if(gamePlaying) {

    var dice1 = rollDice();
    var dice2 = rollDice();
    
    var diceDOM1 = document.querySelector(".dice1");
    var diceDOM2 = document.querySelector(".dice2");
    // 2. display result
    diceDOM1.style.display = "block"; // makes the image not none
    diceDOM1.src = "dice-" + dice1 + ".png";

    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";

    if (dice1 !== 1 || dice2 !== 1) {
      // add score to roundScore
      roundScore += (dice1 + dice2);
      document.querySelector("#current-" + activePlayer).textContent = roundScore; // sets roundScore to activePlayer's score
      console.log("current roll value: ", dice1, dice2);
      console.log("previous roll value: ", previousRoll1, previousRoll2);
      console.log("score to win: ", scoreToWin);
      console.log("")
    
      if ((dice1 === 6 || dice2 === 6) && (previousRoll1 === 6 || previousRoll2 === 6) || (dice1 === 6 && dice2 === 6)){
        console.log("end game")
        document.querySelector(".btn-roll").style.display = "none";
        document.querySelector("#name-" + activePlayer).textContent = "Loser!";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("loser");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
      }

    } else {
      // kill score
      nextPlayer();
    }
    // save last roll
    previousRoll1 = dice1;
    previousRoll2 = dice2;

    return dice1, dice2;  
  }
});

function rollDice() {
  var dice = Math.floor(Math.random() * 6) + 1;  
  return dice;
}

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update ui
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    // check if game is won
    if (scores[activePlayer] >= scoreToWin) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      
      document.querySelector(".btn-roll").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
  // end turn
});

// when turn is over
function nextPlayer() {
  // kill score, change active player, clear previous rolls
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  previousRoll1 = 0;
  previousRoll2 = 0;

  // next player in UI
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // give next player no dice
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

// make a new game
document.querySelector(".btn-new").addEventListener("click", function() {
  init();
});

//setting new score to win
document.querySelector(".score-input").addEventListener("keyup", function(event) {
  
  if (event.keyCode === 13) {
    scoreToWin = document.getElementById("score-input").value;
    init(); // start game over
  }
});

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  previousRoll1 = 0;
  previousRoll2 = 0;

  document.querySelector(".btn-roll").style.display = "block"; // The button is hidden when the game is won or lost
  document.querySelector(".dice1").style.display = "none"; // styleMethod.styleProperty // setting the image to be nothing
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("loser");
  document.querySelector(".player-1-panel").classList.remove("loser");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}